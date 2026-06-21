# Divya Dry Fruits — Technical Specification

## Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | ^15 | Framework (App Router) |
| react | ^19 | UI library |
| react-dom | ^19 | React DOM renderer |
| typescript | ^5 | Type safety |
| @types/react | ^19 | React type definitions |
| @types/react-dom | ^19 | ReactDOM type definitions |
| @types/node | ^22 | Node.js type definitions |
| tailwindcss | ^4 | Utility-first CSS |
| @tailwindcss/postcss | ^4 | PostCSS integration for Tailwind v4 |
| clsx | ^2 | Conditional className strings |
| tailwind-merge | ^2 | Merge Tailwind classes without conflicts |
| class-variance-authority | ^0.7 | Component variant management (Button, Input, Badge) |
| gsap | ^3.12 | Animation engine (ScrollTrigger, timelines, tweens) |
| lenis | ^1.2 | Smooth scroll with inertia |
| lucide-react | ^0.468 | Icon library (leaf, heart, sun, shopping-bag, user, search, menu, x, trash-2, plus, minus, chevron-down, check, star, phone, mail, map-pin, facebook, instagram, twitter, arrow-left, arrow-right, credit-card, indian-rupee, heart, eye, filter, grid, list, sort-asc, package, truck, shield-check) |
| react-fast-marquee | ^1.6 | Instagram section horizontal auto-scroll |
| bcryptjs | ^2.5 | Password hashing |
| @types/bcryptjs | ^2 | bcryptjs type definitions |
| jsonwebtoken | ^9 | JWT token generation/verification |
| @types/jsonwebtoken | ^9 | jsonwebtoken type definitions |
| jose | ^5 | JWT edge-compatible verification (Next.js middleware) |
| razorpay | ^2.9 | Payment gateway server-side SDK |
| @types/razorpay | ^2 | razorpay type definitions |
| @hookform/resolvers | ^3.10 | Form validation resolvers |
| react-hook-form | ^7.54 | Form state management |
| zod | ^3.24 | Schema validation |

**Dev-only**: `eslint`, `eslint-config-next`, `@eslint/eslintrc`

**Database & ORM**: Prisma ORM with SQLite (see Database section)

**No shadcn/ui**: This project builds a bespoke premium design. All UI components (Button, Input, Badge, Card, Modal, Toast, Skeleton) are custom-built to match the exact Forest Green / Gold / Warm Cream design system. shadcn's generic styling would require more override work than building from scratch.

---

## Component Inventory

### Layout Components (shared across pages)

| Component | Source | Notes |
|-----------|--------|-------|
| Header | Custom | Sticky with scroll-driven transparent→solid transition. Z-index 1000. Desktop: nav links left, logo center, icons right. Mobile: hamburger triggers full-screen overlay |
| Footer | Custom | 4-column desktop grid (brand + 3 link columns), mobile accordion. Forest Green background |
| CartSidebar | Custom | Slides from right (400px, 100% mobile). Fixed-position backdrop + panel. Manages its own open/close state |
| MobileNav | Custom | Full-screen Forest Green overlay, slide-in from right. Hamburger-triggered, closes on link click |
| SearchOverlay | Custom | Full-screen white overlay with centered search input. Escape to close |

### Reusable Components (used by multiple sections/pages)

| Component | Source | Used By |
|-----------|--------|---------|
| Button | Custom (CVA) | Every page. Variants: primary, secondary/outline, text-link. 3 sizes |
| Input | Custom | Checkout, Login, Register, Account, Admin, Newsletter, Search |
| Badge | Custom (CVA) | ProductCard (organic/bestseller), Order status, Coupon. Variants: default, gold, mutedSage, error, success |
| ProductCard | Custom | Home (BestSellers), Shop (product grid), RelatedProducts. Handles weight selection pill click, Add to Cart |
| Toast | Custom | Global — Cart actions, auth, checkout, admin. Fixed top-right, auto-dismiss 4s |
| Modal | Custom | Delete confirmations (admin), quick view (optional) |
| SectionHeading | Custom | Home sections, Shop, Blog, About. Variants: centered, left-aligned. Consistent label + heading + optional subtitle pattern |
| StarRating | Custom | ProductCard, ProductDetail (display + input), Testimonials. Filled/empty star rendering |
| LoadingSkeleton | Custom | Shop (product grid), Admin (tables), Order history. Pulse animation on grey blocks |
| QuantityStepper | Custom | CartSidebar, ProductDetail. +/- buttons with clamped numeric value |
| SocialShareButtons | Custom | Blog post, Product detail. Circular icon row (FB, IG, X, Pinterest) |

