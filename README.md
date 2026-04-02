# 🛒 EcommStore – Next.js Ecommerce App

An Ecommerce web application built using **Next.js (App Router)** and the public API:  
https://dummyjson.com/products/

This project demonstrates real-world frontend patterns such as **URL-based state management, server-side data fetching, filtering, and search** using modern **React** and **Next.js** practices.

![alt text](/public/image.png)
---

## 🚀 Features

### 🔍 Search Functionality

- Users can search products using a search bar in the navbar.
- Search queries are stored in the URL (`?q=phone`), enabling:
  - Shareable links
  - Browser navigation (back/forward)
  - Persistent state

![alt text](/public/image-1.png)
---

### 🧩 Sidebar Filters

- Dynamic filters for:
  - 📂 Categories
  - 💰 Price range (min & max)
- Filters are synced with the URL:
  - Example:  
    `?categories=smartphones,laptops&min=100&max=2000`

![alt text](/public/image-2.png)

---

### 🔗 URL State Management

- Fully controlled using:
  - [useSearchParams()](https://nextjs.org/docs/app/api-reference/functions/use-search-params)
  - [useRouter()](https://nextjs.org/docs/app/api-reference/functions/use-router)
  - [URLSearchParams](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)
- Enables:
  - Deep linking
  - State persistence across reloads
  - Clean and predictable UI state

---

### ⚡ Debounced Search

- Implemented using `use-debounce`
- Prevents excessive API calls while typing
- Improves performance and UX

---

### 🖥️ Server-Side Data Fetching

- Products are fetched in a **Server Component (`page.js`)**
- Ensures:
  - Faster initial load
  - SEO benefits
  - Better performance

---

### 🎨 UI & Design

- Built using **[ShadcnUI](https://ui.shadcn.com/) components**
- Responsive layout:
  - Grid-based product display
  - Mobile-friendly sidebar
- Clean and modern design

---

## 🧠 How It Works

### 📌 Search Flow

1. User types in the search bar
2. Input is debounced
3. URL is updated with `q` parameter
4. Server component re-fetches data based on query

---

### 📌 Filtering Flow

1. User selects categories or price range
2. Sidebar updates URL parameters
3. Server component reads:
   - `categories`
   - `min`
   - `max`
4. Products are filtered accordingly

---

### 📌 URL Example

```
/?q=phone&categories=smartphones,laptops&min=500&max=2000
```

---

## 📦 API Endpoints Used

- **All Products**

  ```
  https://dummyjson.com/products
  ```

- **Search Products**

  ```
  https://dummyjson.com/products/search?q=phone
  ```

- **Categories**
  ```
  https://dummyjson.com/products/categories
  ```

---

## 🧱 Tech Stack

- **Framework:** Next.js (App Router)
- **Language:** JavaScript
- **UI Library:** [ShadcnUI](https://ui.shadcn.com/)
- **Icons:** Lucide React
- **State Management:** URL-based (no global state)
- **Utilities:** [use-debounce](https://www.npmjs.com/package/use-debounce)

---

## 📂 Key Components

### 🔝 Navbar

- Search input with debouncing
- Updates URL query params dynamically

---

### 📚 Sidebar

- Fetches categories dynamically
- Handles:
  - Multi-select categories
  - Price range slider
- Updates URL on every interaction

---

### 🏠 Home Page (`page.js`)

- Server component
- Reads `searchParams`
- Fetches & filters products:
  - By search query
  - By category
  - By price range

---

## 🧪 Learnings & Concepts Covered

- URL-driven state management
- Server vs Client components in Next.js
- Debouncing in React
- Dynamic filtering logic
- Clean separation of concerns
- Building scalable UI with [ShadcnUI](https://ui.shadcn.com/)

---

## 🏁 Getting Started

```bash
git clone <your-repo-url>
cd ecommerce-app
npm install
npm run dev
```

---
