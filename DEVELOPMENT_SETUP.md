# Development Setup Guide

This project now works **without Supabase** for development purposes! You can test the authentication system using mock data.

## 🚀 Quick Start (No Supabase Required)

1. **Start the development server:**
   ```bash
   npm run dev
   ```

2. **Visit the login page:**
   ```
   http://localhost:3002/login
   ```

3. **Test with mock accounts:**
   - Email: `test@example.com`
   - Email: `admin@example.com`
   - Password: Any (not required for mock auth)

4. **Test the dashboard:**
   ```
   http://localhost:3002/dashboard
   ```

5. **Debug authentication:**
   ```
   http://localhost:3002/test-auth
   ```

## 🔧 Mock Authentication Features

### Available Test Accounts
- **test@example.com** - Regular user account
- **admin@example.com** - Admin user account

### Authentication Methods
- ✅ **Magic Link** - Simulated email authentication
- ✅ **Google OAuth** - Mock Google sign-in
- ✅ **Invite Flow** - Test with `?invite=TOKEN` URLs

### Features Working
- ✅ Login/logout functionality
- ✅ Protected routes (`/dashboard`)
- ✅ Session persistence
- ✅ User data display
- ✅ Development mode indicators

## 🔗 Available Routes

| Route | Description | Authentication Required |
|-------|-------------|------------------------|
| `/login` | Login page with mock auth | No |
| `/dashboard` | Protected dashboard | Yes |
| `/test-auth` | Debug authentication | No |
| `/client/dashboard` | Client portal | No |
| `/client/documents` | Client documents | No |
| `/client/messages` | Client messages | No |

## 🎯 Testing the System

### 1. Test Magic Link
1. Go to `/login`
2. Enter `test@example.com`
3. Click "Send Magic Link"
4. You'll see a success message (no real email sent)

### 2. Test Google OAuth
1. Go to `/login`
2. Click "Continue with Google"
3. You'll be redirected to dashboard (mock auth)

### 3. Test Invite Flow
1. Go to `/login?invite=test123`
2. Enter any email
3. Click "Accept Invite"
4. You'll see invite-specific messaging

### 4. Test Protected Routes
1. Try to access `/dashboard` without logging in
2. You should be redirected to `/login`
3. After logging in, you can access `/dashboard`

## 🔄 Switching to Real Supabase

When you're ready to use real Supabase authentication:

1. **Create a Supabase project** at [supabase.com](https://supabase.com)

2. **Get your credentials:**
   - Project URL
   - Anon public key

3. **Create `.env.local` file:**
   ```bash
   NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
   ```

4. **Restart the development server:**
   ```bash
   npm run dev
   ```

5. **The system will automatically switch to real Supabase authentication**

## 🐛 Troubleshooting

### Common Issues

1. **"Your project's URL and API key are required"**
   - This is normal when using mock auth
   - The system will automatically fall back to mock authentication

2. **Login not working**
   - Make sure you're using the test emails: `test@example.com` or `admin@example.com`
   - Check the browser console for any errors

3. **Dashboard not loading**
   - Make sure you're logged in first
   - Try refreshing the page

4. **Session not persisting**
   - Check if localStorage is enabled in your browser
   - Try clearing browser data and logging in again

### Debug Tools

- **Test Auth Page**: `/test-auth` - Shows authentication status and environment info
- **Browser Console**: Check for any JavaScript errors
- **Network Tab**: Monitor API calls (should show mock responses)

## 📝 Development Notes

- Mock authentication uses localStorage for session persistence
- Sessions expire after 24 hours
- All authentication is client-side only (no server validation)
- Real Supabase integration is ready when you add environment variables

## 🎉 You're Ready!

The authentication system is now fully functional for development. You can:
- Test all authentication flows
- Develop and test your application
- Switch to real Supabase when ready
- Deploy with confidence

Happy coding! 🚀