### Page Sections — Home

| Section | Key Notes |
|---------|-----------|
| HeroSection | Parallax background (GSAP ScrollTrigger scrub), auto-advancing carousel (5 slides, 5000ms interval), cross-fade transitions, right-side nav panel (desktop only) |
| BestSellersSection | 2-column grid of ProductCards, scroll-triggered reveal with stagger |
| BrandStorySection | Centered manifesto text on Warm Cream, Cormorant Garamond italic |
| HealthBenefitsSection | 3-column feature cards with SVG icons (leaf, heart, sun) |
| FeaturedCategoriesSection | Horizontal scroll carousel with scroll-snap, left/right arrow buttons (desktop). Category cards with image + overlay text |
| TestimonialsSection | Single-visible carousel with dot indicators, 5s auto-rotation |
| NewsletterSection | Forest Green background, email input + subscribe button |
| InstagramGallerySection | react-fast-marquee auto-scroll, 6 square images with hover overlay |

### Page Sections — Shop

| Section | Key Notes |
|---------|-----------|
| ProductGridSection | Responsive grid (1 col mobile, 2 tablet, 3 desktop, 4 large). Integrates filters (category, price range, search), sort dropdown, and pagination. URL-synced query params for shareable filtered views |
| FilterSidebar | Desktop: left sidebar. Mobile: slide-up bottom sheet. Category checkboxes, price range slider |

### Page Sections — Product Detail

| Section | Key Notes |
|---------|-----------|
| ProductImageGallery | Thumbnail strip + main image area. Image zoom on hover (desktop). Optional lightbox |
| ProductInfoSection | Name, rating, price (dynamic by selected weight), weight option pills, Add to Cart / Buy Now buttons, stock indicator |
| ProductTabs | Tabs: Description, Nutrition Info, Reviews. Review tab includes star rating input + review form |
| RelatedProductsSection | Horizontal scroll of 4 ProductCards, "You may also like" heading |

### Page Sections — Cart

| Component | Notes |
|-----------|-------|
| CartItem | Thumbnail, name, weight, unit price, QuantityStepper, line total, remove button. Guest cart persisted in localStorage |
| CartSummary | Subtotal, shipping (free above ₹999), coupon input with apply/remove, total. Proceed to Checkout CTA (redirects to login if not authenticated) |

### Page Sections — Checkout

| Section | Key Notes |
|---------|-----------|
| CheckoutForm | Multi-step: Shipping Address → Order Summary → Payment. Shipping form (name, phone, address, city, state, pincode). Address validation with pincode API |
| OrderSummary | Cart items (read-only), shipping cost, coupon discount, final total |
| RazorpayPayment | React state machine: init → payment_requested → processing → success/failed. Create Razorpay order server-side, open Razorpay checkout modal client-side, verify signature server-side, update order status |

### Page Sections — Auth

| Page | Notes |
|------|-------|
| LoginPage | Email/password form, "Continue as Guest" option, redirect-to query param support |
| RegisterPage | Full form: name, email, phone, password, confirm password. Auto-login after registration |

### Page Sections — Account

| Page | Notes |
|------|-------|
| ProfilePage | Name, email, phone editable form. Password change section |
| AddressBookPage | CRUD for multiple addresses (shipping). Default address toggle |
| OrderHistoryPage | Table of orders with status badge, date, total. Click → Order Detail page |
| OrderDetailPage | Full order info: items, quantities, prices, shipping address, tracking timeline, status |

### Page Sections — Blog

| Page | Notes |
|------|-------|
| BlogListingPage | Card grid with category filter, search, pagination. Each card: image, title, excerpt, date, read time |
| BlogPostPage | Rich text content, author info, social share buttons, related posts |

### Page Sections — Admin Dashboard

| Page/Component | Notes |
|----------------|-------|
| AdminLayout | Sidebar nav + main content area. Route guard: redirect non-admin users to home |
| ProductManagementPage | Table with pagination, search, sort. Add/Edit modal with form (name, description, categories, images, weight variants, prices, stock). Image upload to public directory |
| CategoryManagementPage | CRUD for categories. Name, slug, description, image |
| OrderManagementPage | Table with status filters (pending, confirmed, shipped, delivered, cancelled). Status update dropdown per order. View order detail modal |
| CustomerManagementPage | Table of registered users. View user detail + order history |
| CouponManagementPage | CRUD for coupons. Code, discount type (percent/fixed), value, min order, expiry, usage limit |
| DashboardStatsCards | Summary cards: total orders, revenue, customers, products. Date range filter |

