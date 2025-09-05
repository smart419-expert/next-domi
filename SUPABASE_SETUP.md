# Supabase Authentication Setup

This project uses Supabase for authentication with Google OAuth and Magic Link support.

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [supabase.com](https://supabase.com)
2. Sign up or log in to your account
3. Click "New Project"
4. Choose your organization and enter project details
5. Wait for the project to be created

### 2. Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (looks like: `https://your-project-id.supabase.co`)
   - **Anon public key** (starts with `eyJ...`)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
```

### 4. Configure Authentication Providers

#### Google OAuth Setup

1. In your Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Google** provider
3. You'll need to set up Google OAuth credentials:
   - Go to [Google Cloud Console](https://console.cloud.google.com)
   - Create a new project or select existing one
   - Enable Google+ API
   - Go to **Credentials** → **Create Credentials** → **OAuth 2.0 Client IDs**
   - Set authorized redirect URIs to: `https://your-project-id.supabase.co/auth/v1/callback`
   - Copy the Client ID and Client Secret
4. Back in Supabase, enter your Google OAuth credentials

#### Magic Link Setup

1. In your Supabase dashboard, go to **Authentication** → **Settings**
2. Configure your site URL: `http://localhost:3000` (for development)
3. Add redirect URLs:
   - `http://localhost:3000/dashboard`
   - `http://localhost:3000/auth/callback`

### 5. Database Setup (Optional)

If you want to store additional user data:

1. Go to **Table Editor** in your Supabase dashboard
2. Create a `profiles` table:

```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

## Features

### Authentication Methods

1. **Magic Link**: Users receive an email with a secure link to sign in
2. **Google OAuth**: One-click sign-in with Google account
3. **Invite Flow**: Special handling for `?invite=TOKEN` URLs

### Protected Routes

- `/dashboard` - Requires authentication
- `/login` - Redirects to dashboard if already authenticated

### User Experience

- Clean, modern login interface
- Loading states and error handling
- Success feedback for magic link emails
- Automatic redirects based on authentication state

## Testing

1. Start your development server: `npm run dev`
2. Visit `http://localhost:3000/login`
3. Test magic link by entering your email
4. Test Google OAuth (requires proper setup)
5. Test invite flow: `http://localhost:3000/login?invite=test123`

## Troubleshooting

### Common Issues

1. **"Invalid API key"**: Check your environment variables
2. **Google OAuth not working**: Verify redirect URIs and credentials
3. **Magic link not working**: Check email settings and redirect URLs
4. **Middleware issues**: Ensure middleware.ts is in the correct location

### Debug Mode

Add this to your `.env.local` for debugging:

```bash
NEXT_PUBLIC_SUPABASE_DEBUG=true
```

## Security Notes

- Never commit your `.env.local` file
- Use environment variables for all sensitive data
- Regularly rotate your API keys
- Enable Row Level Security (RLS) on your database tables
- Use HTTPS in production
