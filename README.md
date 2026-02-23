# GLAD AI Admin Panel

A modern, responsive admin dashboard built with Next.js 14, TypeScript, and Tailwind CSS. This admin panel provides comprehensive management capabilities for the GLAD AI platform with a sleek dark theme and industry-standard design patterns.

## 🚀 Features

### Core Modules
- **Main Dashboard** - Overview with metrics, charts, and recent activities
- **User Management** - Comprehensive user administration with filtering and search
- **Transaction Logs** - Real-time transaction monitoring with live feed
- **Revenue & Subscriptions** - Financial analytics and payment tracking
- **AI Performance** - Real-time AI model performance monitoring
- **Notifications** - Campaign management and push notification system
- **Settings** - System configuration and admin preferences

### Design Features
- 🌙 **Dark Theme** - Modern dark UI with neon accents
- 📱 **Fully Responsive** - Works seamlessly on all device sizes
- ⚡ **Performance Optimized** - Built with Next.js 14 and optimized components
- 🎨 **Consistent Design System** - Unified color scheme and component library
- 🔄 **Real-time Updates** - Live data feeds and interactive elements
- 📊 **Rich Data Visualization** - Custom charts and performance gauges

## 🛠️ Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Material Symbols
- **Fonts**: Inter, JetBrains Mono
- **Image Optimization**: Next.js Image component

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd glad-ai-admin-panel
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🏗️ Project Structure

```
├── app/                          # Next.js 14 App Router
│   ├── globals.css              # Global styles and Tailwind imports
│   ├── layout.tsx               # Root layout component
│   ├── page.tsx                 # Main dashboard page
│   ├── users/                   # User management module
│   ├── transactions/            # Transaction logs module
│   ├── revenue/                 # Revenue & subscriptions module
│   ├── ai-performance/          # AI performance monitoring
│   └── notifications/           # Notifications module
├── components/                   # Reusable components
│   ├── Sidebar.tsx              # Main navigation sidebar
│   ├── Header.tsx               # Page header component
│   ├── dashboard/               # Dashboard-specific components
│   ├── users/                   # User management components
│   ├── transactions/            # Transaction components
│   ├── revenue/                 # Revenue components
│   └── ai-performance/          # AI performance components
├── public/                      # Static assets
├── tailwind.config.js           # Tailwind CSS configuration
├── next.config.js               # Next.js configuration
└── package.json                 # Dependencies and scripts
```

## 🎨 Design System

### Color Palette
- **Primary**: `#7f0df2` (Purple)
- **Accent Cyan**: `#00f0ff`
- **Accent Green**: `#0bda73`
- **Background Dark**: `#191022`
- **Sidebar Dark**: `#141118`
- **Card Dark**: `#231b2e`
- **Text Secondary**: `#ab9cba`

### Typography
- **Display Font**: Inter (headings, UI text)
- **Monospace Font**: JetBrains Mono (code, data)

### Components
- Glass-morphism panels with backdrop blur
- Neon glow effects for interactive elements
- Smooth transitions and hover states
- Consistent spacing and border radius
- Custom scrollbars for dark theme

## 📱 Responsive Design

The admin panel is fully responsive with breakpoints:
- **Mobile**: < 768px (collapsible sidebar)
- **Tablet**: 768px - 1024px (adapted layouts)
- **Desktop**: > 1024px (full layout)

## 🔧 Customization

### Adding New Pages
1. Create a new folder in `app/` directory
2. Add `page.tsx` with your component
3. Update `components/Sidebar.tsx` to include navigation link

### Modifying Theme
Update colors in `tailwind.config.js`:
```javascript
colors: {
  primary: '#your-color',
  // ... other colors
}
```

### Adding Components
Create reusable components in the `components/` directory following the existing patterns.

## 🚀 Deployment

### Build for Production
```bash
npm run build
npm start
```

### Deploy to Vercel
```bash
npx vercel
```

### Deploy to Other Platforms
The app can be deployed to any platform that supports Next.js applications.

## 📊 Static Data

Currently, the application uses static data for demonstration purposes. The data structure is designed to be easily replaceable with real API calls:

- User data in `components/users/UserTable.tsx`
- Transaction data in `components/transactions/TransactionTable.tsx`
- Revenue data in `components/revenue/RecentPayments.tsx`
- Dashboard metrics in `components/dashboard/DashboardMetrics.tsx`

## 🔮 Future Enhancements

- Real-time WebSocket connections
- Advanced filtering and search
- Data export functionality
- User role management
- Advanced analytics
- Mobile app companion
- API integration layer
- Authentication system

## 📄 License

This project is created for demonstration purposes. Please ensure you have the necessary rights to use any referenced assets or designs.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For questions or support, please refer to the project documentation or create an issue in the repository.

---

Built with ❤️ using Next.js, TypeScript, and Tailwind CSS