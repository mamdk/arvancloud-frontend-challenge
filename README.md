# ArvanCloud Frontend Challenge

A React + Vite project for ArvanCloud's frontend challenge.

## 🛠️ Installation

First, install the dependencies:

```bash
npm install
```

If you encounter dependency conflicts, use:

```bash
npm install --legacy-peer-deps
```

## 🚀 Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

### `npm run start`

Runs the built app in production mode (requires running `build` first).

## 🔗 Repository

GitHub Repository: [https://github.com/mamdk/arvancloud-frontend-challenge](https://github.com/mamdk/arvancloud-frontend-challenge)

## 📚 Technical Documentation

### 🏗️ Implementation

#### Project Architecture
- **Framework**: React + Vite
- **Core Libraries**: React Router (for routing) + React Query 
- **Folder Structure**:
```
src/
├── assets/       # Static files (images, fonts)
├── components/   # Reusable components
├── contexts/     # React Context providers
├── data/         # Static data (including panel navlinks)
├── layout/       # Layout templates
│   ├── auth/     # Authentication-related layout
│   └── panel/    # Dashboard/panel layout
├── pages/        # Pages
├── routes/       # Route configurations
├── theme/        # Theme management
├── utils/        # Utility functions
└── bootstrap/    # Initialization files
```
Other files in the root folder are for libraries and tool configurations or the main project.

#### Key Implementation Details
1. **Routing System**:
   - Routes are defined in `routes/` directory
   - Main layout handles routing via `React Router`

2. **Layout Management**:
   - `layout/auth/`: Authentication screens layout
   - `layout/panel/`: Main application dashboard layout
   - Layouts wrap pages with consistent UI structure

3. **Navigation Data**:
   - Panel navigation links are stored in `data/`

### 🛠️ Maintenance

#### Adding New Features
1. **Create a New Page**:
   - Add component in `pages/`
   - Define route in `routes/`

2. **Modify Navigation**:
   - Update `routes/`
   - Ensure routes match navigation paths

#### Development Workflow
```bash
# Install with legacy peer deps (if needed)
npm install --legacy-peer-deps

# Start dev server
npm run dev

# Production build
npm run build

# Run production build
npm run start
```

#### Bootstrap Files
- `bootstrap/index.html`: Base HTML template
- `bootstrap/app.tsx`: Root React component
- `bootstrap/index.ts`: Application entry point

### 💡 Best Practices
1. Keep route definitions in sync with navigation data
2. Use layout components for consistent UI structure
3. Add new utility functions in `utils/` folder
4. Maintain clear separation between:
    - Layout structure (in `layout/`)
    - Page content (in `pages/`)
    - Routing logic (in `routes/`)

## ℹ️ Additional Notes

- If you get peer dependency warnings, using `--legacy-peer-deps` flag is recommended
- The project uses Vite for fast development builds