---

## Animation Implementation

| Animation | Library | Implementation Approach | Complexity |
|-----------|---------|------------------------|------------|
| Smooth scroll (global) | Lenis | Initialize in root layout. Lenis instance synced with GSAP ticker via `lenis.on('scroll', ScrollTrigger.update)` | Low |
| Scroll-triggered reveals | GSAP ScrollTrigger | Reusable `useScrollReveal` hook. Applies `gsap.from(el, { opacity: 0, y: 30, duration: 0.6, ease: 'power2.out' })` with ScrollTrigger `start: 'top 85%'`. Stagger via `gsap.from` with `stagger: 0.1` on parent | Low |
| Header scroll transition | GSAP ScrollTrigger | ScrollTrigger with `start: '100px top'`, `toggleActions: 'play reverse play reverse'`. Tween backgroundColor, color, boxShadow | Low |
| Hero parallax | GSAP ScrollTrigger | Background image: `gsap.to(bg, { yPercent: 30, ease: 'none', scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } })` | Medium |
| Hero carousel cross-fade | GSAP + React state | Active slide: `gsap.fromTo(slide, { opacity: 0 }, { opacity: 1, duration: 0.6 })`. Text children stagger with `gsap.from(textEls, { y: 20, opacity: 0, stagger: 0.1, delay: 0.1 })`. Auto-advance via `setInterval` cleared on manual nav | Medium |
| Right nav panel hover descriptions | CSS transitions | Description element: `opacity: 0, max-height: 0` → `opacity: 1, max-height: 40px` on parent hover. Pure CSS, 200ms ease-out | Low |
| Product card hover | CSS transitions | `transition: box-shadow 300ms, transform 300ms`. Hover: `box-shadow: 0 8px 24px rgba(0,0,0,0.08)`. Image: `transition: transform 300ms`. Hover: `transform: scale(1.03)` with `overflow: hidden` on container | Low |
| Mobile nav slide-in | GSAP | `gsap.fromTo(overlay, { x: '100%' }, { x: '0%', duration: 0.3, ease: 'expo.out' })`. Links stagger: `gsap.from(links, { x: 40, opacity: 0, stagger: 0.05 })` | Low |
| Cart sidebar slide | CSS transition | `transform: translateX(100%)` → `translateX(0)` with `transition: transform 300ms cubic-bezier(0.16, 1, 0.3, 1)`. Backdrop: `opacity` fade 200ms | Low |
| Testimonial carousel cross-fade | GSAP | Same cross-fade pattern as hero carousel but single-card. `gsap.fromTo(quote, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5 })` | Low |
| Instagram marquee | react-fast-marquee | `<Marquee speed={40} gradient={false}>...images...</Marquee>`. Hover pause on `onMouseEnter`/`onMouseLeave` | Low |
| Loading skeleton pulse | CSS keyframes | `@keyframes pulse { 0%, 100% { opacity: 0.4 } 50% { opacity: 1 } }` animation 1.5s infinite | Low |
| Toast slide-in | CSS keyframes | `@keyframes slideIn { from { transform: translateX(100%); opacity: 0 } to { transform: translateX(0); opacity: 1 } }` 300ms | Low |
| Modal entrance | CSS transitions | Backdrop: `opacity` 0 → 1, 200ms. Modal card: `opacity` + `transform: scale(0.95 → 1.0)`, 200ms ease-out | Low |
| Featured categories horizontal scroll | CSS scroll-snap | `scroll-snap-type: x mandatory` on container, `scroll-snap-align: start` on cards. Arrow buttons call `scrollBy({ left: cardWidth + gap, behavior: 'smooth' })` | Low |
| Brand story leaf parallax | GSAP ScrollTrigger | Decorative leaf SVG: very slow horizontal drift, `scrub: true`, minimal movement (±20px) | Low |
| Newsletter success state | CSS transition | Input container height collapse + thank-you message fade-in, 400ms | Low |
| Category card hover zoom | CSS transition | Image `transform: scale(1.05)`, overlay `opacity` reduction, 400ms ease-out | Low |
| Footer column scroll reveal | GSAP ScrollTrigger | Same `useScrollReveal` hook with stagger on column children | Low |

