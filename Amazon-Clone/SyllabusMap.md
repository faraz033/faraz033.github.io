# 🎓 Project Syllabus Alignment Map

This document outlines how this **Amazon Prime Clone** project satisfies the topics required in the college syllabus for **Unit-2 (JavaScript Programming)** and **Unit-3 (React Fundamentals)**. Use this mapping as a guide for your project defense or presentation.

---

## ⚡ UNIT-2: JavaScript Programming (Basics to APIs)

### 1. JavaScript Basics
*   **Variables, Data Types, and Operators**:
    *   Used throughout the project. Product listings, categories, quantities, and pricing use numbers, strings, arrays, booleans, and objects.
    *   *Implementation File:* [App.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/App.jsx) (cart state holds object arrays), and [products.json](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/public/products.json) (structured data types).
*   **Loops & Conditionals**:
    *   Used conditional statements (`if-else`, ternary operators `? :`) for rendering badges, shopping cart states, and stock availability.
    *   *Implementation File:* [Home.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/pages/Home.jsx) (conditional filters) and [Cart.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/pages/Cart.jsx) (empty cart toggle).
*   **`for...in` and `for...of` Loops**:
    *   Implemented explicitly in the Shopping Cart component to aggregate quantities and prices.
    *   `for...of` loop calculates total items:
        ```javascript
        let totalItems = 0;
        for (const item of cart) {
          totalItems += item.quantity;
        }
        ```
    *   `for...in` loop calculates grand total price:
        ```javascript
        let totalPrice = 0;
        for (const idx in cart) {
          const item = cart[idx];
          totalPrice += item.product.price * item.quantity;
        }
        ```
    *   *Implementation File:* [Cart.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/pages/Cart.jsx#L10-L24)
*   **DOM Manipulation & Event Handling**:
    *   Uses direct DOM manipulation to update the custom dark mode attribute (`data-theme`) on the document element.
    *   Attaches window event listener to catch keyboard input (`Escape` key) to close slide-out panels.
    *   *Implementation File:* [App.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/App.jsx#L55-L71)

### 2. Intermediate JS & Web APIs
*   **Arrow Functions, Map, Filter, Reduce**:
    *   *Arrow Functions:* Used for all hooks and component definitions.
    *   *`.map()`:* Used to dynamically render lists of products and details. See [Home.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/pages/Home.jsx#L141-L150).
    *   *`.filter()`:* Used to search results and suggest autocompletes. See [Navbar.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/components/Navbar.jsx#L36-L45).
    *   *`.reduce()`:* Used to keep live navbar counts. See [Navbar.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/components/Navbar.jsx#L19-L20).
*   **Promises, `async/await`, Fetch API**:
    *   Dynamically requests and parses product records from [products.json](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/public/products.json) using the native Web `fetch()` API with `async/await` declarations.
    *   Uses a `Promise` delay callback to simulate active network response latencies.
    *   *Implementation File:* [App.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/App.jsx#L34-L52)
*   **Error Handling**:
    *   Uses standard structural `try/catch/finally` blocks around the fetch request to handle offline or broken network states gracefully.
    *   *Implementation File:* [App.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/App.jsx#L34-L52)
*   **Local Storage usage**:
    *   Saves and retrieves shopping cart items and customer authentication states to keep states persistent between browser page reloads.
    *   *Implementation File:* [App.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/App.jsx#L17-L29)

---

## ⚛️ UNIT-3: React Fundamentals

### 1. React Architecture & Core Hooks
*   **Components, JSX, Props**:
    *   Split into layout files (Header, Drawer, Cards, Footer) and page templates (Home, Detail, Cart, Settings). Communicates values down using JSX Props.
*   **`useState` Hook**:
    *   Manages cart items, search parameters, theme presets, active page selectors, and authentication status.
*   **`useEffect` Hook**:
    *   Drives initial catalog loading, LocalStorage synchronization, and window events side-effects.
*   **Lifting State Up (Parent-Child Communication)**:
    *   Maintains central shopping cart and authentication variables at [App.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/App.jsx) so changes in detail cards or modals update navigation states immediately.

### 2. Forms & Data Controls
*   **Lists Rendering & Keys**:
    *   Lists catalog arrays dynamically, mapping unique properties using standard `key={product.id}` identifiers to optimize React engine rendering.
*   **Controlled Forms**:
    *   Login controls ([LoginModal.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/components/LoginModal.jsx)) and checkout address inputs ([Checkout.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/pages/Checkout.jsx)) are bound explicitly to state variables via `value` and `onChange` handlers.
*   **Loading & Error States**:
    *   Render loading animations during retrieval delays, and display user-friendly retry banners if fetch events fail.
    *   *Implementation File:* [App.jsx](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/src/App.jsx#L182-L198)

### 3. Advanced Navigation & Styles
*   **React Router DOM & Navigation Links**:
    *   Configures standard URL path configurations using `<BrowserRouter>`, `<Routes>`, and `<Route>` declarations.
    *   Grabs URL arguments via the `useParams` hook on detail views.
    *   Uses `<Link>` elements and `useNavigate` controllers to switch pages without complete browser page resets.
*   **Styling in React (Tailwind CSS)**:
    *   Integrates Tailwind CSS styling engine directly into the project compiling process, using Tailwind utilities and directives alongside custom custom-property rules.
    *   *Configuration Files:* [tailwind.config.js](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/tailwind.config.js), [postcss.config.js](file:///C:/Users/faraz/.gemini/antigravity/scratch/amazon-clone/postcss.config.js)
