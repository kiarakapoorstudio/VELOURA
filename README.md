# VELOURA — Premium Beauty Store Demo

A responsive React + Vite demo storefront for a beauty and cosmetics brand. Includes 24 sample products, category browsing, search and filters, product details, cart, wishlist, demo promo codes, validated demo checkout, order confirmation, simulated account area, and information/policy pages.

> **Demo only:** products, prices, inventory, reviews, testimonials and policies are sample data. Cart, wishlist, demo account and orders are saved in this browser's `localStorage`. Checkout creates a local demo order only. No real payment is taken, no email is sent and no products are dispatched. Do not enter real passwords or payment details.

## Requirements

- Node.js 20 or newer
- npm
- Internet access to install dependencies and load remote Unsplash photos / Google Fonts

## Run locally

1. Extract the ZIP.
2. Open a terminal in the `veloura` folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite, usually `http://localhost:5173`.

**Do not double-click `index.html` to run the website.** It is the Vite/React entry file, not a standalone HTML website. The app needs Vite to serve JavaScript modules.

## Build and preview

```bash
npm run build
npm run preview
```

Vite creates the production files in `dist/`.

## Demo functionality

- 24 sample products across skincare, makeup, haircare, fragrance and beauty tools.
- Search, category/brand/price/rating filters, and price/popularity/newest sorting.
- Product detail pages, variant selection, stock checks, cart quantity updates, wishlist and browser persistence.
- Demo promo codes: `VELOURA10` (10% off) and `WELCOME150` (₹150 off, capped at subtotal).
- Shipping: ₹99 standard or ₹199 express; standard shipping is free at ₹1,499 after discount.
- Checkout validates required fields, Indian mobile number and 6-digit PIN. It creates a browser-local demo order.
- Login/signup are simulated locally and are not secure authentication.

## Deploy on GitHub Pages

1. Create a GitHub repository, for example `veloura`.
2. Upload the contents of this project folder to the repository root (not the ZIP itself). Do not upload `node_modules` or `dist`.
3. Commit the files to the `main` branch.
4. Open repository **Settings → Pages** and set the source to **GitHub Actions**.
5. Open the **Actions** tab and wait for **Deploy Veloura to GitHub Pages** to complete successfully.
6. Open the URL shown in **Settings → Pages**.

The included `.github/workflows/deploy.yml` builds the app and publishes `dist/`. The Vite `base: './'` setting and React Router's `HashRouter` are chosen for compatibility with GitHub Pages project URLs. If the site is blank after a successful run, verify that all project files (especially `src/main.jsx`, `src/products.js`, `src/style.css`, `package.json`, and `vite.config.js`) are committed at the repository root. Check browser DevTools → Console and Network for missing assets or JavaScript errors.

## Project structure

```text
veloura/
├── .github/workflows/deploy.yml
├── .env.example
├── .gitignore
├── index.html
├── package.json
├── vite.config.js
├── README.md
├── public/
└── src/
    ├── main.jsx
    ├── products.js
    └── style.css
```

## What is required for a real business

1. **Backend/database:** Use a server API and database for products, prices, variants, inventory, customers, addresses, orders and order status. Recalculate price and stock on the server.
2. **Authentication:** Use a secure authentication provider or server-side sessions. Never store raw passwords in browser storage.
3. **Payments:** Integrate Razorpay or another provider through a backend. Create payment orders server-side, keep secret keys on the server, verify signatures server-side and confirm orders only after verified provider responses/webhooks. Do not expose secret keys in frontend code or commit them to GitHub.
4. **Fulfilment:** Connect courier rates/tracking, inventory reservation, cancellations and refunds.
5. **Notifications:** Send email/SMS through a backend-connected transactional service.
6. **Business readiness:** Replace sample products, images, testimonials, promo codes and policies. Verify product claims, image rights, customer support details, tax/invoicing requirements and applicable Indian privacy/consumer rules.

GitHub Pages is static hosting and cannot itself securely run the backend or payment verification.
