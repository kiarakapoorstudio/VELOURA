# VELOURA — Premium Beauty Store Demo

A responsive React + Vite demo storefront for a beauty and cosmetics brand. Includes 24 sample products, category browsing, search and filters, product details, cart, wishlist, demo promo codes, validated demo checkout, order confirmation, simulated account area, and informational pages.

> **Important:** This is a frontend demo, not a live shop. Product catalogue, prices, stock, reviews, testimonials and policies are sample data. Cart, wishlist, demo account and demo orders are stored in the current browser's `localStorage`. Checkout creates a local demo order only. No payment is taken, no email is sent, and no products are dispatched. Do not enter real passwords or payment information.

## Requirements

- Node.js 20+ recommended
- npm
- Internet access for installing npm packages and loading the remote Unsplash photography / Google Fonts

## Run locally

1. Extract the ZIP.
2. Open a terminal in the `veloura` project folder.
3. Run `npm install`.
4. Run `npm run dev`.
5. Open the local URL printed by Vite (usually `http://localhost:5173`).

## Build for production

```bash
npm install
npm run build
npm run preview
```

Vite writes the production site to `dist/`.

## Demo features

- 24 sample products across skincare, makeup, haircare, fragrance and beauty tools.
- Product search, category / brand / price / rating filters, popularity / price / newest sorting.
- Add to bag, quantity changes, stock checks, remove item, wishlist, and browser persistence.
- Promo codes: `VELOURA10` (10% off) and `WELCOME150` (₹150 off; up to subtotal).
- Shipping: ₹99 standard, ₹199 express; standard shipping is free at ₹1,499 after discount.
- Checkout validates required fields, Indian mobile number and 6-digit PIN code. It creates a clearly labelled local demo order.
- Account login/signup is simulated locally; it is not secure authentication.

## Deploy to GitHub Pages

This is a client-side React Router application. GitHub Pages does not provide a backend, secure database or payment processing. The included Vite config uses relative asset paths for straightforward deployment.

1. Create a new **public** repository on GitHub, e.g. `veloura`.
2. Upload the project files (not `node_modules` or `dist`) to the repository root. Alternatively, use Git:
   ```bash
   git init
   git add .
   git commit -m "Create Veloura storefront demo"
   git branch -M main
   git remote add origin https://github.com/YOUR-USERNAME/veloura.git
   git push -u origin main
   ```
3. On your computer, open a terminal in the project and run `npm install`.
4. In GitHub repository Settings → Pages, choose **GitHub Actions** as the build/deployment source. You can also use the included `npm run build` to verify the project locally before publishing.
5. For the simplest static hosting, configure a Pages workflow to install dependencies, run `npm run build`, and upload the `dist` directory as the Pages artifact. React Router deep links may need a 404 fallback or hash-based routing depending on the hosting setup.

For a GitHub Pages project URL such as `https://YOUR-USERNAME.github.io/veloura/`, the current `base: './'` setting uses relative asset paths. If you later change the base URL or use a custom domain, adjust `vite.config.js` and test the deployed routes.

## What is needed for a real business

1. **Backend and database:** Add a server/API and database (for example PostgreSQL) for products, prices, variants, inventory, users, orders, addresses and order status. Validate price and stock server-side; never trust totals from browser state.
2. **Authentication:** Use a proven auth provider or server-side sessions. Store password hashes only on the server; add secure session cookies, rate limiting, email verification and account recovery.
3. **Payments:** Integrate Razorpay or another provider through a server. Create payment orders on the server, use server-only secret keys, verify payment signatures server-side, and confirm orders only after verified provider callbacks/webhooks. Do not expose secret keys in `VITE_*` frontend variables or commit secrets to GitHub.
4. **Order fulfilment:** Save confirmed orders to the database, reserve/decrement stock safely, integrate courier rates/tracking, and provide cancellations and refunds.
5. **Notifications:** Connect a transactional email/SMS service from the backend; never send private credentials from the browser.
6. **Business readiness:** Replace sample products, external images, testimonials, demo promo codes and sample legal pages. Confirm image licensing, product claims, GST/invoice needs, privacy compliance, refund terms and customer support contact details.
7. **Deployment:** GitHub Pages is static-only. Host the backend on a server platform and configure HTTPS, CORS, environment secrets, database backups and monitoring.

## Project structure

```text
veloura/
├── index.html
├── package.json
├── vite.config.js
├── .gitignore
├── .env.example
├── README.md
├── public/
└── src/
    ├── main.jsx
    ├── products.js
    └── style.css
```
