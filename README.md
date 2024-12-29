# Trustify - Service Review System

[Live Website URL](https://services-review-system.web.app)

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
