# 🔐 Admin Panel Guide

## Access Admin Panel

1. **URL**: `http://localhost:3000/admin`
2. **Password**: `blackhat2025`

## Features

### ✨ Add New Certification
- Click "Add New Certificate" button
- Fill in all details:
  - **Name**: Full certification name (e.g., "OSCP Plus")
  - **Code**: Short code (e.g., "OSCP+")
  - **Category**: Provider name (e.g., "Offensive Security")
  - **Price**: USD amount
  - **Gradient**: Choose color scheme
  - **Image URL**: Direct link to badge/logo
  - **Description**: Brief description

### 📝 Edit Certification
- Click the edit (pencil) icon on any certification
- Modify any field
- Click "Save" to update

### 🗑️ Delete Certification
- Click the trash icon
- Confirm deletion

## 🖼️ How to Add Images

### Method 1: Imgur (Recommended)
1. Go to https://imgur.com
2. Click "New post"
3. Upload your image
4. Right-click on image → "Copy image address"
5. Paste in "Image URL" field

### Method 2: ImgBB
1. Go to https://imgbb.com
2. Upload image
3. Copy the direct link
4. Paste in "Image URL" field

### Image Requirements
- **Format**: PNG, JPG, or SVG
- **Size**: Recommended 340x340px or similar square
- **URL**: Must be direct image link (ending in .png, .jpg, etc.)

## 💾 Data Storage

- All changes save to **localStorage** (browser storage)
- Data persists across browser sessions
- **Important**: Backup regularly as data is stored locally

## 🔄 Backup & Restore

### Export Data (Manual)
1. Open browser console (F12)
2. Run: `localStorage.getItem('certifications')`
3. Copy the output and save to a file

### Import Data (Manual)
1. Open browser console (F12)
2. Run: `localStorage.setItem('certifications', 'YOUR_BACKUP_DATA')`
3. Refresh the page

## 🎨 Gradient Options

Available gradient colors:
- Red
- Purple
- Blue
- Green
- Yellow
- Pink
- Indigo
- Cyan
- Orange

## 📱 Mobile Support

Admin panel is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones

## 🔒 Security Notes

- Change the default password in `/app/admin/page.tsx`
- For production, use proper authentication (Firebase, Auth0, etc.)
- Consider using a database (MongoDB, PostgreSQL) instead of localStorage

## 🚀 Tips

1. **Test Image URLs**: Paste URL in browser to verify it loads
2. **Consistent Naming**: Use consistent category names
3. **Regular Backups**: Export data weekly
4. **Image Quality**: Use high-quality badge images
5. **Fallback**: If image fails to load, gradient badge shows code

## 🆘 Troubleshooting

### Image Not Loading?
- Check if URL is direct image link
- Verify domain is added in `next.config.js`
- Try uploading to Imgur instead

### Changes Not Appearing?
- Refresh the main page
- Clear browser cache
- Check browser console for errors

### Lost Data?
- Check localStorage in browser console
- Look for backup files
- Re-enter data manually

## 📞 Support

For issues, check:
- Browser console (F12)
- Terminal logs
- Image URL validity

---

**Happy Managing! 🎉**