**Total animation complexity**: ~18 animations. All are standard GSAP/CSS implementations — no WebGL, no custom shaders, no particle systems. Well within medium complexity.

---

## State & Logic Plan

### Cart State (React Context + localStorage)

```typescript
type CartItem = {
  productId: string;
  variantId: string; // references a specific weight variant
  name: string;
  image: string;
  weight: string;
  price: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  coupon: { code: string; discount: number; type: 'percent' | 'fixed' } | null;
};
```

**Logic**: CartContext wraps the app. `useCart()` hook exposes `addItem`, `removeItem`, `updateQuantity`, `applyCoupon`, `removeCoupon`, `clearCart`. All operations persist to `localStorage` immediately (key: `divya_cart`). Guest cart survives page refresh. On login, server-side merge strategy (future enhancement) — for now, localStorage cart is king.

**Checkout guard**: If cart is empty, redirect to Shop. If user not authenticated, redirect to Login with `redirectTo=/checkout`.

### Auth Flow (JWT cookie-based)

```
[Register] → POST /api/auth/register → bcrypt hash → create user → issue JWT (httpOnly cookie) → redirect
[Login]    → POST /api/auth/login    → bcrypt verify → issue JWT (httpOnly cookie) → redirect
[Logout]   → POST /api/auth/logout   → clear cookie → redirect to home
[Me]       → GET  /api/auth/me      → verify JWT → return user (role: 'user' | 'admin')
```

**Middleware** (`middleware.ts`): Check JWT cookie on protected routes. `/admin/*` requires `role === 'admin'` — redirect non-admin to home. `/checkout`, `/account/*` require any authenticated user — redirect to `/login?redirectTo=...`. API routes: `/api/admin/*` validate admin role, return 403 otherwise.

**Password hashing**: bcryptjs with 10 salt rounds. JWT secret from env, 7-day expiry.

### Checkout & Payment State Machine

```
[checkout_page] → validate cart not empty
   → [shipping_form] → user fills address → validate pincode
   → [order_summary] → review cart + pricing (server-calculated to prevent tampering)
   → [razorpay_init] → POST /api/orders (creates order record: status='pending')
        → server creates Razorpay order → returns { orderId, amount, key, currency }
   → [payment_modal] → Razorpay checkout.js modal opens (UPI/Card/NetBanking/Wallets)
        → [payment_success] → Razorpay callback → POST /api/orders/verify
              → server verifies signature → update order status='confirmed'
              → clear cart → redirect to /order-success?orderId=xxx
        → [payment_failed] → status remains 'pending' → show retry/error → redirect to /order-failed
```

**Critical**: Never trust client-side price calculations. Server recalculates totals from database on order creation. Coupon validation server-side. Stock decremented only after successful payment verification.

### Admin Route Protection (Middleware + Layout)

