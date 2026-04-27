# MovieMate 🎬

## 🔗 Live Demo
[Your Deployed Link Here - e.g., https://moviemate-mini.vercel.app]

## 📖 Description
MovieMate is a comprehensive movie and series discovery platform designed for film enthusiasts. It allows users to browse trending content, search for specific titles, and manage a personalized watchlist. Built as a part of the FSD 74 Mini Project, it focuses on delivering a high-quality, responsive user experience with real-time data integration.

## ✨ Features
- **Trending & Popular Sections**: Instantly browse what's hot right now using the TMDB API.
- **Genre-based Filtering**: Narrow down your search by browsing specific categories like Action, Horror, and Comedy.
- **Advanced Search**: A powerful search interface that finds movies and TV shows simultaneously.
- **Detailed Movie Pages**: Access synopses, cast information, and watch trailers directly within the app.
- **Personal Watchlist**: Save movies and shows to your personal collection with local storage persistence (data stays after refresh!).
- **User Rating Interface**: Rate movies with an interactive star-based system.
- **Responsive Design**: Fully optimized for a premium experience on mobile, tablet, and desktop devices.

## 🎯 Project Goals
The primary goal of this project was to build a clean, functional React application that implements real-world features like API integration, global state management (via Context API), and local storage persistence. I aimed to create a UI that feels "human-made"—prioritizing micro-interactions, unique color palettes, and intuitive UX.

## 🛠️ Technologies Used
- **Frontend:** React.js (Hooks, Context API)
- **Styling:** Vanilla CSS3 (Custom Design System with CSS Variables)
- **APIs:** TMDB (The Movie Database) API
- **Libraries:** React Router DOM, Axios, React Icons
- **Deployment:** [Vercel / Netlify]

## 🚀 Setup Instructions

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation Steps
1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/MovieMate.git
   ```
2. **Navigate to project directory**
   ```bash
   cd MovieMate
   ```
3. **Install dependencies**
   ```bash
   npm install
   ```
4. **Create a .env file** in the root directory and add your TMDB API Key:
   ```env
   VITE_TMDB_KEY=your_api_key_here
   ```
5. **Start the development server**
   ```bash
   npm run dev
   ```
6. **Open** `http://localhost:5173` (or the port shown in terminal) in your browser.

📱 **Responsive Design**
This application is fully responsive and tested on:
- Mobile devices (375px and up)
- Tablets (768px and up)
- Desktop (1024px and up)

🎨 **Design Choices**
- **Personalized Palette**: Used a unique "Crimson & Midnight" color scheme to stand out from generic templates.
- **Context API over Redux**: Chose React Context for the Watchlist to keep the codebase clean and efficient for a mini-project.
- **Micro-interactions**: Added subtle CSS animations (`fadeIn`, `bounce`) to make the interface feel alive.

👤 **Author**
[Your Name]
- GitHub: [@yourusername]
- LinkedIn: [Your Profile Link]

📄 **License**
This project is open source and available under the MIT License.

🙏 **Acknowledgments**
- API provider: [TMDB (The Movie Database)](https://www.themoviedb.org/)
- Icons: [React Icons / FiIcons]
