# Chatwoot Integration Setup Guide

This guide will help you set up Chatwoot integration for the ChatWidget component.

## Prerequisites

1. A Chatwoot account (sign up at [chatwoot.com](https://chatwoot.com))
2. A Chatwoot workspace with an inbox configured
3. Access to your Chatwoot dashboard

## Step 1: Get Your Chatwoot Token

1. Log in to your Chatwoot dashboard
2. Navigate to **Settings** → **Applications** → **Web Widget**
3. Copy your **Website Token** (this is your `chatwootToken`)

## Step 2: Configure Your Base URL

- **Cloud users**: Use `https://app.chatwoot.com`
- **Self-hosted**: Use your custom domain (e.g., `https://your-domain.chatwoot.com`)

## Step 3: Update the Component

Replace the placeholder values in your ChatWidget usage:

```typescript
<ChatWidget
  user={currentUser}
  isOpen={isChatOpen}
  onToggle={setIsChatOpen}
  position="bottom-right"
  theme="light"
  chatwootToken="YOUR_ACTUAL_TOKEN_HERE" // Replace this
  baseUrl="https://app.chatwoot.com" // Replace if self-hosted
  showFloatingButton={true}
  onSendMessage={handleSendMessage}
  onTyping={handleTyping}
/>
```

## Step 4: Configure User Auto-Identification

The component automatically identifies users using the `user` prop:

```typescript
const currentUser: ChatUser = {
  id: 'user-123',           // Unique user identifier
  name: 'John Doe',         // User's display name
  email: 'john@example.com', // User's email
  avatar: '/path/to/avatar.jpg', // Optional avatar URL
  role: 'Client'            // Optional role
};
```

## Step 5: Customize Appearance

### Position Options
- `bottom-right` (default)
- `bottom-left`
- `top-right`
- `top-left`

### Theme Options
- `light` (default)
- `dark`
- `auto` (follows system preference)

### Custom Styling
Use the `className` prop for additional styling:

```typescript
<ChatWidget
  className="custom-chat-widget"
  // ... other props
/>
```

## Step 6: Handle Events

### Message Sending
```typescript
const handleSendMessage = (message: string) => {
  // Send message to your backend
  console.log('Sending message:', message);
};
```

### Typing Indicators
```typescript
const handleTyping = (isTyping: boolean) => {
  // Notify agent about typing status
  console.log('User is typing:', isTyping);
};
```

## Step 7: Mobile Optimization

The component is already mobile-friendly with:
- Responsive design
- Touch-friendly interface
- Optimized for small screens
- Floating button positioning

## Advanced Configuration

### Custom Messages
You can pre-populate the chat with custom messages:

```typescript
const customMessages: ChatMessage[] = [
  {
    id: '1',
    content: 'Welcome! How can I help you?',
    sender: 'agent',
    timestamp: new Date(),
    isRead: true
  }
];

<ChatWidget
  customMessages={customMessages}
  // ... other props
/>
```

### Agent Status
The component automatically shows agent status:
- 🟢 Online
- 🟡 Away
- 🔴 Offline

## Troubleshooting

### Common Issues

1. **Widget not loading**
   - Check your `chatwootToken` is correct
   - Verify your `baseUrl` is accessible
   - Check browser console for errors

2. **User not identified**
   - Ensure `user` prop is provided
   - Check user data format matches `ChatUser` interface

3. **Styling issues**
   - Use `className` prop for custom styling
   - Check for CSS conflicts
   - Verify Tailwind classes are available

### Debug Mode

Enable debug mode by checking the browser console for Chatwoot SDK logs.

## Security Considerations

1. **Token Security**: Never expose your Chatwoot token in client-side code in production
2. **User Data**: Sanitize user data before passing to the component
3. **HTTPS**: Always use HTTPS in production

## Support

- [Chatwoot Documentation](https://www.chatwoot.com/docs)
- [Chatwoot Community](https://github.com/chatwoot/chatwoot/discussions)
- [Component Issues](https://github.com/your-repo/issues)

## Example Implementation

See `src/components/examples/chat-widget-examples.tsx` for complete usage examples.
