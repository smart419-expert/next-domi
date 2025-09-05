# Customer Communication Platform

A comprehensive frontend for a customer-communication platform built with Next.js, TypeScript, Tailwind CSS, and TanStack Query.

## Features

- **Admin Dashboard**: Client management, quick actions, and overview
- **Client Portal**: Private per-client access with balance, file gallery, live chat, and transaction history
- **Authentication**: Magic-link email, Google OAuth, and WhatsApp invite flows
- **Live Chat**: Integration with Tawk.to/Intercom and custom mock chat
- **Payments**: PayPal Smart Buttons with QR/deep-link support for ATH Móvil, Zelle, CashApp, Chime
- **Wallet System**: Per-client balance management with transaction logs
- **File Management**: Image/graph upload with preview, replace, and timestamps
- **Notifications**: Browser notifications for new messages and uploads
- **Responsive Design**: Mobile-first, accessible, and keyboard-navigable

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: TanStack Query
- **Authentication**: NextAuth.js
- **Forms**: React Hook Form + Zod
- **Icons**: Lucide React
- **Notifications**: React Hot Toast
- **Payments**: PayPal React SDK

## 🎨 Design System

This project includes a comprehensive design system with:

- **Dark Theme**: Modern dark interface with green primary accents
- **Custom CSS Variables**: Consistent colors, spacing, and typography
- **Responsive Layout**: Collapsible sidebar and mobile-first design
- **Component Library**: Reusable UI components with TypeScript
- **Accessibility**: ARIA labels, keyboard navigation, and semantic HTML

