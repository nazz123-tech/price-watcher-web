---
name: Price Watcher
description: Norwegian prices, calmer shopping
colors:
  spruce-ink: "#22403a"
  oat-paper: "#f4f3ee"
  card-cream: "#fcfbf7"
  highlighter-lime: "#d9ee6f"
  dill-olive: "#7a9a5a"
  basil-green: "#4c8a3e"
  paprika: "#c4533c"
  sage-grey: "#5f6b62"
  ledger-rule: "#e3e1d6"
  field-edge: "#dcdacd"
  linen: "#e8eadf"
  oat-mist: "#efeee6"
  ledger-band: "#f7f6f1"
  crate: "#ece8dc"
  crispbread: "#b58a45"
  tint-green: "#e3efcf"
  tint-amber: "#fdefc8"
  tint-red: "#f6ddd6"
  tint-olive: "#eef4e0"
typography:
  display:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "4.5rem"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  price:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.875rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Space Grotesk, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 700
    lineHeight: 1.25
  body-lead:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1.125rem"
    fontWeight: 400
    lineHeight: 1.625
  body:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.5
  body-small:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.875rem"
    fontWeight: 400
    lineHeight: 1.43
  label:
    fontFamily: "DM Sans, system-ui, sans-serif"
    fontSize: "0.75rem"
    fontWeight: 600
    lineHeight: 1.33
    letterSpacing: "0.18em"
rounded:
  sm: "6px"
  md: "8px"
  lg: "10px"
  xl: "14px"
  2xl: "18px"
  full: "9999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "16px"
  lg: "20px"
  xl: "24px"
  2xl: "40px"
  3xl: "56px"
components:
  button-primary:
    backgroundColor: "{colors.highlighter-lime}"
    textColor: "{colors.spruce-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0 20px"
    height: "44px"
  button-outline:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.spruce-ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.lg}"
    padding: "0 12px"
    height: "44px"
  button-outline-hover:
    backgroundColor: "{colors.oat-mist}"
  input-search:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.spruce-ink}"
    typography: "{typography.body}"
    rounded: "{rounded.lg}"
    padding: "0 10px 0 40px"
    height: "44px"
  tabs-list:
    backgroundColor: "{colors.linen}"
    rounded: "{rounded.lg}"
    padding: "4px"
    height: "44px"
  tabs-trigger-active:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.spruce-ink}"
    typography: "{typography.body-small}"
    rounded: "{rounded.md}"
    padding: "0 16px"
  card-grocery:
    backgroundColor: "{colors.card-cream}"
    textColor: "{colors.spruce-ink}"
    rounded: "{rounded.2xl}"
    padding: "20px"
  card-grocery-footer:
    backgroundColor: "{colors.ledger-band}"
    textColor: "{colors.sage-grey}"
    typography: "{typography.body-small}"
    padding: "16px 20px"
  chip-now:
    backgroundColor: "{colors.highlighter-lime}"
    textColor: "{colors.spruce-ink}"
    rounded: "{rounded.full}"
    padding: "4px 10px"
  tile-initial:
    backgroundColor: "{colors.crate}"
    textColor: "{colors.crispbread}"
    typography: "{typography.title}"
    rounded: "{rounded.2xl}"
    size: "56px"
  store-badge:
    backgroundColor: "#ffffff"
    textColor: "{colors.spruce-ink}"
    rounded: "{rounded.xl}"
    size: "40px"
---

# Design System: Price Watcher

## Overview

**Creative North Star: "The Kitchen Ledger"**

Price Watcher looks like a tidy household notebook kept on the kitchen counter. The pages are warm oat paper, the writing is a deep spruce ink, and the lines that divide it are thin and quiet. The numbers are the content. Prices are set large and plain in a confident grotesk, and everything around them stays small and grey so the price reads first. Highlighter lime is the pen the household reaches for to mark what matters: the main action, and the moment a grocery hits its price.

The density is relaxed rather than packed. The app is used on a phone in a store aisle, so cards breathe, tap targets are large (44px fields and buttons in the main toolbar), and every card follows the same structure: name, price, store, target. Depth comes from paper layering (cream cards on oat paper, a slightly darker band at the foot of each card) and hairline borders, not from heavy shadows. The look is light-only today. There is no dark theme.

