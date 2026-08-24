# Firebase E-Commerce App

A full-stack-style e-commerce application built with React, TypeScript, Firebase, Firestore, React Query, and React Router.

This project replaces the FakeStore API with Firebase Firestore and adds user authentication, product management, shopping cart functionality, and order history.

## Features

### User Authentication
- Register with email and password
- Login with Firebase Authentication
- Logout
- Protected routes for authenticated users

### User Management
- Create a Firestore user profile during registration
- View profile information
- Update name and address
- Delete user account

### Product Management
- Fetch products from Firestore
- Create new products
- Edit existing products
- Delete products
- Add products to the shopping cart

### Shopping Cart
- Add products to cart
- Increase quantity when adding the same product
- Remove products from cart
- Calculate order total
- Place an order

### Order Management
- Save completed orders to Firestore
- Associate orders with the authenticated user
- Store product information, quantity, price, and total
- View previous orders
- View individual order details

## Technologies Used

- React
- TypeScript
- Vite
- Firebase Authentication
- Cloud Firestore
- TanStack React Query
- React Router
- CSS

## Project Structure

```text
src/
├── firebase/
│   └── firebase.ts
├── types/
│   ├── Product.ts
│   ├── UserProfile.ts
│   ├── Cart.ts
│   └── Order.ts
├── services/
│   ├── authService.ts
│   ├── userService.ts
│   ├── productService.ts
│   └── orderService.ts
├── hooks/
│   ├── useProducts.ts
│   ├── useUserProfile.ts
│   └── useOrders.ts
├── context/
│   ├── AuthContext.tsx
│   └── CartContext.tsx
├── components/
│   ├── Navbar.tsx
│   ├── ProductCard.tsx
│   └── ProtectedRoute.tsx
├── pages/
│   ├── Home.tsx
│   ├── Register.tsx
│   ├── Login.tsx
│   ├── Profile.tsx
│   ├── Products.tsx
│   ├── AddProduct.tsx
│   ├── EditProduct.tsx
│   ├── Cart.tsx
│   ├── Orders.tsx
│   └── OrderDetails.tsx
├── App.tsx
└── main.tsx
```

## Installation

### 1. Clone the repository

```bash
git clone (https://github.com/darwin2342/firebase-ecommerce.git)
cd firebase-ecommerce
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a Firebase project

Create a project in the Firebase Console and enable:

- Firebase Authentication
- Email/Password authentication
- Cloud Firestore

### 4. Create a `.env` file

Create a `.env` file in the root of the project.

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Do not commit your `.env` file to GitHub.

### 5. Start the development server

```bash
npm run dev
```

Open the local URL provided by Vite in your browser.

## Firestore Collections

### users

```text
users/{uid}
```

Example:

```js
{
  uid: "user-id",
  email: "user@email.com",
  name: "John Doe",
  address: "123 Main Street"
}
```

### products

```text
products/{productId}
```

Example:

```js
{
  title: "Gaming Mouse",
  price: 49.99,
  description: "Wireless gaming mouse",
  category: "Electronics",
  image: "https://example.com/image.jpg"
}
```

### orders

```text
orders/{orderId}
```

Example:

```js
{
  userId: "user-id",
  items: [
    {
      productId: "product-id",
      title: "Gaming Mouse",
      price: 49.99,
      quantity: 2
    }
  ],
  total: 99.98,
  createdAt: "Firestore timestamp"
}
```

## React Query

React Query is used to manage Firebase server data in the React application.

Examples include:

```text
["products"]
["product", productId]
["user", userId]
["orders", userId]
["order", orderId]
```

Mutations invalidate the appropriate query after data changes so the UI stays synchronized with Firestore.

## What I Learned

This project helped reinforce:

- Firebase Authentication
- Firestore CRUD operations
- Separating UI and database logic
- React Query queries and mutations
- Query invalidation
- React Context
- Protected routes
- TypeScript interfaces
- Shopping cart state management
- Modeling users, products, carts, and orders
- Associating Firestore data with authenticated users

## Future Improvements

Possible future improvements include:

- Admin-only product management
- Product search and category filtering
- Product detail pages
- Quantity controls in the cart
- Firebase Storage for product images
- Improved form validation
- Loading and success notifications
- Responsive mobile navigation
- Payment integration

## Author

Darwin Rubio
