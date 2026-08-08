# Rahaman Biriyani Spot — Menu Website

A simple mobile-first website that replaces the old "scan QR → open PDF" menu.
It shows your 7 menu photos in a swipeable, zoomable viewer, plus quick
Call / WhatsApp buttons and your address at the bottom.

## What's inside
- `index.html` — page structure
- `style.css` — styling (black/gold theme matching your menu branding)
- `script.js` — swipe/dots/lightbox behaviour
- `images/menu-01.jpg` … `menu-07.jpg` — your menu photos, in order

## Deploy on Vercel (2 minutes)
1. Go to https://vercel.com and sign in (GitHub, GitLab, or email).
2. Click **Add New → Project**.
3. Choose **"Deploy without Git"** / drag-and-drop, and drop this whole
   folder (or the zip, extracted) onto the upload area.
   - Framework preset: choose **"Other"** (it's plain HTML — no build step).
4. Click **Deploy**. Vercel gives you a live URL in ~30 seconds
   (e.g. `biriyani-chowk-menu.vercel.app`).
5. Optional: in the Vercel project settings → Domains, add your own domain.

## Update the QR code
Point your QR code at the new Vercel URL instead of the old PDF link.
Any free QR generator (e.g. qr-code-generator.com) works — just paste the
Vercel URL in.

## Changing anything later
- **Swap a photo**: replace the matching file in `images/` (keep the same
  filename) and re-upload/redeploy.
- **Change phone number**: search-and-replace `916374060747` (WhatsApp/tel
  links) in `index.html`.
- **Re-order pages**: reorder the `<div class="page">` blocks in
  `index.html`, and reorder the matching entries in the `LABELS` array at
  the top of `script.js`.
