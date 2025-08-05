# Task Pulse - Enhanced Productivity Timer

A modern, beautifully designed productivity timer with advanced time tracking, task management, and interactive calendar features. Built with React and styled with a contemporary design system.

## 🚀 Features

### Core Timer Features

- **Pomodoro Timer**: 25-minute work sessions, 5-minute breaks (fully customizable)
- **Custom Styled Notifications**: Beautiful, app-consistent notifications that auto-start your next session
- **Session Tracking**: Automatic session counting and comprehensive statistics
- **Audio Notifications**: Built-in sound alerts for session completion
- **Progress Visualization**: Linear and circular progress indicators with smooth animations

### Task Management

- **Daily Task Lists**: Add, complete, and delete tasks for each day
- **Date Stamping**: Tasks are automatically organized by date
- **Persistence**: All tasks saved to localStorage with automatic backup
- **Visual Indicators**: Task completion status reflected in calendar
- **Clean Interface**: Modern, distraction-free task management

### Modern Interactive Calendar

- **Clean Monthly View**: Streamlined calendar interface with modern card-based design
- **Visual Event Indicators**: Color-coded bars for work sessions, breaks, and tasks
- **Detailed Day Modals**: Click any date for comprehensive information with beautiful modal design
- **Gradient Backgrounds**: Days with events feature subtle gradient backgrounds
- **Hover Effects**: Smooth animations and micro-interactions throughout
- **Today Highlighting**: Current day prominently highlighted with blue ring

### Advanced Time Tracking

- **Separate Tracking**: Work time and break time tracked independently
- **Range Analysis**: Select date ranges to see cumulative statistics
- **Combined Totals**: View total time investment (work + break time combined)
- **Clean Data Export**: Download CSV reports for selected periods
- **Streamlined Interface**: Removed clutter, focused on essential metrics

### Modern UI/UX Design

- **Contemporary Aesthetics**: Card-based design with subtle shadows and rounded corners
- **Gradient Accents**: Beautiful blue-to-purple gradients throughout
- **Dark Mode Support**: Complete dark theme with consistent styling
- **Responsive Design**: Optimized for desktop, tablet, and mobile
- **Smooth Animations**: Polished hover effects and transitions
- **Professional Typography**: Clean, modern font styling with proper hierarchy

## 🛠️ Installation & Setup

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Quick Start

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   cd productivity-timer
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Start Development Server**

   ```bash
   npm start
   ```

4. **Build Tailwind CSS** (if needed)
   ```bash
   npx tailwindcss -i ./src/index.css -o ./src/output.css --watch
   ```

The app will be available at `http://localhost:3000`

## 🧪 Testing Guide

### Timer Functionality

- ✅ **Start/Pause**: Click Start button to begin timer
- ✅ **Session Completion**: Let a session complete to see custom notification
- ✅ **Auto-Start**: Click "Start Break" in notification to automatically begin break timer
- ✅ **Settings**: Access timer settings via the timer page settings button
- ✅ **Custom Durations**: Modify work and break durations in settings

### Task Management

- ✅ **Add Tasks**: Type in task input and press Enter or click '+'
- ✅ **Complete Tasks**: Check boxes to mark tasks complete
- ✅ **Delete Tasks**: Click '×' button to remove tasks
- ✅ **Calendar Integration**: Verify tasks appear as indicators in calendar

### Modern Calendar

- ✅ **Monthly Navigation**: Use arrow buttons to navigate between months
- ✅ **Day Details**: Click any date to open detailed modal
- ✅ **Visual Indicators**: Look for colored bars on dates with activity
- ✅ **Today Highlighting**: Verify current day has blue ring highlight
- ✅ **Responsive Design**: Test on different screen sizes

### Time Tracking

- ✅ **Range Selection**: Use date range picker for custom periods
- ✅ **Combined Totals**: Verify "Combined Total Time" appears in range totals
- ✅ **CSV Export**: Download data for selected date ranges
- ✅ **Clean Interface**: Confirm daily entries section has been removed

### Settings & Data Management

- ✅ **Clear History**: Access "Clear Session History" from timer settings
- ✅ **Data Persistence**: Refresh page to verify all data is saved
- ✅ **Dark Mode**: Toggle between light and dark themes

## 📁 Project Structure

