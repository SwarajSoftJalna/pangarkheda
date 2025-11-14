# Vercel Environment Variables Setup Guide

## 🚀 Quick Setup Steps

### Step 1: Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your project: `gpm-orcin`

### Step 2: Add Environment Variables
1. Click on **"Settings"** tab
2. Click on **"Environment Variables"** in the left sidebar
3. Add the following variables:

#### Variable 1: TinyMCE API Key
- **Name**: `NEXT_PUBLIC_TINYMCE_KEY`
- **Value**: `3s56zd5mja7nsbhf1m3u4fup9jo0q3hngi4l30ddydty5sh0`
- **Environments**: Production, Preview, Development (check all)

#### Variable 2: Admin Email
- **Name**: `ADMIN_EMAIL`
- **Value**: `sudarshan@gmail.com`
- **Environments**: Production, Preview, Development (check all)

#### Variable 3: Admin Password
- **Name**: `ADMIN_PASSWORD`
- **Value**: `12345`
- **Environments**: Production, Preview, Development (check all)

### Step 3: Redeploy
1. Go to **"Deployments"** tab
2. Click **"..."** (three dots) on your latest deployment
3. Click **"Redeploy"**
4. Or push a new commit to trigger redeployment

## ✅ Verification

After deployment, your app should:
- ✅ No more "Secret does not exist" errors
- ✅ TinyMCE editor works without warnings
- ✅ Admin login works with your credentials
- ✅ All API routes function properly

## 🔧 Alternative: Using Vercel CLI

If you prefer command line:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Add environment variables
vercel env add NEXT_PUBLIC_TINYMCE_KEY
vercel env add ADMIN_EMAIL
vercel env add ADMIN_PASSWORD

# Redeploy
vercel --prod
```

## 📱 What These Variables Do

- **NEXT_PUBLIC_TINYMCE_KEY**: Removes TinyMCE warning messages
- **ADMIN_EMAIL/ADMIN_PASSWORD**: Login credentials for admin panel
- **All variables**: Required for proper CMS functionality

## 🎯 Current Status

Your local `.env.production` file has the values, but Vercel needs them in their dashboard for deployment to work.
