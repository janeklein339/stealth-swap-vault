# Vercel Deployment Guide for Stealth Swap Vault

This guide provides step-by-step instructions for deploying the Stealth Swap Vault application to Vercel.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **GitHub Repository**: Ensure your code is pushed to GitHub
3. **Environment Variables**: Prepare all required environment variables

## Step 1: Connect GitHub Repository

1. **Login to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "Sign Up" or "Login"
   - Choose "Continue with GitHub"

2. **Import Project**
   - Click "New Project" on the dashboard
   - Select "Import Git Repository"
   - Find and select `janeklein339/stealth-swap-vault`
   - Click "Import"

## Step 2: Configure Project Settings

1. **Project Configuration**
   - **Project Name**: `stealth-swap-vault` (or your preferred name)
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

2. **Advanced Settings**
   - **Node.js Version**: `18.x` or `20.x`
   - **Environment**: `Production`

## Step 3: Configure Environment Variables

In the Vercel dashboard, go to **Settings** → **Environment Variables** and add the following:

### Required Environment Variables

```bash
# Chain Configuration
VITE_CHAIN_ID=11155111
VITE_RPC_URL=https://sepolia.infura.io/v3/b18fb7e6ca7045ac83c41157ab93f990

# Wallet Connect Configuration
VITE_WALLET_CONNECT_PROJECT_ID=2ec9743d0d0cd7fb94dee1a7e6d33475

# Infura Configuration
VITE_INFURA_API_KEY=b18fb7e6ca7045ac83c41157ab93f990
```

### Environment Variable Configuration

1. **Add Each Variable**:
   - Click "Add New"
   - Enter the **Name** (e.g., `VITE_CHAIN_ID`)
   - Enter the **Value** (e.g., `11155111`)
   - Select **Environment**: `Production`, `Preview`, `Development`
   - Click "Save"

2. **Repeat for All Variables**:
   - Add all environment variables listed above
   - Ensure all are enabled for Production environment

## Step 4: Deploy the Application

1. **Initial Deployment**
   - Click "Deploy" button
   - Wait for the build process to complete
   - Monitor the build logs for any errors

2. **Build Process**
   - Vercel will automatically:
     - Install dependencies (`npm install`)
     - Build the application (`npm run build`)
     - Deploy to global CDN

## Step 5: Configure Custom Domain (Optional)

1. **Add Domain**
   - Go to **Settings** → **Domains**
   - Click "Add Domain"
   - Enter your custom domain (e.g., `stealthswap.com`)

2. **DNS Configuration**
   - Add the required DNS records as shown in Vercel
   - Wait for DNS propagation (up to 24 hours)

## Step 6: Configure Build Settings

1. **Build Configuration**
   - Go to **Settings** → **General**
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

2. **Node.js Version**
   - **Node.js Version**: `18.x` (recommended)

## Step 7: Enable Automatic Deployments

1. **Git Integration**
   - Ensure GitHub integration is enabled
   - Every push to `main` branch will trigger automatic deployment

2. **Branch Protection**
   - Configure branch protection rules in GitHub
   - Set up required status checks

## Step 8: Monitor and Optimize

1. **Performance Monitoring**
   - Use Vercel Analytics to monitor performance
   - Check Core Web Vitals scores

2. **Error Monitoring**
   - Monitor build logs for errors
   - Set up error tracking if needed

## Step 9: Security Configuration

1. **Environment Variables Security**
   - Never commit sensitive environment variables to Git
   - Use Vercel's environment variable system
   - Rotate API keys regularly

2. **Access Control**
   - Configure team access in Vercel
   - Set up proper permissions

## Step 10: Production Checklist

Before going live, ensure:

- [ ] All environment variables are configured
- [ ] Build completes successfully
- [ ] Application loads without errors
- [ ] Wallet connection works properly
- [ ] All features are functional
- [ ] Performance is optimized
- [ ] Security measures are in place

## Troubleshooting

### Common Issues

1. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in `package.json`
   - Verify Node.js version compatibility

2. **Environment Variable Issues**
   - Ensure all required variables are set
   - Check variable names match exactly
   - Verify values are correct

3. **Wallet Connection Issues**
   - Verify WalletConnect Project ID is correct
   - Check RPC URLs are accessible
   - Ensure chain IDs match

### Support

- **Vercel Documentation**: [vercel.com/docs](https://vercel.com/docs)
- **GitHub Issues**: Create issues in the repository
- **Community Support**: Join relevant Discord/Telegram communities

## Deployment URLs

After successful deployment, your application will be available at:

- **Production**: `https://stealth-swap-vault.vercel.app`
- **Preview**: `https://stealth-swap-vault-git-[branch].vercel.app`
- **Custom Domain**: `https://yourdomain.com` (if configured)

## Next Steps

1. **Test the Application**
   - Test all wallet connections
   - Verify swap functionality
   - Check cross-chain operations

2. **Monitor Performance**
   - Set up monitoring and alerts
   - Track user interactions
   - Monitor error rates

3. **Regular Updates**
   - Keep dependencies updated
   - Monitor security advisories
   - Regular backups and maintenance

---

**Note**: This deployment guide assumes you have the necessary permissions and access to configure the Vercel project. If you encounter any issues, refer to the Vercel documentation or contact support.