- **Middleware layer**: Checks JWT → verifies `role === 'admin'` for `/admin/*` routes and `/api/admin/*` routes. Non-admin → 403 for API, redirect for pages.
- **Layout layer**: `AdminLayout` component renders sidebar + content. Client-side role check as secondary guard (SSR won't expose admin data to non-admins anyway).
- **Admin login**: Admins use the same login form. Role-based rendering differentiates admin sidebar link in header.

### Product Filtering (URL-driven)

Shop page filters are URL query params: `?category=almonds&minPrice=100&maxPrice=1000&sort=price_asc&page=2&search=walnut`.

**Logic**: On mount, parse URL params → set filter state → fetch products. On filter change, update URL via `router.push` (replaces history for sort/page, pushes for filter changes). This makes filtered views shareable and bookmarkable.

### Weight Variant Selection

Each product has multiple weight variants (250g, 500g, 1kg) with different prices and stock levels. Product detail page shows weight option pills; clicking a pill updates displayed price, stock status, and the variant added to cart. Only one variant per product can be in cart at a time (cart dedupes by `productId + variantId`, increments quantity).

---

## Data Flow & API Architecture

### Server-Side Data Fetching (App Router)

All data fetching happens in Server Components via direct Prisma calls (no REST API layer for read operations). This eliminates API endpoint boilerplate for ~80% of data needs.

```
Page Component (Server) → Prisma Query → Database → Render
```

Server Actions handle mutations (forms, cart is client-side only).

### API Routes (only where needed)

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/auth/register` | POST | Create user, hash password, issue JWT cookie |
| `/api/auth/login` | POST | Verify credentials, issue JWT cookie |
| `/api/auth/logout` | POST | Clear JWT cookie |
| `/api/auth/me` | GET | Return current user from JWT (called client-side for auth state) |
| `/api/orders` | POST | Create order (server-side pricing validation, stock check) |
| `/api/orders/verify` | POST | Verify Razorpay payment signature, update order status |
| `/api/razorpay/order` | POST | Create Razorpay order (server-side with amount from validated cart) |
| `/api/admin/products` | GET/POST/PUT/DELETE | Admin product CRUD with image upload |
| `/api/admin/categories` | GET/POST/PUT/DELETE | Admin category CRUD |
| `/api/admin/orders` | GET/PUT | Admin order list with filters, status update |
| `/api/admin/customers` | GET | Admin customer list |
| `/api/admin/coupons` | GET/POST/PUT/DELETE | Admin coupon CRUD |
| `/api/admin/stats` | GET | Dashboard aggregate data (revenue, orders, etc.) |

### Auth State (Client-Side)

React Context (`AuthContext`) queries `/api/auth/me` on mount and caches user data. Provides `user`, `isAdmin`, `login`, `register`, `logout` methods. Used by Header (conditional admin link, account link), route guards, and checkout flow.

### Image Handling

- **Product images**: Uploaded via admin to `/public/uploads/products/`. Reference stored in database as relative path. Next.js `<Image>` with `fill` or explicit dimensions.
- **Category images**: Same pattern, `/public/uploads/categories/`.
- **Blog images**: Same pattern, `/public/uploads/blog/`.
- **Static assets** (hero, icons): In `/public/` root, directly referenced.
- **OG image**: `/public/og-image.jpg` for social sharing.

---

## Database Design (Prisma + SQLite)

### Schema

```prisma
// User model — supports both customers and admins via role field
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  password  String   // bcrypt hashed
  name      String
  phone     String?
  role      Role     @default(user)  // user | admin
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders    Order[]
  addresses Address[]
  reviews   Review[]
}

enum Role {
  user
  admin
}

// Product with multiple weight variants
model Product {
  id          String   @id @default(cuid())
  name        String
  slug        String   @unique
  description String   @db.Text
  ingredients String?  @db.Text
  origin      String?
  nutritionInfo Json?  // { servingSize, calories, protein, fat, carbs, fiber }
  images      String   // JSON array of image paths
  categoryId  String
  isActive    Boolean  @default(true)
  isBestseller Boolean @default(false)
  isFeatured  Boolean  @default(false)
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  category    Category   @relation(fields: [categoryId], references: [id])
  variants    ProductVariant[]
  reviews     Review[]
  orderItems  OrderItem[]
}

// Weight variants for each product (250g, 500g, 1kg)
model ProductVariant {
  id        String @id @default(cuid())
  productId String
  weight    String // "250g", "500g", "1kg"
  price     Float
  compareAtPrice Float? // original price for discount display
  stock     Int    @default(0)
  sku       String @unique

  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  orderItems OrderItem[]
}

model Category {
  id          String @id @default(cuid())
  name        String
  slug        String @unique
  description String? @db.Text
  image       String?
  sortOrder   Int    @default(0)

  products    Product[]
}

model Order {
  id          String      @id @default(cuid())
  userId      String?     // nullable for guest orders
  guestEmail  String?     // for guest checkout
  guestPhone  String?
  status      OrderStatus @default(pending)
  paymentStatus PaymentStatus @default(pending)
  razorpayOrderId String? // Razorpay order ID
  razorpayPaymentId String? // Razorpay payment ID after success
  subtotal    Float
  shipping    Float       @default(0)
  discount    Float       @default(0)
  total       Float
  couponCode  String?
  couponDiscount Float @default(0)

  // Shipping address (denormalized for order history)
  shippingName    String
  shippingPhone   String
  shippingAddress String
  shippingCity    String
  shippingState   String
  shippingPincode String

  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt

  user        User?       @relation(fields: [userId], references: [id])
  items       OrderItem[]
}

enum OrderStatus {
  pending
  confirmed
  shipped
  delivered
  cancelled
}

enum PaymentStatus {
  pending
  paid
  failed
  refunded
}

model OrderItem {
  id        String @id @default(cuid())
  orderId   String
  productId String
  variantId String
  name      String // snapshot at purchase time
  weight    String
  price     Float  // snapshot price
  quantity  Int

  order     Order   @relation(fields: [orderId], references: [id], onDelete: Cascade)
  product   Product @relation(fields: [productId], references: [id])
  variant   ProductVariant @relation(fields: [variantId], references: [id])
}