```
productivity-timer/
├── src/
│   ├── components/
│   │   ├── Calendar.js              # Modern calendar with enhanced design
│   │   ├── CircularTimer.js         # Circular progress indicator
│   │   ├── Controls.js              # Timer control buttons
│   │   ├── NavBar.js                # Navigation with dark mode toggle
│   │   ├── SessionNotification.js   # Custom styled session notifications
│   │   ├── Settings.js              # Timer settings and data management
│   │   ├── Statistics.js            # Daily statistics display
│   │   ├── TaskList.js              # Task management component
│   │   ├── Timer.js                 # Timer display component
│   │   ├── TimerPage.js             # Main timer page layout
│   │   └── TimeTracking.js          # Time tracking and analytics
│   ├── hooks/
│   │   └── useTimer.js              # Enhanced timer hook with notifications
│   ├── App.js                       # Main app with routing and context
│   ├── index.js                     # Application entry point
│   ├── index.css                    # Tailwind imports and custom styles
│   └── output.css                   # Generated Tailwind CSS
├── public/
├── package.json
├── tailwind.config.js
└── README.md
```

## 🎨 Design System

### Color Palette

- **Primary**: Blue to purple gradients (`from-blue-500 to-purple-600`)
- **Success**: Green to emerald gradients (`from-green-500 to-emerald-600`)
- **Work Sessions**: Blue indicators and backgrounds
- **Breaks**: Green indicators and backgrounds
- **Tasks**: Orange for incomplete, green for completed
- **Combined Totals**: Orange theme for combined time metrics

### Modern Design Elements

- **Rounded Corners**: `rounded-xl` (12px), `rounded-2xl` (16px)
- **Subtle Shadows**: `shadow-lg`, `shadow-2xl` for depth and elevation
- **Gradient Backgrounds**: Used for headers and interactive elements
- **Card-Based Layout**: Clean separation with consistent spacing
- **Hover Effects**: Scale transforms and opacity changes

### Typography

- **Clean Hierarchy**: Multiple font weights for proper information hierarchy
- **Consistent Spacing**: Tailwind's spacing scale for uniformity

## 🔧 Technical Architecture

### Core Dependencies

- **React**: 19.x (Latest)
- **React Router DOM**: 7.x (Client-side routing)
- **Tailwind CSS**: 3.x (Utility-first styling)
- **Date-fns**: Date manipulation utilities

### State Management

- **React Context**: Global app state for tasks and session history
- **localStorage**: Persistent data storage
- **Custom Hooks**: Encapsulated timer logic and notifications

### Key Components

- **SessionNotification**: Custom modal system replacing browser alerts
- **Enhanced Calendar**: Modern card-based design with visual indicators
- **Streamlined TimeTracking**: Focused on essential metrics
- **Responsive Navigation**: Adaptive layout for all screen sizes

## 🚀 Deployment Options

### Vercel (Recommended)

```bash
npm i -g vercel
vercel --prod
```

### Netlify

```bash
npm run build
# Deploy the build folder to Netlify
```

### GitHub Pages

1. Add to package.json: `"homepage": "https://username.github.io/repo-name"`
2. Install: `npm install --save-dev gh-pages`
3. Add scripts: `"predeploy": "npm run build", "deploy": "gh-pages -d build"`
4. Deploy: `npm run deploy`

## 🔮 Recent Enhancements

### Latest Updates

- ✅ **Custom Notifications**: Replaced browser alerts with styled, app-consistent modals
- ✅ **Auto-Start Timers**: Notifications now automatically start the next session
- ✅ **Modernized Calendar**: Complete redesign with card-based layout and gradients
- ✅ **Streamlined Time Tracking**: Removed daily entries, added combined total time
- ✅ **Enhanced Settings**: Moved clear history function to settings for better organization
- ✅ **Improved Visual Hierarchy**: Better spacing, typography, and color usage

### Future Roadmap

- **Keyboard Shortcuts**: Global hotkeys for common actions
- **Task Prioritization**: Priority levels and sorting
- **Advanced Analytics**: Productivity insights and trends
- **Sound Customization**: Custom notification sounds
- **Team Features**: Shared workspaces and collaboration
- **PWA Support**: Installable progressive web app
- **Offline Sync**: Service worker for offline functionality

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes with proper testing
4. Commit your changes (`git commit -m 'Add amazing feature'`)
5. Push to the branch (`git push origin feature/amazing-feature`)
6. Open a Pull Request

## 📄 License

MIT License - feel free to use this project for personal or commercial purposes.

---

**Task Pulse** - Focus on what matters most. ⚡

_A modern productivity timer designed for the way you work._
