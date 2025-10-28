# 🔥 Firebase Setup Guide for BlackHat Store

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project"
3. Name it: `blackhat-store` (or your choice)
4. Disable Google Analytics (optional)
5. Click "Create Project"

## Step 2: Enable Authentication

1. In Firebase Console, click "Authentication" in left sidebar
2. Click "Get Started"
3. Click "Email/Password" under Sign-in providers
4. Enable "Email/Password"
5. Click "Save"

## Step 3: Create Admin User

1. Still in Authentication tab
2. Click "Users" tab
3. Click "Add User"
4. **Email**: `admin@blackhatstore.com` (or your choice)
5. **Password**: Create a strong password
6. Click "Add User"

## Step 4: Setup Firestore Database

1. Click "Firestore Database" in left sidebar
2. Click "Create Database"
3. Choose "Start in production mode"
4. Select your region (closest to you)
5. Click "Enable"

### Configure Firestore Rules

Click "Rules" tab and paste this:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow authenticated users to read/write certifications
    match /certifications/{document=**} {
      allow read: if true;  // Anyone can read
      allow write: if request.auth != null;  // Only authenticated users can write
    }
  }
}
```

Click "Publish"

## Step 5: Get Firebase Configuration

1. Click the Gear icon (Settings) → "Project settings"
2. Scroll down to "Your apps"
3. Click the Web icon `</>`
4. Register app name: `blackhat-store-web`
5. Copy the configuration values

## Step 6: Create .env.local File

In your project root, create `.env.local`:

```bash
# Firebase Configuration
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXX
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:xxxxxxxxxxxxx
```

Replace with YOUR values from Firebase config!

## Step 7: Install Firebase

```bash
npm install firebase
```

## Step 8: Restart Development Server

```bash
# Stop current server (Ctrl+C)
npm run dev
```

## Step 9: Access Firebase Admin

1. Go to: `http://localhost:3000/admin/firebase-admin`
2. Login with the email/password you created in Step 3
3. Start adding certifications!

## Features

### ✅ What You Get:

- **🔐 Real Authentication**: Firebase Email/Password auth
- **💾 Cloud Database**: Firestore for storing certifications
- **🔄 Real-time Sync**: Auto-updates across all users
- **🌐 Production Ready**: Scalable cloud infrastructure
- **📱 Multi-device**: Access from anywhere
- **🔒 Secure**: Firebase security rules

### 🎯 Usage:

1. **Login**: Use your Firebase credentials
2. **Add Certificates**: Click "Add New Certificate"
3. **Upload Images**: Use Imgur or ImgBB
4. **Save to Cloud**: Data stored in Firestore
5. **Logout**: Secure logout when done

## Troubleshooting

### "Firebase not configured"
- Check if `.env.local` file exists
- Verify all environment variables are set
- Restart dev server after adding .env.local

### "Permission Denied"
- Check Firestore rules
- Make sure you're logged in
- Verify user exists in Firebase Authentication

### "Invalid Credentials"
- Check email/password
- Reset password in Firebase Console if needed

## Security Best Practices

1. **Don't commit `.env.local`** - Already in .gitignore
2. **Use strong passwords** for admin accounts
3. **Enable 2FA** in Firebase Console (recommended)
4. **Monitor usage** in Firebase Console
5. **Set up billing alerts** to avoid surprises

## Firebase Free Tier Limits

- **Authentication**: 10k verifications/month (more than enough)
- **Firestore**: 50k reads, 20k writes, 20k deletes per day
- **Storage**: 1 GB
- **Perfect for small to medium stores!**

## Next Steps

1. ✅ Complete Firebase setup above
2. ✅ Test login at `/admin/firebase-admin`
3. ✅ Add your first certification
4. ✅ Share admin access by creating more users
5. 🚀 Deploy to production (Vercel recommended)

## Support

Need help? Check:
- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Guides](https://firebase.google.com/docs/firestore)
- Browser console for error messages

---

**Happy Administrating! 🔥**

