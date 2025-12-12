# Domain Setup Instructions for hamadbikltd.com

## Step 1: Configure Domain in Netlify

1. Go to your Netlify dashboard: https://app.netlify.com
2. Select your site (hamadbik_website)
3. Go to **Domain settings** → **Custom domains**
4. Click **Add custom domain**
5. Enter: `hamadbikltd.com`
6. Netlify will also add `www.hamadbikltd.com` automatically

## Step 2: Configure DNS in GoDaddy

You need to add DNS records in GoDaddy to point to Netlify:

### Option A: Using CNAME (Recommended for subdomains like www)

1. Log in to GoDaddy: https://www.godaddy.com
2. Go to **My Products** → **Domains** → **hamadbikltd.com** → **DNS**
3. Add/Edit DNS records:

**For www subdomain:**
- Type: **CNAME**
- Name: `www`
- Value: `hamadbik-website.netlify.app` (or your Netlify site URL)
- TTL: 600 (or default)

**For root domain (hamadbikltd.com):**
- Type: **A Record**
- Name: `@` (or leave blank)
- Value: `75.2.60.5` (Netlify's IP - check Netlify dashboard for current IP)
- TTL: 600

OR use ALIAS/ANAME if GoDaddy supports it:
- Type: **ALIAS** or **ANAME**
- Name: `@`
- Value: `hamadbik-website.netlify.app`
- TTL: 600

### Option B: Using Netlify DNS (Easier - Recommended)

1. In Netlify dashboard → Domain settings → DNS
2. Copy the Netlify nameservers (they look like: `dns1.p01.nsone.net`, `dns2.p01.nsone.net`, etc.)
3. In GoDaddy:
   - Go to **My Products** → **Domains** → **hamadbikltd.com** → **DNS**
   - Scroll to **Nameservers**
   - Click **Change**
   - Select **Custom**
   - Enter the Netlify nameservers
   - Save

## Step 3: SSL Certificate

Netlify will automatically provision an SSL certificate (HTTPS) once DNS is configured correctly. This usually takes a few minutes to a few hours.

## Step 4: Verify Setup

1. Wait 5-10 minutes for DNS propagation
2. Check DNS propagation: https://www.whatsmydns.net
3. Visit: https://hamadbikltd.com
4. Visit: https://www.hamadbikltd.com

## Troubleshooting

- **DNS not working?** Wait up to 48 hours for full propagation
- **SSL certificate pending?** Make sure DNS is correctly configured first
- **Need help?** Check Netlify's domain documentation: https://docs.netlify.com/domains-https/custom-domains/

## Current Netlify Site URL

Your site is currently available at: `https://hamadbik-website.netlify.app` (or check your Netlify dashboard for the exact URL)

