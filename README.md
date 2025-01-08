# Trustify - Service Review System

[Live Website URL](https://services-review-system.web.app)

![Trustify Screenshot](https://i.ibb.co.com/SsPQfcn/trustify.png) <!-- Add a screenshot of your project here -->

## Overview

**Trustify** is a platform that allows users to interact with services by leaving reviews, managing their own services, and exploring others' feedback. This client-side application provides users with an easy-to-use interface to post, manage, and explore reviews of various services. The system supports user authentication, CRUD operations for services and reviews, and integrates various modern web technologies.

## Features

- **User Authentication**: Secure login and registration via Firebase for personalized experiences.
- **Manage Services**: Add, update, and delete services listed by the user.
- **Post Reviews**: Users can rate and review services they've interacted with, and update or delete reviews.
- **Explore Services**: View detailed service information along with reviews from other users.
- **My Reviews Dashboard**: A personal page where users can view and manage all their reviews.

## Tech Stack

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Vite**: Build tool and development server for fast React development.
- **TailwindCSS**: Utility-first CSS framework for creating custom designs.
- **DaisyUI**: Component library for TailwindCSS for quick UI development.
- **Framer Motion**: Library for animations in React.
- **Lottie React**: React integration for Lottie animations.
- **Swiper**: Touch slider library for creating carousels and slides.
- **React Router DOM**: For routing and navigation in the app.
- **Axios**: HTTP client for making API requests.

### Backend

- **Express**: Fast and minimalist web framework for Node.js.
- **MongoDB**: NoSQL database for storing services and reviews data.
- **cookie-parser**: Middleware to parse cookies in requests.
- **cors**: Middleware to enable Cross-Origin Resource Sharing (CORS) for your server.
- **dotenv**: Loads environment variables from a `.env` file for secure configurations.
- **jsonwebtoken**: Used for signing, verifying, and decoding JSON Web Tokens (JWT) for authentication.

## 📦 Dependencies

The project uses the following main dependencies:

### Frontend:

    "aos": "^2.3.4",
    "axios": "^1.7.9",
    "firebase": "^11.1.0",
    "framer-motion": "^11.15.0",
    "localforage": "^1.10.0",
    "lottie-react": "^2.4.0",
    "match-sorter": "^8.0.0",
    "react": "^18.3.1",
    "react-countup": "^6.5.3",
    "react-dom": "^18.3.1",
    "react-hot-toast": "^2.4.1",
    "react-icons": "^5.4.0",
    "react-modal": "^3.16.3",
    "react-rating": "^2.0.5",
    "react-router-dom": "^7.1.0",
    "sort-by": "^1.2.0",
    "swiper": "^11.1.15"

### Backend:

    "cookie-parser": "^1.4.7",
    "cors": "^2.8.5",
    "dotenv": "^16.4.7",
    "express": "^4.21.2",
    "jsonwebtoken": "^9.0.2",
    "mongodb": "^6.12.0"

Refer to the `package.json` files in both the `frontend` and `backend` directories for a complete list of dependencies.

---

## 🚀 Getting Started

Follow these steps to run the project on your local machine:

### Prerequisites:

- **Node.js** (v16 or above)
- **npm** (v8 or above)

### Installation:

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SifatSararChistee/service-review-system-a11.git
   cd trustify
   ```