model Review {
  id        String @id @default(cuid())
  productId String
  userId    String
  rating    Int    // 1-5
  comment   String @db.Text
  createdAt DateTime @default(now())

  product   Product @relation(fields: [productId], references: [id], onDelete: Cascade)
  user      User    @relation(fields: [userId], references: [id], onDelete: Cascade)
}

model Coupon {
  id          String   @id @default(cuid())
  code        String   @unique
  discountType String  // "percent" | "fixed"
  discountValue Float
  minOrder    Float    @default(0)
  maxDiscount Float?   // cap for percent discounts
  expiryDate  DateTime
  usageLimit  Int?     // max total uses
  usageCount  Int      @default(0)
  isActive    Boolean  @default(true)
}

model Address {
  id        String @id @default(cuid())
  userId    String
  name      String
  phone     String
  address   String
  city      String
  state     String
  pincode   String
  isDefault Boolean @default(false)

  user      User @relation(fields: [userId], references: [id], onDelete: Cascade)
}

// Blog models
model BlogPost {
  id        String @id @default(cuid())
  slug      String @unique
  title     String
  excerpt   String @db.Text
  content   String @db.Text // HTML/Markdown content
  image     String
  category  String
  author    String
  readTime  Int
  publishedAt DateTime @default(now())
}
```

### Seeding Strategy

Seed script (`prisma/seed.ts`) runs on `npx prisma db seed`. Populates:
- 6 categories (Almonds, Cashews, Walnuts, Pistachios, Raisins & Dates, Mixed & Gifts)
- ~20 products with realistic names, descriptions, 1-3 weight variants each, Kashmiri/California/Afghan origin details, nutrition JSON
- 5-8 blog posts with health tips, recipes, brand stories
- 1 admin user (admin@divyadryfruits.com / admin123)
- 3-5 sample coupons

---

## Project Structure

```
├── app/                           # Next.js App Router
│   ├── layout.tsx                 # Root layout: fonts, Lenis, providers (Auth, Cart)
│   ├── page.tsx                   # Homepage (assembles sections)
│   ├── globals.css                # Tailwind imports, custom properties, keyframes
│   ├── (shop)/                    # Shop route group
│   │   ├── shop/
│   │   │   ├── page.tsx           # Product listing (server: fetches products with filters)
│   │   │   └── [slug]/
│   │   │       └── page.tsx       # Product detail (server: fetches product + variants + reviews)
│   ├── (cart)/
│   │   └── cart/
│   │       └── page.tsx           # Cart page (client: reads CartContext)
│   ├── (checkout)/
│   │   └── checkout/
│   │       └── page.tsx           # Checkout flow (client: address form + Razorpay)
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx           # Login form
│   │   └── register/
│   │       └── page.tsx           # Registration form
│   ├── (account)/
│   │   └── account/
│   │       ├── page.tsx           # Profile
│   │       ├── addresses/
│   │       │   └── page.tsx       # Address book
│   │       └── orders/
│   │           ├── page.tsx       # Order history
│   │           └── [id]/
│   │               └── page.tsx   # Order detail
│   ├── (admin)/                   # Admin route group (protected by middleware)
│   │   └── admin/
│   │       ├── layout.tsx         # Admin layout (sidebar + content area)
│   │       ├── page.tsx           # Dashboard (stats + charts)
│   │       ├── products/
│   │       │   └── page.tsx       # Product management table
│   │       ├── categories/
│   │       │   └── page.tsx       # Category management
│   │       ├── orders/
│   │       │   └── page.tsx       # Order management
│   │       ├── customers/
│   │       │   └── page.tsx       # Customer management
│   │       └── coupons/
│   │           └── page.tsx       # Coupon management
│   ├── blog/
│   │   ├── page.tsx               # Blog listing
│   │   └── [slug]/
│   │       └── page.tsx           # Blog post detail
│   ├── about/
│   │   └── page.tsx               # About Us page
│   ├── contact/
│   │   └── page.tsx               # Contact page
│   ├── order-success/
│   │   └── page.tsx               # Post-payment success page
│   ├── order-failed/
│   │   └── page.tsx               # Post-payment failed page
│   └── api/                       # API Routes
│       ├── auth/
│       │   ├── register/
│       │   │   └── route.ts
│       │   ├── login/
│       │   │   └── route.ts
│       │   ├── logout/
│       │   │   └── route.ts
│       │   └── me/
│       │       └── route.ts
│       ├── orders/
│       │   ├── route.ts           # POST create order
│       │   └── verify/
│       │       └── route.ts       # POST verify payment
│       ├── razorpay/
│       │   └── order/
│       │       └── route.ts       # POST create Razorpay order
│       └── admin/
│           ├── products/
│           │   └── route.ts
│           ├── categories/
│           │   └── route.ts
│           ├── orders/
│           │   └── route.ts
│           ├── customers/
│           │   └── route.ts
│           ├── coupons/
│           │   └── route.ts
│           ├── stats/
│           │   └── route.ts
│           └── upload/
│               └── route.ts       # POST image upload handler
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── CartSidebar.tsx
│   │   ├── MobileNav.tsx
│   │   └── SearchOverlay.tsx
│   ├── ui/
│   │   ├── Button.tsx             # CVA variants: primary, secondary, text-link
│   │   ├── Input.tsx
│   │   ├── Badge.tsx              # CVA variants: default, gold, mutedSage, error, success
│   │   ├── ProductCard.tsx
│   │   ├── Toast.tsx
│   │   ├── ToastContainer.tsx     # Manages multiple toasts, fixed top-right
│   │   ├── Modal.tsx
│   │   ├── SectionHeading.tsx     # Centered or left-aligned
│   │   ├── StarRating.tsx         # Display + input mode
│   │   ├── LoadingSkeleton.tsx
│   │   ├── QuantityStepper.tsx
│   │   └── SocialShareButtons.tsx
│   ├── sections/
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── BestSellersSection.tsx
│   │   │   ├── BrandStorySection.tsx
│   │   │   ├── HealthBenefitsSection.tsx
│   │   │   ├── FeaturedCategoriesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   ├── NewsletterSection.tsx
│   │   │   └── InstagramGallerySection.tsx
│   │   ├── shop/
│   │   │   ├── ProductGridSection.tsx
│   │   │   └── FilterSidebar.tsx
│   │   ├── product/
│   │   │   ├── ProductImageGallery.tsx
│   │   │   ├── ProductInfoSection.tsx
│   │   │   ├── ProductTabs.tsx
│   │   │   └── RelatedProductsSection.tsx
│   │   ├── cart/
│   │   │   ├── CartItem.tsx
│   │   │   └── CartSummary.tsx
│   │   ├── checkout/
│   │   │   ├── CheckoutForm.tsx
│   │   │   ├── OrderSummary.tsx
│   │   │   └── RazorpayPayment.tsx
│   │   ├── blog/
│   │   │   ├── BlogCard.tsx
│   │   │   └── BlogContent.tsx
│   │   └── admin/
│   │       ├── ProductFormModal.tsx
│   │       ├── CategoryFormModal.tsx
│   │       ├── OrderDetailModal.tsx
│   │       ├── DataTable.tsx        # Reusable sortable/paginated table
│   │       ├── StatusBadge.tsx      # Order status colored badges
│   │       └── StatsCard.tsx        # Dashboard stat cards
│   └── providers/
│       ├── AuthProvider.tsx         # AuthContext + useAuth hook
│       ├── CartProvider.tsx         # CartContext + useCart hook
│       └── ToastProvider.tsx        # ToastContext + useToast hook
│
├── lib/
│   ├── prisma.ts                  # Prisma client singleton
│   ├── auth.ts                    # JWT issue/verify helpers, bcrypt wrappers
│   ├── cart-utils.ts              # Cart calculation helpers (subtotal, shipping, total)
│   ├── razorpay.ts                # Razorpay client initialization
│   ├── validators.ts              # Zod schemas for forms (login, register, checkout, product, coupon)
│   └── utils.ts                   # cn() helper (clsx + tailwind-merge), formatPrice, formatDate
│
├── hooks/
│   ├── useScrollReveal.ts         # GSAP ScrollTrigger setup for element
│   ├── useLenis.ts               # Lenis smooth scroll instance access
│   ├── useMediaQuery.ts          # Responsive breakpoint detection
│   └── useDebounce.ts            # Debounced value for search inputs
│
├── types/
│   └── index.ts                   # Shared TypeScript interfaces (CartItem, FilterState, etc.)
│
├── prisma/
│   ├── schema.prisma              # Full database schema
│   └── seed.ts                    # Seed script with products, categories, blog posts
│
├── public/
│   ├── uploads/                   # Runtime uploads (products, categories, blog images)
│   │   ├── products/
│   │   ├── categories/
│   │   └── blog/
│   └── og-image.jpg               # Social sharing image
│
├── middleware.ts                  # Route guards: admin pages, auth pages, API protection
├── next.config.js                 # Image domains, redirects, env vars
├── tailwind.config.ts             # Custom colors, fonts, spacing tokens
├── tsconfig.json
└── package.json
```

---

## Razorpay Integration Details

### Flow

1. **Checkout page** calls `POST /api/orders` with cart data + address + coupon
2. **Server validates**: cart items exist, prices match database, stock available, coupon valid
3. **Server creates**: `Order` record in DB with `status: 'pending'`
4. **Server creates**: Razorpay order via SDK → returns `{ orderId, amount, currency, key }` to client
5. **Client** initializes Razorpay Checkout with order details + `handler` callback
6. **Customer pays** via Razorpay modal (UPI/Card/NetBanking/Wallets)
7. **On success**, Razorpay calls handler with `razorpay_payment_id`, `razorpay_order_id`, `razorpay_signature`
8. **Client POSTs** to `/api/orders/verify` with payment details
9. **Server verifies** signature using `crypto.createHmac('sha256', secret).update(orderId + '|' + paymentId).digest('hex')`
10. **On match**: update order `status: 'confirmed'`, `paymentStatus: 'paid'`, decrement stock
11. **On mismatch**: order stays `pending`, notify customer of failure

### Environment Variables

```
RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

