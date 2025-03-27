# Daily Tour Ticket App

A complete reservation and ticketing system for daily boat tours.

## Overview

Daily Tour Ticket App is a comprehensive platform designed for tour agencies and guests to easily create, manage, and track boat tour reservations and tickets. This application provides a seamless booking experience, real-time updates, and automated notifications.

## Features

- **Guest Registration**: Collect and securely store guest information for reservations
- **Tour Management**: Create and manage various boat tours with details 
- **Reservation System**: Simple reservation creation with automatic confirmation
- **Ticket Generation**: Automatically generate customized PDF tickets
- **WhatsApp Integration**: Send tickets and notifications directly via WhatsApp
- **Agency Dashboard**: Complete management system for agencies
- **Admin Panel**: System-wide management for administrators
- **Multi-language Support**: Available in English, Turkish, German, and Russian
- **Real-time Updates**: Instant updates on reservations and tickets
- **Secure Payment Integration**: Process payments securely via Stripe/iyzico

## Tech Stack

### Backend
- Node.js with Express
- TypeScript
- Supabase (PostgreSQL)
- JWT Authentication
- Twilio/WhatsApp API
- PDF Generation with PDFKit

### Frontend
- React with TypeScript
- Talwincss UI
- React Query
- Recoil for State Management
- i18next for Internationalization
- React Hook Form for Form Handling

## Getting Started

### Prerequisites
- Node.js (v16+)
- npm or yarn
- Supabase account
- Twilio account (for WhatsApp)
- Stripe/iyzico account (for payments)

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/daily-tour-ticket-app.git
   cd daily-tour-ticket-app
   ```

2. Install dependencies:
   ```
   # Install backend dependencies
   cd backend
   npm install

   # Install frontend dependencies
   cd ../frontend
   npm install
   ```

3. Set up environment variables:
   - Copy `.env.example` to `.env` in both frontend and backend directories
   - Update with your API keys and configuration settings

4. Run the development servers:
   ```
   # Start backend server
   cd backend
   npm run dev

   # Start frontend server (in a new terminal)
   cd frontend
   npm start
   ```

5. Open your browser and navigate to `http://localhost:3000`

## Deployment

- Backend can be deployed to services like Heroku, AWS, or Digital Ocean
- Frontend can be deployed to Netlify, Vercel, or GitHub Pages
- Database is managed through Supabase

## Security

- All sensitive data is encrypted (AES-256)
- Password hashing using bcrypt
- IP and MAC address logging for security purposes
- Row-level security in Supabase

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [Supabase](https://supabase.io/)
- [Chakra UI](https://chakra-ui.com/)
- [Twilio](https://www.twilio.com/)
- [Stripe](https://stripe.com/)

