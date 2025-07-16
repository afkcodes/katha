# Katha - Mythological Storytelling App

A React Native app dedicated to exploring the rich world of Indian mythology through Ramayana, Mahabharata, and other ancient tales.

## 🎨 Theme System

### Mythological Color Palette

Our theme system is inspired by Indian epics and sacred traditions:

#### Dark Theme - Cosmic Night
- **Background**: Deep cosmic colors (#0A0E1A)
- **Primary**: Sacred saffron (#FF6B35) - representing divine fire
- **Secondary**: Divine blue (#1E40AF) - Krishna, Vishnu, celestial waters
- **Accent**: Divine gold (#FFD700) - sacred objects and attributes

#### Light Theme - Sacred Illumination  
- **Background**: Warm white (#FFFBF7) with sacred undertones
- **Primary**: Vibrant saffron (#EA580C) - sacred color in Hinduism
- **Secondary**: Royal blue (#1E40AF) - divine wisdom
- **Accent**: Rich gold (#D97706) - divine prosperity

#### Mythological Element Colors
- **Divine**: Purple-blue (#6366F1/#4F46E5) - Gods and goddesses
- **Heroic**: Emerald (#10B981/#059669) - Heroes and righteous characters
- **Demonic**: Red (#DC2626/#B91C1C) - Demons and evil forces
- **Nature**: Green (#059669/#16A34A) - Natural elements and forests
- **Celestial**: Violet (#8B5CF6/#7C3AED) - Celestial beings
- **Earthly**: Brown (#92400E/#A16207) - Earthly realm and mortals

### Typography

Designed for multilingual storytelling with:
- Display styles for epic titles
- Headline styles for chapters
- Body text optimized for reading
- Special styles for Sanskrit/verses
- Responsive sizing based on device

### Development Setup

#### Code Quality Tools
- **Biome**: Lightning-fast linting and formatting
- **Lefthook**: Git hooks for pre-commit checks
- **Commitlint**: Conventional commit messages
- **TypeScript**: Strict mode with path aliases

#### Git Hooks
- Pre-commit: Lint, format, and type checking
- Commit-msg: Enforce conventional commits
- Pre-push: Security audit

#### Scripts
```bash
npm run dev          # Start development server
npm run lint         # Run linter
npm run lint:fix     # Fix linting issues
npm run format       # Format code
npm run format:fix   # Format and write files
npm run check        # Run all checks
npm run check:fix    # Run and fix all issues
npm run type-check   # TypeScript checking
npm run release      # Create new release
```

## 🛠️ Tech Stack

- **Framework**: React Native with Expo
- **Language**: TypeScript
- **Storage**: MMKV for theme persistence
- **Styling**: StyleSheet with themed components
- **Navigation**: (To be added)
- **State Management**: (To be added)

## 📱 Features (Planned)

- [ ] Epic stories (Ramayana, Mahabharata)
- [ ] Character encyclopedia
- [ ] Multilingual support
- [ ] Audio narration
- [ ] Bookmarks and favorites
- [ ] Progress tracking
- [ ] Search functionality
- [ ] Dark/light theme switching

## 🚀 Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Install git hooks:
   ```bash
   npm run prepare
   ```

## 📦 Project Structure

```
src/
├── theme/           # Theme system
│   ├── colors.ts    # Color palette
│   ├── typography.ts # Font styles
│   ├── spacing.ts   # Layout system
│   └── index.ts     # Main exports
├── constants/       # App constants
├── types/          # TypeScript definitions
├── components/     # Reusable components (planned)
├── screens/        # App screens (planned)
└── utils/          # Utility functions
```

## 🎯 Vision

To create an immersive digital experience that brings ancient Indian mythology to modern audiences, preserving cultural heritage while making it accessible and engaging for all ages.

---

*"Where ancient wisdom meets modern technology"* 🕉️