### Key Features:
- **Layout System**: Header, Sidebar, Container, and PageTitle components
- **Card Styles**: Modern, step, feature, and testimonial card variants
- **Color Palette**: Green primary colors with dark neutral shades
- **Typography**: Inter font family with consistent sizing scale
- **Spacing**: 8px base unit with consistent spacing scale

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables (create `.env.local`):
   ```env
   # NextAuth Configuration
   NEXTAUTH_URL=http://localhost:3000
   NEXTAUTH_SECRET=your-secret-key-here

   # Google OAuth (optional)
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret

   # PayPal Configuration
   NEXT_PUBLIC_PAYPAL_CLIENT_ID=your-paypal-client-id

   # Chat Integration
   NEXT_PUBLIC_TAWK_TO_PROPERTY_ID=your-tawk-to-property-id
   NEXT_PUBLIC_INTERCOM_APP_ID=your-intercom-app-id

   # WhatsApp Integration
   NEXT_PUBLIC_WHATSAPP_BUSINESS_NUMBER=your-whatsapp-business-number

   # API Configuration
   NEXT_PUBLIC_API_BASE_URL=http://localhost:3000/api
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Mock API Contract

The application includes mock API routes that return realistic JSON responses for development. All endpoints are prefixed with `/api/`.

### Authentication Endpoints

#### POST `/api/auth/magic-link`
Send magic link to email
```json
{
  "email": "user@example.com"
}
```
Response:
```json
{
  "success": true,
  "message": "Magic link sent to your email"
}
```

#### POST `/api/auth/verify-magic-link`
Verify magic link token
```json
{
  "token": "magic-link-token"
}
```
Response:
```json
{
  "success": true,
  "user": {
    "id": "user-id",
    "email": "user@example.com",
    "name": "User Name",
    "role": "client" | "admin"
  }
}
```

#### POST `/api/auth/whatsapp-invite`
Generate WhatsApp invite link
```json
{
  "phoneNumber": "+1234567890"
}
```
Response:
```json
{
  "success": true,
  "inviteUrl": "https://wa.me/1234567890?text=Invitation%20to%20join%20platform"
}
```

### Client Management

#### GET `/api/clients`
Get all clients (admin only)
Response:
```json
{
  "clients": [
    {
      "id": "client-id",
      "name": "Client Name",
      "email": "client@example.com",
      "phone": "+1234567890",
      "balance": 150.00,
      "status": "active",
      "lastLogin": "2024-01-15T10:30:00Z",
      "createdAt": "2024-01-01T00:00:00Z"
    }
  ]
}
```

#### GET `/api/clients/[id]`
Get specific client details
Response:
```json
{
  "id": "client-id",
  "name": "Client Name",
  "email": "client@example.com",
  "phone": "+1234567890",
  "balance": 150.00,
  "status": "active",
  "lastLogin": "2024-01-15T10:30:00Z",
  "createdAt": "2024-01-01T00:00:00Z"
}
```

#### PUT `/api/clients/[id]/balance`
Update client balance (admin only)
```json
{
  "balance": 200.00,
  "reason": "Payment received"
}
```
Response:
```json
{
  "success": true,
  "newBalance": 200.00,
  "transaction": {
    "id": "transaction-id",
    "amount": 50.00,
    "type": "credit",
    "reason": "Payment received",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

### File Management

#### GET `/api/clients/[id]/files`
Get client files
Response:
```json
{
  "files": [
    {
      "id": "file-id",
      "name": "document.pdf",
      "url": "/uploads/file-id.pdf",
      "type": "application/pdf",
      "size": 1024000,
      "uploadedAt": "2024-01-15T10:30:00Z",
      "updatedAt": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### POST `/api/clients/[id]/files`
Upload new file
```json
{
  "file": "base64-encoded-file",
  "name": "document.pdf"
}
```
Response:
```json
{
  "success": true,
  "file": {
    "id": "file-id",
    "name": "document.pdf",
    "url": "/uploads/file-id.pdf",
    "type": "application/pdf",
    "size": 1024000,
    "uploadedAt": "2024-01-15T10:30:00Z"
  }
}
```

#### DELETE `/api/clients/[id]/files/[fileId]`
Delete file
Response:
```json
{
  "success": true,
  "message": "File deleted successfully"
}
```

### Chat System

#### GET `/api/clients/[id]/messages`
Get chat messages
Response:
```json
{
  "messages": [
    {
      "id": "message-id",
      "content": "Hello, how can I help you?",
      "sender": "admin" | "client",
      "timestamp": "2024-01-15T10:30:00Z",
      "read": true
    }
  ]
}
```

#### POST `/api/clients/[id]/messages`
Send new message
```json
{
  "content": "Hello, I need help with my account"
}
```
Response:
```json
{
  "success": true,
  "message": {
    "id": "message-id",
    "content": "Hello, I need help with my account",
    "sender": "client",
    "timestamp": "2024-01-15T10:30:00Z",
    "read": false
  }
}
```

### Transaction History

#### GET `/api/clients/[id]/transactions`
Get client transaction history
Response:
```json
{
  "transactions": [
    {
      "id": "transaction-id",
      "amount": 50.00,
      "type": "credit" | "debit",
      "reason": "Payment received",
      "timestamp": "2024-01-15T10:30:00Z",
      "status": "completed"
    }
  ]
}
```

### Payment Processing

#### POST `/api/payments/paypal/create-order`
Create PayPal order
```json
{
  "amount": 100.00,
  "clientId": "client-id",
  "description": "Service payment"
}
```
Response:
```json
{
  "success": true,
  "orderId": "paypal-order-id"
}
```

#### POST `/api/payments/paypal/capture-order`
Capture PayPal order
```json
{
  "orderId": "paypal-order-id"
}
```
Response:
```json
{
  "success": true,
  "transaction": {
    "id": "transaction-id",
    "amount": 100.00,
    "method": "paypal",
    "status": "completed",
    "timestamp": "2024-01-15T10:30:00Z"
  }
}
```

#### GET `/api/payments/qr/[method]`
Generate QR code for payment method
Response:
```json
{
  "success": true,
  "qrCode": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "paymentInfo": {
    "account": "account-info",
    "amount": 100.00,
    "reference": "payment-reference"
  }
}
```

### Notifications

#### GET `/api/notifications`
Get user notifications
Response:
```json
{
  "notifications": [
    {
      "id": "notification-id",
      "type": "message" | "file_upload" | "payment",
      "title": "New Message",
      "message": "You have a new message from admin",
      "read": false,
      "timestamp": "2024-01-15T10:30:00Z"
    }
  ]
}
```

#### PUT `/api/notifications/[id]/read`
Mark notification as read
Response:
```json
{
  "success": true,
  "message": "Notification marked as read"
}
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── admin/             # Admin dashboard
│   ├── client/            # Client portal
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── auth/             # Authentication components
│   ├── admin/            # Admin-specific components
│   ├── client/           # Client-specific components
│   └── chat/             # Chat components
├── lib/                  # Utilities and configurations
│   ├── auth.ts           # NextAuth configuration
│   ├── query.ts          # TanStack Query setup
│   └── utils.ts          # Utility functions
├── types/                # TypeScript type definitions
└── hooks/                # Custom React hooks
```

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start
```

### Key Features Implementation

1. **Authentication**: Magic-link and OAuth flows with NextAuth.js
2. **State Management**: TanStack Query for server state, React hooks for local state
3. **Responsive Design**: Mobile-first approach with Tailwind CSS
4. **Accessibility**: ARIA labels, keyboard navigation, screen reader support
5. **File Upload**: Drag-and-drop with preview and progress indicators
6. **Real-time Chat**: WebSocket simulation with mock endpoints
7. **Payment Integration**: PayPal Smart Buttons with QR code generation
8. **Notifications**: Browser notifications with permission handling

## Deployment

The application can be deployed to any platform that supports Next.js:

- **Vercel** (recommended)
- **Netlify**
- **AWS Amplify**
- **Railway**
- **DigitalOcean App Platform**

Make sure to set all required environment variables in your deployment platform.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.