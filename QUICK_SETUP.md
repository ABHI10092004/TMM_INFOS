# Quick Setup Guide - TMM Cement Website

## Current Status ✅

Your website is now configured to work immediately with GitHub Pages using a **mailto** approach. Here's what happens:

### How It Works Now:
1. **User fills out contact form**
2. **Clicks "Send Message"**
3. **Their email client opens** (Gmail, Outlook, etc.)
4. **Pre-filled email** with all form data
5. **User clicks send** in their email client
6. **Email arrives at nani1113256j@gmail.com**

## Deploy to GitHub Pages (5 Minutes)

### Step 1: Create Repository
1. Go to [GitHub.com](https://github.com)
2. Click "New repository"
3. Name: `tmm-cement-website`
4. Make it **Public**
5. Click "Create repository"

### Step 2: Upload Files
1. Click "uploading an existing file"
2. Drag and drop ALL your website files:
   ```
   ✅ index.html
   ✅ blocks.html
   ✅ csand.html
   ✅ psand.html
   ✅ rmc.html
   ✅ manufacturing-blocks.html
   ✅ manufacturing-sand.html
   ✅ styles.css
   ✅ floating-buttons.css
   ✅ script.js
   ✅ form-handler.js
   ✅ logo.svg
   ```
3. Commit changes

### Step 3: Enable GitHub Pages
1. Go to **Settings** tab
2. Scroll to **Pages** section
3. Source: **Deploy from a branch**
4. Branch: **main**
5. Folder: **/ (root)**
6. Click **Save**

### Step 4: Access Your Website
Your site will be live at:
`https://YOUR_USERNAME.github.io/tmm-cement-website`

## Alternative: Better Email Solutions

If you want automatic email sending (without opening email client), here are better options:

### Option A: Formspree (Recommended)
1. Sign up at [formspree.io](https://formspree.io)
2. Create new form with email: `nani1113256j@gmail.com`
3. Copy your form endpoint
4. Replace `mailto:nani1113256j@gmail.com` with your Formspree URL in all HTML files

### Option B: EmailJS
1. Sign up at [emailjs.com](https://emailjs.com)
2. Connect your Gmail account
3. Create email template
4. Update `form-handler.js` with your credentials

### Option C: Netlify (Alternative Hosting)
1. Go to [netlify.com](https://netlify.com)
2. Drag & drop your website folder
3. Forms work automatically with Netlify

## Files You Can Delete (Optional)
- `send_email.php` (not needed for GitHub Pages)
- `GITHUB_PAGES_SETUP.md` (setup guide)
- `QUICK_SETUP.md` (this file)

## Testing Your Forms

### Current Behavior:
1. Fill out any contact form
2. Click "Send Message"
3. Email client opens with pre-filled message
4. Click send in your email client
5. Email arrives at `nani1113256j@gmail.com`

### What's Included in Emails:
- Customer name, email, phone
- Product-specific details (block type, quantity, etc.)
- Custom message
- All form fields properly formatted

## Troubleshooting

**Q: Email client doesn't open?**
A: User needs to have a default email client set up (Gmail, Outlook, etc.)

**Q: Want automatic sending?**
A: Set up Formspree or EmailJS as described above

**Q: Forms not working?**
A: Check browser console for errors, ensure all files are uploaded

## Your Website Features ✅

- ✅ Professional TMM Cement branding
- ✅ Responsive design (mobile-friendly)
- ✅ Contact forms on all pages
- ✅ Product quote forms
- ✅ Phone button for direct calls
- ✅ Building calculator
- ✅ Product galleries
- ✅ Manufacturing process pages
- ✅ Email collection (name, email, phone required)

Your TMM Cement website is ready to go live! 🚀