The ledger is soft and sturdy. Corners are generously rounded (18px on cards and tiles) and borders are hairlines, so it reads friendly without becoming bubbly or toy-like.

**Key Characteristics:**
- Warm oat paper (#f4f3ee) with spruce ink text, never pure white or black.
- Big, tight Space Grotesk numerals for prices and headlines. DM Sans for everything you read.
- Highlighter lime as the brand accent and the "you hit your price" signal.
- Cards with a body and a darker footer band, separated by a hairline rule.
- Small uppercase, widely tracked eyebrows that label each section.
- Flat, layered paper. Shadows stay barely there.

## Colors

The palette is warm and food-adjacent: kitchen greens on oat paper, with one bright highlighter.

### Primary
- **Highlighter Lime** (`highlighter-lime`): the brand accent. It fills primary buttons (always with Spruce Ink text), the "Now" pill, the 2px ring around a card that is at its target, and the logo mark (lime icon on an ink tile with a lime halo). It may appear more freely as a brand accent, for example in decorative rings like the one on the tips card, but always as a fill, ring or stroke, never as text on a light background.

### Secondary
- **Dill Olive** (`dill-olive`): the quieter brand green. It colors eyebrows, the second line of the greeting headline, list names on cards, the active nav underline, link underlines and the focus ring (`--ring`).
- **Basil Green** (`basil-green`): the "good price" color. It is used for a deal price, a negative difference ("−4,50 kr") and the count badge.

### Tertiary
- **Paprika** (`paprika`): destructive actions and warnings ("May be outdated", Delete).
- **Crispbread** (`crispbread`): the warm brass for initial letters on Crate tiles and the amber stat icon.

### Neutral
- **Spruce Ink** (`spruce-ink`): all primary text, the progress bar fill, the logo tile. It is the system's "black".
- **Sage Grey** (`sage-grey`): secondary text, descriptions, metadata, placeholders.
- **Oat Paper** (`oat-paper`): the page background and the browser theme color.
- **Card Cream** (`card-cream`): cards, popovers, inputs and active tabs sitting on the paper.
- **Ledger Band** (`ledger-band`): the footer band inside cards and the toolbar strip under the hero.
- **Linen** (`linen`) and **Oat Mist** (`oat-mist`): the tab track and secondary fills, and hover fills.
- **Crate** (`crate`): the initial-letter tiles on grocery and popular cards.
- **Ledger Rule** (`ledger-rule`) and **Field Edge** (`field-edge`): hairline borders and dividers, and input outlines.
- **Tints** (`tint-green`, `tint-amber`, `tint-red`, `tint-olive`): pale backgrounds for the stat icons and the count badge, each paired with its strong color as the icon or text color.

### Named Rules
**The Ink-On-Lime Rule.** Highlighter Lime is always paired with Spruce Ink. Lime text on paper and white text on lime are both illegible, so don't use them.

**The Never-Pure Rule.** No `#000` and no plain `#fff` surfaces. The only white is the backing tile behind store logos, so each chain's logo shows on its true background.

**The Olive Size Rule.** Dill Olive on Oat Paper is only about 2.9:1 contrast. That is fine for decorative dots, underlines and rings, but small eyebrow text in olive is below WCAG AA today. For new small text, use Basil Green or Spruce Ink.

## Typography

**Display Font:** Space Grotesk (with system-ui, sans-serif)
**Body Font:** DM Sans (with system-ui, sans-serif)

**Character:** Space Grotesk gives the numbers a slightly engineered, ledger-like confidence. DM Sans keeps the explanations soft and easy to read. The pairing says "precise about prices, friendly about everything else."

### Hierarchy
- **Display** (700, 3rem mobile to 4.5rem at `sm`, line-height 0.95, −0.04em): the page greeting ("Good to see you, …"). It appears once per page and can break across two lines, with the second line in Dill Olive. Secondary pages use a smaller step (2.25rem to 3.75rem, −0.03em).
- **Headline** (700, 1.875rem, −0.025em): section headings like "Your list" and dialog titles (1.5rem).
- **Price** (700, 1.875rem, −0.025em): the current price on a grocery card, in Basil Green when it's a deal. It's the biggest thing on every card.
- **Title** (700, 1.125rem, tight leading): grocery names on cards and tip titles. Truncate with an ellipsis rather than wrapping.
- **Body Lead** (400, 1.125rem, 1.625 line-height, max ~36rem): the introduction paragraph under a display headline, in Sage Grey.
- **Body** (400, 1rem): forms, dialogs and running text.
- **Body Small** (400–600, 0.875rem): card metadata, the target line, nav labels (0.95rem semibold) and helper text.
- **Label / Eyebrow** (600, 0.75rem, 0.18em, uppercase): section kickers above headlines ("Popular right now", today's date, "Tiny tip · 3/12"). These are often paired with a 14px icon or a 6px dot.

### Named Rules
**The Price-First Rule.** On any card, the price is the largest and heaviest text. Names, stores and targets never compete with it.

**The Grotesk-For-Numbers Rule.** Prices, counts and stats are set in Space Grotesk. Sentences are set in DM Sans, even short ones.

## Layout

The layout is a single centered column with a maximum width of 72rem and 16px side gutters (24px from 640px up). Pages stack in horizontal bands. The hero (generous top padding of 40px, 56px at `sm`) is followed by a full-width Ledger Band toolbar strip with rules above and below, then the content grid (40px vertical padding), and a hairline-ruled footer.

Grocery and popular cards sit in a responsive grid: one column on phones, two from 640px, three from 1024px, with 16px gaps. On large screens the hero splits into a flexible column and a fixed 20rem side column for Tiny Tips. Stat cards stay in three columns even on phones, stacking icon above value to fit.

Spacing runs on a 4px base. The recurring steps are 8 / 12 / 16 / 20 / 24 / 40 / 56px. Cards pad 20px, toolbars 16px. Every touch control in the toolbar and on cards is at least 40px, and primary controls are 44–48px tall.

**The Aisle Thumb Rule.** If it's tappable, it's at least 40px square, and the main action on a screen is 44px or taller.

## Elevation & Depth

Depth comes from layered paper, not shadows. Cream cards sit on oat paper. A darker Ledger Band closes each card and frames the toolbar. Hairline Ledger Rules separate bands. Shadows are almost invisible: a 1px ink-tinted lip under cards and a faint `shadow-sm` on toolbar inputs and buttons.

### Shadow Vocabulary
- **Card lip** (`box-shadow: 0 1px 0 rgba(34,64,58,0.04)`): resting grocery cards.

### Named Rules
**The Flat Paper Rule.** Surfaces are flat at rest. Separate things with tone and hairlines first. A shadow is the last resort and stays ink-tinted and soft.

**The No-Glow Rule.** No glow, sweep or lift effects. Primary buttons use the plain hover (lime at 80%), and cards stay still on hover.

## Shapes

The shapes are soft and sturdy. The base radius is 10px (`--radius: 0.625rem`), and other sizes are calculated from it. Buttons, inputs and tab tracks use 10px. Store-logo tiles use 14px. Cards, stat cards, initial tiles, tip cards and empty-state boxes use 18px. Pills (the "Now" chip, counts, avatar, menu trigger) are fully round. Borders are 1px hairlines everywhere. The only thick strokes are the 2px lime ring on at-target cards, the 2px olive underline on the active nav link, and the decorative 14px lime ring that peeks from the corner of the tips card.

Empty states use a dashed 1px border on a translucent cream box, to suggest "space to fill in".

## Components

### Buttons
Buttons are soft and sturdy, readable at arm's length.
- **Shape:** gently rounded (10px). Toolbar and dialog buttons are 44–48px tall with 16–18px text. The base shadcn sizes (32–36px) are for compact contexts only.
- **Primary:** Highlighter Lime fill with Spruce Ink semibold text, often with a leading 20px icon ("+ Add item"). Hover drops the lime to 80%. Pressed nudges down 1px.
- **Outline:** Card Cream fill with a Ledger Rule border and `shadow-sm`. Hover fills with Oat Mist. Used for secondary toolbar actions like "Lists".
- **Ghost:** no fill. Hover fills with Oat Mist. Used for icon actions such as the card's "⋯" menu (a 40px round target).
- **Destructive:** a Paprika tint (10%) with Paprika text, deepening to 20% on hover.
- **Focus:** a Dill Olive border plus a 3px Dill Olive ring at 50%.

### Chips
- **Now pill:** a fully round Highlighter Lime pill with Spruce Ink bold 12px text and a check icon. It appears only when a grocery is at or below its target.
- **Count badge:** an outline badge with a Tint Olive fill, an olive border at 40% and Basil Green text, next to section headlines.

### Cards / Containers
- **Grocery card** (signature): an 18px-rounded Card Cream card with a hairline ring, split into a 20px body and a Ledger Band footer behind a top rule. The body has a 56px Crate initial tile, a truncated name and search words, and a "⋯" menu, then the price line (big price, ±difference, store badge) indented to align under the name from 640px up. The footer has "Target: X kr", the last-checked time (in Paprika with "May be outdated · " when stale), and a 6px progress bar (ink fill on rule track) ending in either the Now pill or "X kr to go". An at-target card gets a 2px lime ring.
- **Stat card:** an 18px cream card with a 40px tinted icon square, a Space Grotesk value and a small Sage Grey label.
- **Tiny Tips card:** an 18px pale-green card (hard-coded `#eaf2d8` fill, `#d9e6bd` border, which aren't tokens yet) with a decorative lime ring (14px stroke, lime at 60%) peeking from the top-right corner, an eyebrow counter and a 40px "next" button. A new tip fades and rises 8px in over 300ms, with all of it disabled under reduced motion.

### Inputs / Fields
- **Style:** a Card Cream fill with a 1px Field Edge outline and a 10px radius. Fields are 44px tall in toolbars and forms, and use 16px text so iOS doesn't zoom in. The search field has a 16px leading search icon.
- **Focus:** a Dill Olive border plus a 3px olive ring at 50%.
- **Error:** a Paprika border plus a 3px Paprika ring at 20%. Error copy is plain and specific ("Target price must be a number above 0, e.g. 25 or 22,90.").

### Navigation
- **Header:** the logo (an 44px ink tile with a lime list icon and a lime halo, the app name and an eyebrow tagline from 640px up) on the left. Text links in the center (semibold 15px, Sage Grey, ink on hover). The active link has a 2px Dill Olive underline. A 40px initials avatar on the right opens the account menu. On phones the center links hide, and "Popular" moves into the avatar menu.
- **Tabs:** a Linen track 44px tall with 4px padding. The active tab is a Card Cream pill with semibold ink text. The track scrolls sideways when there are many lists.

### Store Badge (signature)
Each chain's logo sits on a 40px white tile with a 14px radius and a hairline ring. A chain without a logo gets the same tile showing its first two letters in Space Grotesk, so every card lines up.

## Do's and Don'ts

### Do:
- **Do** set backgrounds in Oat Paper (#f4f3ee) and surfaces in Card Cream (#fcfbf7). Separate bands with Ledger Band (#f7f6f1) and 1px Ledger Rules.
- **Do** pair Highlighter Lime with Spruce Ink text, every time.
- **Do** make the price the largest, heaviest element on a card, in Space Grotesk 700.
- **Do** label sections with the uppercase 12px / 0.18em eyebrow.
- **Do** round cards and tiles at 18px and controls at 10px. Keep borders to 1px hairlines.
- **Do** make primary and toolbar controls 44px or taller, and keep every tap target at least 40px.
- **Do** use the plain primary hover (lime at 80%) on primary buttons.
- **Do** respect `prefers-reduced-motion` for any transition or animation.

### Don't:
- **Don't** add glow, sweep or lift-on-hover effects.
- **Don't** set text in Highlighter Lime on a light background, or white text on lime.
- **Don't** use pure black (#000) or pure white surfaces, except the white backing behind store logos.
- **Don't** use Dill Olive for new small text, which is below AA contrast on Oat Paper.
- **Don't** let names, stores or labels outweigh the price on a card.
- **Don't** add heavy or colored shadows. Depth comes from paper tone and hairlines.
- **Don't** introduce a dark theme ad hoc. The system is light-only today.
