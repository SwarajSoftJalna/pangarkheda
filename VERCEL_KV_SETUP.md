# Vercel KV Storage Setup Guide

## 🚨 Problem Solved
**Before**: Data lost on every deployment (in-memory storage)
**After**: Persistent data across deployments (Vercel KV storage)

## 📋 What is Vercel KV?
- **Redis-compatible** key-value storage
- **Persistent** across deployments
- **Free tier** available (30,000 commands/month)
- **Native Vercel** integration
- **Fast** and reliable

## 🛠️ Setup Steps

### Step 1: Create KV Database
1. Go to your Vercel project dashboard
2. Click **"Storage"** tab
3. Click **"Create Database"**
4. Select **"KV"** (Redis)
5. Choose region (closest to your users)
6. Click **"Create"**

### Step 2: Connect to Your Project
1. After creation, click **"Connect"**
2. Select your project: `gpm-orcin`
3. Click **"Continue"**
4. Vercel will automatically add environment variables:
   - `KV_URL`
   - `KV_REST_API_URL`
   - `KV_REST_API_TOKEN`
   - `KV_REST_API_READ_ONLY_TOKEN`

### Step 3: Deploy Your Application
1. Commit and push your changes
2. Vercel will automatically redeploy
3. KV storage will be initialized with default data

## ✅ Verification

### Check if KV is Working:
```bash
# Test your API endpoints
curl https://gpm-orcin.vercel.app/api/content
curl https://gpm-orcin.vercel.app/api/photo
curl https://gpm-orcin.vercel.app/api/nagrik
```

### Expected Response:
```json
{
  "preheader": "<p>ग्रामपंचायत सावरगाव हडप, जालना</p>",
  "header": [...],
  "headerTitle": "ग्रामपंचायत सावरगाव हडप",
  // ... other default data
}
```

## 📊 Storage Usage

### Data Stored in KV:
| Key | Value | Size |
|-----|-------|------|
| `cms:content` | Homepage content, header, preheader | ~5KB |
| `cms:photo-gallery` | Photo gallery data | ~10KB |
| `cms:nagrik` | Nagrik services data | ~3KB |
| `cms:padadhikari` | Office bearers data | ~2KB |
| `cms:footer` | Footer configuration | ~1KB |
| `cms:admin-profile` | Admin settings | ~0.5KB |

**Total**: ~21.5KB (well within free tier limits)

### Operations per Month:
- **GET operations**: ~1,000 (website visitors)
- **SET operations**: ~100 (admin updates)
- **Total**: ~1,100 commands (free tier: 30,000)

## 🔧 Technical Details

### KV Storage Functions:
```typescript
// Get data (persistent)
const content = await getKVContentData();

// Update data (persistent)
const updated = await updateKVContentData(newContent);

// Initialize with defaults
await initializeKVData();
```

### Error Handling:
- ✅ **Graceful fallbacks** to default data if KV fails
- ✅ **Proper error logging** for debugging
- ✅ **Type safety** with TypeScript interfaces

## 🚀 Benefits

### ✅ Persistent Storage:
- Data survives deployments
- Data survives server restarts
- Data survives Vercel scaling

### ✅ Performance:
- Redis-fast response times
- Automatic caching
- Global edge distribution

### ✅ Scalability:
- Handles concurrent users
- Automatic load balancing
- No database maintenance

### ✅ Developer Experience:
- Simple key-value API
- No schema migrations
- Easy debugging

## 🎯 Next Steps

### 1. Deploy with KV:
- Push your code changes
- Vercel will auto-detect KV usage
- Data will be initialized automatically

### 2. Test Persistence:
- Update some content in admin panel
- Deploy a new version
- Verify content is still there

### 3. Monitor Usage:
- Check Vercel Storage dashboard
- Monitor command usage
- Upgrade plan if needed (paid tiers available)

## 📝 Environment Variables (Auto-added by Vercel)
```bash
# These are automatically added when you connect KV
KV_URL="redis://..."
KV_REST_API_URL="https://..."
KV_REST_API_TOKEN="..."
KV_REST_API_READ_ONLY_TOKEN="..."
```

## 🔍 Troubleshooting

### Common Issues:

#### 1. "KV connection failed"
- **Solution**: Check environment variables in Vercel dashboard
- **Verify**: KV is properly connected to your project

#### 2. "Data not persisting"
- **Solution**: Ensure you're using KV functions (not old in-memory)
- **Check**: API routes use `await getKV...()` functions

#### 3. "Slow response times"
- **Solution**: Choose closer KV region
- **Optimize**: Reduce data size per key

### Debug Commands:
```bash
# Check KV connection
curl -H "Authorization: Bearer $KV_REST_API_TOKEN" \
     "$KV_REST_API_URL/get/cms:content"

# List all keys
curl -H "Authorization: Bearer $KV_REST_API_TOKEN" \
     "$KV_REST_API_URL/keys/*"
```

## 💡 Cost Analysis

### Free Tier (Current):
- **30,000 commands/month**
- **1GB storage**
- **Cost**: $0/month

### Pro Tier (If needed):
- **300,000 commands/month**
- **5GB storage**
- **Cost**: $5/month

### Your Usage:
- **Estimated**: 1,100 commands/month
- **Storage**: 21.5KB
- **Recommendation**: Free tier is sufficient

## ✅ Migration Complete

Your CMS now uses **persistent Vercel KV storage**:
- ✅ No more data loss on deployments
- ✅ Professional-grade persistence
- ✅ Free tier usage
- ✅ Better performance
- ✅ Scalable architecture

Ready for production deployment! 🚀
