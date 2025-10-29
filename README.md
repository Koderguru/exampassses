# BlackHat Store - Cybersecurity Certification E-commerce

A modern, high-performance Next.js e-commerce platform for cybersecurity certification study materials.

## Features

- ⚡ **Next.js 14** with App Router
- 🎨 **Tailwind CSS** for styling
- 🎭 **Framer Motion** for smooth animations
- 📱 **Fully Responsive** design
- 🛍️ **Shopping Cart** functionality
- 💳 **Multiple Currency** support
- 🔒 **Secure** and fast
- 🎯 **TypeScript** for type safety

## Tech Stack

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: React Icons
- **Language**: TypeScript

## Getting Started

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
blackhat-store/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── CertificationCard.tsx  # Product card
│   └── Footer.tsx          # Footer
├── data/
│   └── certifications.ts   # Product data
└── public/                 # Static assets
```

## Customization

### Adding New Certifications

Edit `data/certifications.ts` to add new products:

```typescript
{
  id: 'new-cert',
  name: 'New Certification',
  code: 'NEWCERT',
  gradient: 'bg-gradient-to-br from-blue-500 to-blue-700',
  category: 'Category Name',
  price: 199.99,
  description: 'Description here'
}
```

### Changing Colors

Modify `tailwind.config.js` to customize the color scheme.

## Contact Links

- Telegram: [@FsKnockouT](https://t.me/FsKnockouT)
- Discord: FsKnockouT

## License

© 2025 BlackHat Store. All rights reserved.

