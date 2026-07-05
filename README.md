# ShopSphere 🛸

A premium, production-ready full-stack e-commerce platform built with the MERN stack
(MongoDB, Express, React 19, Node.js) featuring a futuristic glassmorphism UI.

![Node](https://img.shields.io/badge/Node.js-18%2B-brightgreen)
![React](https://img.shields.io/badge/React-19-blue)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## ✨ Features

- **Storefront**: Home, product listing with search/filter/sort/pagination, product details with
  reviews & ratings, related products, shopping cart, multi-step checkout, order history, 404 page.
- **Auth**: JWT-based registration/login, bcrypt password hashing, protected routes, persistent sessions.
- **Cart**: Add/remove/update quantity, auto-calculated totals, empty state, persists in `localStorage`.
- **Orders**: Server-side stock & price validation, shipping/tax calculation, order status tracking.
- **Design**: Dark, glassmorphic, futuristic UI with a cyan/blue gradient accent system, smooth
  animations, loading skeletons, toast notifications, fully responsive (mobile/tablet/desktop).
- **Backend**: RESTful API with clean MVC architecture, centralized error handling, JWT middleware,
  admin-only product/order management endpoints, MongoDB text search indexing.

---

## 🧱 Tech Stack

| Layer      | Technology                                             |
|------------|---------------------------------------------------------|
| Frontend   | React 19, Vite, Tailwind CSS, React Router DOM, Axios    |
| Backend    | Node.js, Express.js                                      |
| Database   | MongoDB Atlas, Mongoose                                  |
| Auth       | JWT, bcryptjs                                             |
| UX         | react-hot-toast, react-icons                              |

---

## 📁 Project Structure

```
shopsphere/
├── client/                      # React frontend
│   ├── src/
│   │   ├── components/          # Navbar, Footer, Hero, ProductCard, Modal, etc.
│   │   ├── pages/                # Home, Products, Cart, Checkout, MyOrders, etc.
│   │   ├── context/              # AuthContext, CartContext
│   │   ├── hooks/                 # useAuth, useCart, useDebounce
│   │   ├── services/              # api.js + REST service modules
│   │   ├── utils/                 # formatters
│   │   ├── App.jsx / main.jsx / index.css
│   ├── index.html
│   ├── tailwind.config.js
│   └── vite.config.js
│
├── server/                      # Express backend
│   ├── config/db.js              # MongoDB connection
│   ├── models/                    # User, Product, Cart, Order
│   ├── controllers/               # Business logic
│   ├── routes/                    # REST endpoints
│   ├── middleware/                # authMiddleware, errorMiddleware
│   ├── seed/                      # Demo data + seed script
│   ├── utils/generateToken.js
│   └── server.js
│
└── package.json                  # Root scripts (concurrently runs client + server)
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js 18+
- A [MongoDB Atlas](https://www.mongodb.com/atlas) cluster (or local MongoDB instance)

### 2. Clone & Install

```bash
cd shopsphere
npm run install-all
```

This installs dependencies for both `client/` and `server/`.

### 3. Configure Environment Variables

Copy the example env file and fill in your values:

```bash
cp server/.env.example server/.env
```

```env
NODE_ENV=development
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/shopsphere
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=30d
CLIENT_URL=http://localhost:5173
```

### 4. Seed the Database (optional but recommended)

Populates demo products and an admin account.

```bash
cd server
npm run seed
```

Admin login after seeding: `admin@shopsphere.com` / `admin12345`

To wipe all data: `npm run seed:destroy`

### 5. Run the App

From the project root, run client and server together:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend API: http://localhost:5000/api

Or run them individually:

```bash
npm run server   # starts Express API with nodemon
npm run client   # starts Vite dev server
```

---

## 🔌 API Reference

### Auth — `/api/auth`
| Method | Endpoint     | Access  | Description          |
|--------|--------------|---------|-----------------------|
| POST   | `/register`  | Public  | Register new user     |
| POST   | `/login`     | Public  | Log in, returns JWT    |
| GET    | `/profile`   | Private | Get current user       |
| PUT    | `/profile`   | Private | Update current user     |

### Products — `/api/products`
| Method | Endpoint            | Access       | Description                        |
|--------|----------------------|--------------|--------------------------------------|
| GET    | `/`                   | Public       | List products (search/filter/sort/paginate) |
| GET    | `/featured`           | Public       | Featured products                    |
| GET    | `/categories`         | Public       | Distinct category list                |
| GET    | `/:id`                | Public       | Single product (by id or slug)         |
| GET    | `/:id/related`        | Public       | Related products by category            |
| POST   | `/:id/reviews`        | Private      | Add a review                             |
| POST   | `/`                    | Admin        | Create product                            |
| PUT    | `/:id`                 | Admin        | Update product                             |
| DELETE | `/:id`                 | Admin        | Delete product                              |

### Cart — `/api/cart` (all routes private)
| Method | Endpoint         | Description               |
|--------|-------------------|-----------------------------|
| GET    | `/`                | Get user's cart              |
| POST   | `/`                | Add item to cart               |
| PUT    | `/:productId`       | Update item quantity            |
| DELETE | `/:productId`       | Remove item                      |
| DELETE | `/`                | Clear cart                        |

### Orders — `/api/orders`
| Method | Endpoint          | Access  | Description                    |
|--------|--------------------|---------|----------------------------------|
| POST   | `/`                 | Private | Create order from cart items       |
| GET    | `/myorders`         | Private | Current user's order history        |
| GET    | `/:id`               | Private | Order detail (owner or admin)        |
| PUT    | `/:id/pay`           | Private | Mark order as paid                     |
| GET    | `/`                  | Admin   | All orders                              |
| PUT    | `/:id/status`        | Admin   | Update order status                      |

---

## 🎨 Design System

| Token         | Value      |
|---------------|------------|
| Background    | `#050508`  |
| Card Surface  | `#111827`  |
| Primary       | `#00F5FF`  |
| Hover         | `#008CFF`  |
| Text          | `#F8FAFC`  |
| Secondary Text| `#94A3B8`  |

Built with glassmorphism cards, soft glow shadows, rounded corners, gradient CTAs, and
smooth hover/scroll animations throughout.

---

## 📦 Production Build

```bash
cd client
npm run build     # outputs static build to client/dist
```

Deploy `server/` to any Node host (Render, Railway, Fly.io, EC2) and `client/dist` to any
static host (Vercel, Netlify, S3+CloudFront). Set `CLIENT_URL` on the server and update the
client's API base URL / proxy accordingly for production.

---

## 📄 License

MIT — built for portfolio and educational use.
