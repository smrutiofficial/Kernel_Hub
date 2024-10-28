# Kernel Hub

Kernel Hub is a full-stack blog application designed for sharing news, updates, and articles about Linux, open-source software, community events, and other topics related to the Linux ecosystem. Built with the MERN (MongoDB, Express, React, Node) stack, it leverages Docker for easy deployment and environment consistency.

## Table of Contents
1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Dependencies](#dependencies)
4. [Setup and Installation](#setup-and-installation)
5. [Running the Application](#running-the-application)
6. [Project Structure](#project-structure)
7. [Environment Variables](#environment-variables)
8. [License](#license)

## Features

- **User Authentication**: Secure login and registration using bcryptjs and JSON Web Tokens (JWT).
- **Responsive UI**: Tailwind CSS with typography plugin for well-styled blog posts.
- **Dockerized**: Uses Docker Compose to streamline setup and deployment.
- **Markdown Support**: Write posts in markdown, rendered using react-markdown with syntax highlighting.
- **Image Handling**: Supports image upload and processing via Multer and Cloudinary.
- **Dynamic Content**: Update and manage Linux-related articles and news with an easy-to-use interface.

## Tech Stack

- **Frontend**: Next.js, Tailwind CSS, React
- **Backend**: Node.js, Express.js, MongoDB
- **Database**: MongoDB
- **Authentication**: JSON Web Tokens (JWT)
- **Containerization**: Docker & Docker Compose

## Dependencies

### Server

- `bcryptjs` - Password hashing
- `cloudinary` - Image storage and management
- `cors` - Cross-Origin Resource Sharing
- `dotenv` - Environment variable management
- `ejs` - Template engine for server-side rendering (if needed)
- `express` - Backend framework
- `jsonwebtoken` - Authentication token handling
- `mongoose` - MongoDB object modeling
- `multer` - File upload handling
- `nodemon` - Auto-restarts server on changes

### Client

- `@tailwindcss/typography` - Enhanced typography for Tailwind CSS
- `autoprefixer` - PostCSS plugin for vendor prefixing
- `axios` - HTTP client
- `clsx` - Utility for conditional class names
- `css-loader` - CSS handling
- `framer-motion` - Animations and transitions
- `moment` - Date formatting
- `next` - React framework
- `react`, `react-dom` - Core React libraries
- `react-icons` - Icon library
- `react-markdown` - Markdown renderer
- `react-syntax-highlighter` - Code block syntax highlighting
- `rehype-highlight` - Syntax highlighting
- `remark-gfm` - GitHub-flavored markdown
- `sharp` - Image processing
- `tailwind-merge` - Utility for merging Tailwind CSS classes

## Setup and Installation

### Prerequisites

- [Docker](https://www.docker.com/get-started) and Docker Compose
- Node.js (for local development without Docker)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/smrutiofficial/Kernel_Hub.git
   cd Kernel_Hub