---

## Key Implementation Notes

### Image Upload (Admin)

Admin product/category forms use native `FormData` with `<input type="file" multiple>`. `POST /api/admin/upload` receives FormData, writes files to `/public/uploads/{type}/` using Node.js `fs`, returns array of relative paths. Files are served statically by Next.js.

### Server Components vs Client Components

| Pattern | Approach |
|---------|----------|
| Data fetching | Server Components directly call Prisma |
| Forms (checkout, login, admin) | Client Components with React Hook Form + Server Actions or API routes |
| Cart | Client Component tree (CartProvider) — needs interactivity |
| Auth state | Client-side Context that hydrates from `/api/auth/me` |
| Animations | Client Components use GSAP hooks (`useEffect` + `useRef`) |

### SEO

- Each page has unique `<title>` and `<meta name="description">` via Next.js `Metadata` export
- `/sitemap.ts` generates XML sitemap from products, categories, blog posts
- `/robots.ts` allows all, points to sitemap
- Product pages include `product` schema.org JSON-LD (name, image, price, availability, rating)
- Blog posts include `Article` schema.org JSON-LD

### Performance

- Product images use Next.js `<Image>` with `priority` for above-fold, `loading="lazy"` for below-fold
- Hero carousel images preloaded
- Font optimization via `next/font` (Cormorant Garamond, DM Sans subsetted)
- GSAP ScrollTrigger batch for scroll reveals to minimize observer count

