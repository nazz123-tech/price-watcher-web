# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Everyday households in Norway that watch their grocery budget. They know roughly what milk, coffee or butter should cost and want to pay that, without reading every chain's flyer or checking deal apps. They are ordinary shoppers, not deal hunters or professionals. Most use the app on their phone, often while shopping in the store.

## Product Purpose

Price Watcher checks Norwegian grocery prices every morning and emails the user when something on their list is at or below the price they want to pay. The user's job is to set it up once: add a grocery with search words and a target price, then rely on the morning email. Success means the user hears about a good price without having to look for it.

## Positioning

Set it and forget it. The user sets a target price once. Prices are checked every morning across all the chains Kassalapp covers. The user gets at most one quiet email per morning, and only when something hits their price. There is nothing to browse and no feed of deals. The product does its work in the background, and the app is where the user sets up and checks their watchlist.

## Operating Context

- The morning check runs in the separate `price-watcher-api` repo (`src/jobs/checkPrices.js`). The email is built in `src/lib/emailTemplate.js` and arrives around 08:00 from "Price Watcher".
- Price data comes from the Kassalapp API (kassal.app).
- The API is on a host that can cold-start. The first request may take up to a minute, and the UI says so ("Waking up the server…").
- Hosted on Vercel. Auth and data use Supabase.

## Capabilities and Constraints

- **Groceries:** each one has a name, search words and a target price. A product matches only if its name contains every search word, so users are told to include the brand and size (e.g. "tine lettmelk 1l"). Prices accept a Norwegian decimal comma (22,90).
- **Card states:** a card shows today's cheapest price and store. It turns green and says "Now" when that price is at or below the target. Before the first check it says "No price yet".
- **Lists:** user-made groups such as Breakfast, Dinner or Snacks, switched with tabs.
- **Popular:** the groceries most users watch, with today's cheapest price. A grocery appears once at least two people watch it.
- **Settings:** turn email alerts on or off, and manage the account.
- **Tips:** local tips about Norwegian grocery shopping (budget chains, own brands, Trumf, Æ, pant, Sunday hours, the beer curfew, kilo price).
- **Language:** the UI is English only. Norwegian product names, chain names and terms (pant, kilopris, Trumf) stay as they are.
- **Price:** free, with no ads, plans or pricing, now or planned.
- **Device:** mobile-first. The phone in a store aisle is the main use case.
- **Disclaimer:** prices can differ in the user's local store, and the UI says so.

## Brand Commitments

- Name: "Price Watcher" (short name "Prices"). Tagline: "Norwegian prices, calmer shopping". Description: "Get an email when your groceries are on sale." These are in `lib/appInfo.js`.
- Voice: plain, friendly, specific English. Short sentences and concrete examples ("tine lettmelk 1l", "Plan the taco-Friday run accordingly"). Calm, not salesy.
- The Kassalapp credit ("Prices from Kassalapp, checked every morning.") must stay visible.
- A logo already exists (`components/Logo.js`), as do the app icons (`app/icon.png`, `app/apple-icon.png`) and the share image (`app/opengraph-image.js`).

## Evidence on Hand

- Real product data from Kassalapp, plus store logos on cards (`components/StoreBadge.js`).
- The tips in `lib/tips.js`.
- There are no testimonials, user counts, savings figures or press. Do not invent any.

## Product Principles

1. **Quiet by default.** The product's value is not having to look. Send one email per morning, and only when something hits the user's target.
2. **The user's price, not our deals.** Everything starts from the user's own groceries and target prices, never from promotions we push.
3. **Usable in the aisle.** Every screen has to work on a phone, held in one hand, in a store.
4. **Honest about the data.** Credit the source, show when prices were checked, and say that store prices can differ.
5. **Plain local help.** Explain Norwegian grocery habits in simple English, without condescending.
