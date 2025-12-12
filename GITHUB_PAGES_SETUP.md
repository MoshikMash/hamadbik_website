# GitHub Pages Domain Setup for hamadbikltd.com

## Step 1: Enable GitHub Pages

1. Go to your GitHub repository: `MoshikMash/hamadbik_website` (or your repo name)
2. Click on **Settings** tab
3. Scroll down to **Pages** section (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main` (or `master`)
   - **Folder**: `/ (root)`
5. Click **Save**
6. Your site will be available at: `https://[your-username].github.io/hamadbik_website/`

## Step 2: Configure Custom Domain in GitHub

1. Still in **Settings** → **Pages**
2. Scroll to **Custom domain** section
3. Enter: `hamadbikltd.com`
4. Check **Enforce HTTPS** (after DNS is configured)
5. Click **Save**

GitHub will automatically create/update the `CNAME` file with your domain.

## Step 3: Configure DNS in GoDaddy

1. Log in to GoDaddy: https://www.godaddy.com
2. Go to **My Products** → **Domains** → **hamadbikltd.com** → **DNS**
3. Add/Edit DNS records:

### For root domain (hamadbikltd.com):
Add **4 A Records**:
- **A Record 1:**
  - Name: `@` (or leave blank)
  - Value: `185.199.108.153`
  - TTL: 600

- **A Record 2:**
  - Name: `@` (or leave blank)
  - Value: `185.199.109.153`
  - TTL: 600

- **A Record 3:**
  - Name: `@` (or leave blank)
  - Value: `185.199.110.153`
  - TTL: 600

- **A Record 4:**
  - Name: `@` (or leave blank)
  - Value: `185.199.111.153`
  - TTL: 600

### For www subdomain (www.hamadbikltd.com):
Add **CNAME Record**:
- Type: **CNAME**
- Name: `www`
- Value: `[your-username].github.io` (e.g., `MoshikMash.github.io`)
- TTL: 600

**OR** (if CNAME doesn't work for www):
- Use the same 4 A Records as above, but with Name: `www`

## Step 4: Wait for DNS Propagation

- DNS changes can take 5 minutes to 48 hours to propagate
- Check propagation status: https://www.whatsmydns.net
- Search for: `hamadbikltd.com` and check A records

## Step 5: Enable HTTPS

1. After DNS is configured correctly (wait 5-10 minutes)
2. Go back to GitHub → Settings → Pages
3. Check **Enforce HTTPS**
4. GitHub will automatically provision SSL certificate

## Step 6: Verify

1. Visit: https://hamadbikltd.com
2. Visit: https://www.hamadbikltd.com
3. Both should redirect to your GitHub Pages site

## Troubleshooting

- **Domain not working?** 
  - Wait up to 48 hours for full DNS propagation
  - Verify DNS records are correct using: https://www.whatsmydns.net
  - Make sure CNAME file exists in your repository root

- **HTTPS not working?**
  - Make sure DNS is configured correctly first
  - Wait a few hours for GitHub to provision SSL certificate
  - Check **Enforce HTTPS** is enabled in GitHub Pages settings

- **www not working?**
  - Make sure CNAME record for www points to your GitHub Pages URL
  - Or use A records for www (same IPs as root domain)

## Current GitHub Pages URL

Your site will be available at:
- `https://[your-username].github.io/hamadbik_website/` (or your repo name)

After domain setup:
- `https://hamadbikltd.com`
- `https://www.hamadbikltd.com`

