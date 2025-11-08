# Quick Start Guide - Weather Radar Display

## 🚀 Getting Started in 5 Minutes

### 1. Prerequisites Check
Make sure you have:
- Node.js v18+ installed
- npm or yarn package manager

### 2. Install Dependencies
```bash
npm install
```

### 3. Start Development Server
```bash
npm run dev
```

Visit: http://localhost:5173

## 🎯 What You'll See

The application will launch with:
- **Mock Data Mode**: Since backend isn't connected yet, you'll see placeholder data
- **Interactive Map**: Pan and zoom around the Continental US
- **Live Controls**: Adjust radar opacity and toggle auto-refresh
- **Status Indicator**: Yellow dot showing "Mock Data Mode"

## 🔧 Connecting to Backend

When your backend is ready:

1. Set the API URL in `.env`:
   ```
   VITE_API_URL=https://your-backend.com/api
   ```

2. Restart the dev server:
   ```bash
   npm run dev
   ```

3. The app will automatically:
   - Attempt to connect to your backend
   - Show green dot when connected
   - Display real radar data
   - Auto-refresh every 2 minutes

## 📋 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## 🎨 Key Features to Explore

### Controls Panel (Left Sidebar)
- **Opacity Slider**: Drag to adjust radar transparency (0-100%)
- **Auto Refresh Toggle**: Turn on/off automatic data updates
- **Info Section**: Learn about MRMS and data sources

### Map Controls
- **Zoom**: Use mouse wheel or +/- buttons
- **Pan**: Click and drag
- **Reset View**: Refresh button in header

### Legend (Right Sidebar)
- Color-coded reflectivity scale
- dBZ value ranges
- Intensity labels (Light → Extreme)

## 🔍 Testing the UI

1. **Test Opacity Control**:
   - Move slider left → radar becomes transparent
   - Move slider right → radar becomes solid

2. **Test Auto Refresh**:
   - Toggle switch on → app fetches data every 2 minutes
   - Toggle switch off → manual refresh only

3. **Test Manual Refresh**:
   - Click "Refresh" button in header
   - Watch loading spinner
   - New data timestamp updates

## 🐛 Troubleshooting

### Port Already in Use
If port 5173 is busy:
```bash
npm run dev -- --port 3000
```

### Module Not Found
Clear node_modules and reinstall:
```bash
rm -rf node_modules package-lock.json
npm install
```

### Leaflet Map Not Showing
Check browser console for errors. Common fix:
```bash
npm install leaflet react-leaflet
```

### Tailwind Styles Not Working
Rebuild:
```bash
npm run build
npm run dev
```

## 📦 Production Deployment

### Build for Production
```bash
npm run build
```

Output will be in `dist/` directory.

### Test Production Build Locally
```bash
npm run preview
```

### Deploy to Render.com
1. Push code to GitHub
2. Create new Static Site on Render
3. Set build command: `npm run build`
4. Set publish directory: `dist`
5. Add environment variable: `VITE_API_URL=<your-api-url>`
6. Deploy!

## 📚 Next Steps

1. **Review Code Structure**:
   - Check `src/components/` for UI components
   - Look at `src/services/radarApi.ts` for API integration
   - Explore `src/types/` for TypeScript definitions

2. **Read Backend Requirements**:
   - See `BACKEND_API_REQUIREMENTS.md`
   - Understand expected API endpoints
   - Review data format specifications

3. **Customize Styling**:
   - Modify `tailwind.config.js` for theme changes
   - Update colors in component files
   - Adjust layout in `App.tsx`

## 🤝 Need Help?

- Check `README.md` for detailed documentation
- Review `BACKEND_API_REQUIREMENTS.md` for API specs
- Inspect browser console for error messages

## ✅ Verification Checklist

Before proceeding to backend development:

- [ ] App loads without errors
- [ ] Map is visible and interactive
- [ ] Controls work (opacity, auto-refresh)
- [ ] Header shows current status
- [ ] Legend displays correctly
- [ ] Refresh button responds
- [ ] Mock data mode indicator shows

Once backend is ready:

- [ ] Backend API URL configured in `.env`
- [ ] Health check endpoint returns 200
- [ ] Radar data endpoint returns valid data
- [ ] Auto-refresh fetches new data
- [ ] Status indicator shows "Backend Connected"
- [ ] Radar overlay displays on map

---

**Happy coding! 🎉**

