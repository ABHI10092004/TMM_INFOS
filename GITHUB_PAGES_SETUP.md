# GitHub Pages Setup Guide for TMM Cement Website

## Quick Setup (Recommended)

### Option 1: Using Formspree (Free & Easy)

1. **Create a GitHub Repository:**
   - Go to GitHub.com and create a new repository
   - Name it something like `tmm-cement-website`
   - Make it public
   - Upload all your website files

2. **Enable GitHub Pages:**
   - Go to repository Settings
   - Scroll down to "Pages" section
   - Select "Deploy from a branch"
   - Choose "main" branch and "/ (root)" folder
   - Click Save

3. **Set up Formspree:**
   - Go to https://formspree.io/
   - Sign up for a free account
   - Create a new form
   - Copy the form endpoint URL
   - Replace the action URL in your forms

4. **Update Form Actions:**
   Replace `action="https://formspree.io/f/xpwagkqr"` in all your HTML files with your actual Formspree endpoint.

### Option 2: Using EmailJS (More Control)

1. **Sign up for EmailJS:**
   - Go to https://www.emailjs.com/
   - Create a free account
   - Set up an email service (Gmail, Outlook, etc.)
   - Create an email template

2. **Update form-handler.js:**
   - Replace `YOUR_PUBLIC_KEY` with your EmailJS public key
   - Replace `YOUR_SERVICE_ID` with your service ID
   - Replace `YOUR_TEMPLATE_ID` with your template ID

3. **Add EmailJS Script:**
   Add this to your HTML head section:
   ```html
   <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
   ```

### Option 3: Using Netlify (Alternative Hosting)

1. **Deploy to Netlify:**
   - Go to https://netlify.com/
   - Drag and drop your website folder
   - Or connect your GitHub repository

2. **Enable Netlify Forms:**
   - Add `netlify` attribute to your forms
   - Forms will automatically work with Netlify

## Files Structure for GitHub Pages

```
your-repository/
├── index.html
├── blocks.html
├── csand.html
├── psand.html
├── rmc.html
├── manufacturing-blocks.html
├── manufacturing-sand.html
├── styles.css
├── floating-buttons.css
├── script.js
├── form-handler.js
├── logo.svg
└── README.md
```

## Important Notes

1. **Remove PHP Files:** GitHub Pages doesn't support PHP, so remove:
   - `send_email.php`

2. **Update Form Actions:** Make sure all forms point to your chosen service:
   - Formspree: `action="https://formspree.io/f/YOUR_FORM_ID"`
   - Netlify: `action="/contact" netlify`

3. **Test Your Forms:** After deployment, test all contact forms to ensure emails are being sent to `nani1113256j@gmail.com`

## Your Website URL

After setup, your website will be available at:
`https://YOUR_USERNAME.github.io/YOUR_REPOSITORY_NAME`

## Contact Form Services Comparison

| Service | Free Tier | Setup Difficulty | Features |
|---------|-----------|------------------|----------|
| Formspree | 50 submissions/month | Easy | Simple, reliable |
| EmailJS | 200 emails/month | Medium | More control, templates |
| Netlify Forms | 100 submissions/month | Easy | Built-in with Netlify hosting |

## Troubleshooting

1. **Forms not working:** Check browser console for errors
2. **Emails not received:** Verify your email service setup
3. **CORS errors:** Make sure you're accessing via HTTPS (GitHub Pages URL)

## Next Steps

1. Choose your preferred form service
2. Update the form action URLs
3. Test locally if possible
4. Deploy to GitHub Pages
5. Test all contact forms
6. Update any remaining placeholder content

Your TMM Cement website is now ready for GitHub Pages hosting!
