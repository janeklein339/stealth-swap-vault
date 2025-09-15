// SPDX-License-Identifier: MIT
pragma solidity ^0.8.24;

import { SepoliaConfig } from "@fhevm/solidity/config/ZamaConfig.sol";
import { euint32, externalEuint32, euint8, ebool, FHE } from "@fhevm/solidity/lib/FHE.sol";

contract StealthSwapVault is SepoliaConfig {
    using FHE for *;
    
    struct SwapOrder {
        euint32 orderId;
        euint32 amountIn;
        euint32 amountOut;
        euint32 minAmountOut;
        address tokenIn;
        address tokenOut;
        address user;
        uint256 sourceChain;
        uint256 targetChain;
        bool isActive;
        bool isCompleted;
        uint256 timestamp;
        uint256 deadline;
    }
    
    struct CrossChainSwap {
        euint32 swapId;
        euint32 encryptedAmount;
        euint32 encryptedFee;
        address user;
        uint256 sourceChain;
        uint256 targetChain;
        bytes32 secretHash;
        bool isRedeemed;
        uint256 timestamp;
    }
    
    struct LiquidityPool {
        euint32 totalLiquidity;
        euint32 availableLiquidity;
        address token;
        uint256 chainId;
        bool isActive;
    }
    
    mapping(uint256 => SwapOrder) public swapOrders;
    mapping(uint256 => CrossChainSwap) public crossChainSwaps;
    mapping(address => mapping(uint256 => LiquidityPool)) public liquidityPools;
    mapping(address => euint32) public userBalances;
    mapping(bytes32 => bool) public usedSecrets;
    
    uint256 public orderCounter;
    uint256 public swapCounter;
    
    address public owner;
    address public feeCollector;
    uint256 public protocolFee; // Basis points (e.g., 30 = 0.3%)
    
    event SwapOrderCreated(uint256 indexed orderId, address indexed user, uint256 sourceChain, uint256 targetChain);
    event CrossChainSwapInitiated(uint256 indexed swapId, address indexed user, uint256 sourceChain, uint256 targetChain);
    event SwapCompleted(uint256 indexed swapId, address indexed user, uint256 sourceChain, uint256 targetChain);
    event LiquidityAdded(address indexed token, uint256 indexed chainId, uint32 amount);
    event LiquidityRemoved(address indexed token, uint256 indexed chainId, uint32 amount);
    event SecretRevealed(bytes32 indexed secretHash, bytes32 secret);
    
    constructor(address _feeCollector, uint256 _protocolFee) {
        owner = msg.sender;
        feeCollector = _feeCollector;
        protocolFee = _protocolFee;
    }
    
    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }
    
    modifier onlyActiveOrder(uint256 orderId) {
        require(swapOrders[orderId].user != address(0), "Order does not exist");
        require(swapOrders[orderId].isActive, "Order is not active");
        _;
    }
    
    function createSwapOrder(
        externalEuint32 amountIn,
        externalEuint32 minAmountOut,
        address tokenIn,
        address tokenOut,
        uint256 sourceChain,
        uint256 targetChain,
        uint256 deadline,
        bytes calldata inputProof
    ) public returns (uint256) {
        require(deadline > block.timestamp, "Deadline must be in the future");
        require(tokenIn != address(0) && tokenOut != address(0), "Invalid token addresses");
        require(sourceChain != targetChain, "Source and target chains must be different");
        
        uint256 orderId = orderCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmountIn = FHE.fromExternal(amountIn, inputProof);
        euint32 internalMinAmountOut = FHE.fromExternal(minAmountOut, inputProof);
        
        // Calculate encrypted amount out (simplified calculation)
        euint32 internalAmountOut = FHE.mul(internalAmountIn, FHE.asEuint32(95)); // 95% efficiency
        
        swapOrders[orderId] = SwapOrder({
            orderId: FHE.asEuint32(0), // Will be set properly later
            amountIn: internalAmountIn,
            amountOut: internalAmountOut,
            minAmountOut: internalMinAmountOut,
            tokenIn: tokenIn,
            tokenOut: tokenOut,
            user: msg.sender,
            sourceChain: sourceChain,
            targetChain: targetChain,
            isActive: true,
            isCompleted: false,
            timestamp: block.timestamp,
            deadline: deadline
        });
        
        emit SwapOrderCreated(orderId, msg.sender, sourceChain, targetChain);
        return orderId;
    }
    
    function initiateCrossChainSwap(
        uint256 orderId,
        bytes32 secretHash,
        externalEuint32 encryptedAmount,
        externalEuint32 encryptedFee,
        bytes calldata inputProof
    ) public onlyActiveOrder(orderId) returns (uint256) {
        require(swapOrders[orderId].user == msg.sender, "Only order creator can initiate swap");
        require(block.timestamp <= swapOrders[orderId].deadline, "Order deadline exceeded");
        require(!usedSecrets[secretHash], "Secret hash already used");
        
        uint256 swapId = swapCounter++;
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalEncryptedAmount = FHE.fromExternal(encryptedAmount, inputProof);
        euint32 internalEncryptedFee = FHE.fromExternal(encryptedFee, inputProof);
        
        crossChainSwaps[swapId] = CrossChainSwap({
            swapId: FHE.asEuint32(0), // Will be set properly later
            encryptedAmount: internalEncryptedAmount,
            encryptedFee: internalEncryptedFee,
            user: msg.sender,
            sourceChain: swapOrders[orderId].sourceChain,
            targetChain: swapOrders[orderId].targetChain,
            secretHash: secretHash,
            isRedeemed: false,
            timestamp: block.timestamp
        });
        
        usedSecrets[secretHash] = true;
        swapOrders[orderId].isActive = false;
        
        emit CrossChainSwapInitiated(swapId, msg.sender, swapOrders[orderId].sourceChain, swapOrders[orderId].targetChain);
        return swapId;
    }
    
    function completeCrossChainSwap(
        uint256 swapId,
        bytes32 secret,
        externalEuint32 encryptedAmount,
        bytes calldata inputProof
    ) public {
        require(crossChainSwaps[swapId].user != address(0), "Swap does not exist");
        require(!crossChainSwaps[swapId].isRedeemed, "Swap already redeemed");
        require(keccak256(abi.encodePacked(secret)) == crossChainSwaps[swapId].secretHash, "Invalid secret");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalEncryptedAmount = FHE.fromExternal(encryptedAmount, inputProof);
        
        // Verify the encrypted amount matches
        require(FHE.eq(internalEncryptedAmount, crossChainSwaps[swapId].encryptedAmount), "Amount mismatch");
        
        crossChainSwaps[swapId].isRedeemed = true;
        
        emit SwapCompleted(swapId, crossChainSwaps[swapId].user, crossChainSwaps[swapId].sourceChain, crossChainSwaps[swapId].targetChain);
        emit SecretRevealed(crossChainSwaps[swapId].secretHash, secret);
    }
    
    function addLiquidity(
        address token,
        uint256 chainId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(token != address(0), "Invalid token address");
        require(chainId > 0, "Invalid chain ID");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        if (liquidityPools[token][chainId].token == address(0)) {
            liquidityPools[token][chainId] = LiquidityPool({
                totalLiquidity: internalAmount,
                availableLiquidity: internalAmount,
                token: token,
                chainId: chainId,
                isActive: true
            });
        } else {
            liquidityPools[token][chainId].totalLiquidity = FHE.add(liquidityPools[token][chainId].totalLiquidity, internalAmount);
            liquidityPools[token][chainId].availableLiquidity = FHE.add(liquidityPools[token][chainId].availableLiquidity, internalAmount);
        }
        
        emit LiquidityAdded(token, chainId, 0); // Amount will be decrypted off-chain
    }
    
    function removeLiquidity(
        address token,
        uint256 chainId,
        externalEuint32 amount,
        bytes calldata inputProof
    ) public {
        require(liquidityPools[token][chainId].token != address(0), "Liquidity pool does not exist");
        require(liquidityPools[token][chainId].isActive, "Liquidity pool is not active");
        
        // Convert externalEuint32 to euint32 using FHE.fromExternal
        euint32 internalAmount = FHE.fromExternal(amount, inputProof);
        
        // Verify sufficient liquidity
        require(FHE.le(internalAmount, liquidityPools[token][chainId].availableLiquidity), "Insufficient liquidity");
        
        liquidityPools[token][chainId].totalLiquidity = FHE.sub(liquidityPools[token][chainId].totalLiquidity, internalAmount);
        liquidityPools[token][chainId].availableLiquidity = FHE.sub(liquidityPools[token][chainId].availableLiquidity, internalAmount);
        
        emit LiquidityRemoved(token, chainId, 0); // Amount will be decrypted off-chain
    }
    
    function getSwapOrderInfo(uint256 orderId) public view returns (
        address user,
        address tokenIn,
        address tokenOut,
        uint8 amountIn,
        uint8 amountOut,
        uint8 minAmountOut,
        uint256 sourceChain,
        uint256 targetChain,
        bool isActive,
        bool isCompleted,
        uint256 timestamp,
        uint256 deadline
    ) {
        SwapOrder storage order = swapOrders[orderId];
        return (
            order.user,
            order.tokenIn,
            order.tokenOut,
            0, // FHE.decrypt(order.amountIn) - will be decrypted off-chain
            0, // FHE.decrypt(order.amountOut) - will be decrypted off-chain
            0, // FHE.decrypt(order.minAmountOut) - will be decrypted off-chain
            order.sourceChain,
            order.targetChain,
            order.isActive,
            order.isCompleted,
            order.timestamp,
            order.deadline
        );
    }
    
    function getCrossChainSwapInfo(uint256 swapId) public view returns (
        address user,
        uint8 encryptedAmount,
        uint8 encryptedFee,
        uint256 sourceChain,
        uint256 targetChain,
        bytes32 secretHash,
        bool isRedeemed,
        uint256 timestamp
    ) {
        CrossChainSwap storage swap = crossChainSwaps[swapId];
        return (
            swap.user,
            0, // FHE.decrypt(swap.encryptedAmount) - will be decrypted off-chain
            0, // FHE.decrypt(swap.encryptedFee) - will be decrypted off-chain
            swap.sourceChain,
            swap.targetChain,
            swap.secretHash,
            swap.isRedeemed,
            swap.timestamp
        );
    }
    
    function getLiquidityPoolInfo(address token, uint256 chainId) public view returns (
        uint8 totalLiquidity,
        uint8 availableLiquidity,
        bool isActive
    ) {
        LiquidityPool storage pool = liquidityPools[token][chainId];
        return (
            0, // FHE.decrypt(pool.totalLiquidity) - will be decrypted off-chain
            0, // FHE.decrypt(pool.availableLiquidity) - will be decrypted off-chain
            pool.isActive
        );
    }
    
    function getUserBalance(address user) public view returns (uint8) {
        return 0; // FHE.decrypt(userBalances[user]) - will be decrypted off-chain
    }
    
    function setProtocolFee(uint256 newFee) public onlyOwner {
        require(newFee <= 1000, "Fee cannot exceed 10%"); // Max 10%
        protocolFee = newFee;
    }
    
    function setFeeCollector(address newFeeCollector) public onlyOwner {
        require(newFeeCollector != address(0), "Invalid fee collector address");
        feeCollector = newFeeCollector;
    }
    
    function pauseLiquidityPool(address token, uint256 chainId) public onlyOwner {
        require(liquidityPools[token][chainId].token != address(0), "Liquidity pool does not exist");
        liquidityPools[token][chainId].isActive = false;
    }
    
    function unpauseLiquidityPool(address token, uint256 chainId) public onlyOwner {
        require(liquidityPools[token][chainId].token != address(0), "Liquidity pool does not exist");
        liquidityPools[token][chainId].isActive = true;
    }
    
    function emergencyWithdraw(address token, uint256 amount) public onlyOwner {
        require(token != address(0), "Invalid token address");
        // Emergency withdrawal logic would be implemented here
        // This is a placeholder for emergency situations
    }
}