---

## Other Key Decisions

### Why SQLite over PostgreSQL

SQLite is specified for zero-config local development and deployment simplicity. For production scale, the Prisma schema is compatible with PostgreSQL — simply change the `DATABASE_URL` to a PostgreSQL connection string. The schema uses standard SQL types (no SQLite-specific features).

### Why localStorage for Guest Cart

Guest cart must survive page refreshes without server persistence. `localStorage` is the simplest mechanism. On checkout, cart data is sent to server which validates against database (preventing price tampering). No server-side cart table needed.

### Why JWT Cookie over Session

JWT in `httpOnly` cookie provides stateless authentication suitable for serverless Next.js deployment. No session store required. The cookie is automatically sent with all requests (including Server Component RSC fetches via middleware).

### Why Direct Prisma in Server Components over API Routes

Next.js App Router Server Components can directly import and use Prisma. This eliminates ~15 API routes for read operations (shop listing, product detail, blog, etc.), reducing code duplication. API routes are only needed for: auth, mutations that require client-side calling (Razorpay), file upload, and admin data operations.

### Why bcryptjs over bcrypt

bcryptjs is pure JavaScript — no native dependencies, no platform-specific compilation. Works in all environments including serverless/edge without issues.

### Why jose + jsonwebtoken

`jsonwebtoken` is used server-side (API routes) for JWT sign/verify. `jose` is used in middleware (Edge runtime) for JWT verification — jsonwebtoken doesn't run in Edge. Both use the same secret and algorithm (HS256).
