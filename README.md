# Shrimad Bhagwat Geeta — Web Reader

This project is a single-page React application that provides a focused, lightweight reader for the Shrimad Bhagwat Geeta. It is built with Vite and React, fetches verses (shlok) from a remote static dataset, and exposes navigation, bookmarking, and presentation controls (theme and language toggles) to users. The goal is to offer a responsive reading experience with minimal dependencies and clear client-side state management.

---

## Purpose & Motivation

The application exists to provide an accessible, distraction-minimized interface for reading the Geeta in Sanskrit, Hindi, and English translations. It is optimized for quick navigation between chapters and verses, supports bookmarking and persistent user settings, and is intentionally lightweight so it can be deployed as a static site (e.g., GitHub Pages, Netlify).

Motivations that influenced the design:

- Simplicity: keep the UX focused on the text and navigation.
- Offline persistence: store user preferences and last-read position locally.
- Minimal server dependence: use a static, content-hosted API for verse data.
- Accessibility: language toggles and clear controls for navigation.

---

## High-level Architecture

The app is a client-only React application bootstrapped by Vite. It contains three logical layers:

- Presentation (UI components): header, navigation tabs (horizontal & vertical), content display (shlok rendering), and footer.
- State & persistence: top-level `App` component holds the authoritative state (current chapter/verse, language toggles, theme) and persists settings to `localStorage`.
- Data retrieval: `Shlok` component performs HTTP GET requests to fetch verse content from a hosted JSON dataset using `axios`.

Build and development tools:

- Vite for fast dev server and production build.
- ESLint configuration for linting.
- MUI Icons for consistent icons.

Interaction flow (typical):

1. App initializes and reads `localStorage` for saved chapter/verse and presentation settings.
2. The `Header` exposes controls for search and settings; `HorizontalTab` shows verse quick-jump buttons; `VerticalTab` exposes chapters.
3. When chapter or verse is changed, `App` updates state, persists the cursor in `localStorage`, and re-renders `Content`.
4. `Content` delegates to `Shlok`, which performs a network request to fetch the verse's translations and displays them according to language toggles.

---

## Module-by-Module Explanation

This section explains responsibilities and data flow for each relevant file/component.

- `index.html`
  - The HTML entry; contains `#root` for React and links to global styles.

- `package.json`
  - Dependency manifest: React, Vite, MUI icons, axios. Scripts include `dev`, `build`, `preview`, and `lint`.

- `src/index.jsx`
  - Application bootstrapper. Reads two localStorage keys: `chapterAndVerse` (last cursor) and `gitaSettings` (presentation options). These values are passed as initial props into the root `App` component.

- `src/components/App.jsx` (Core application state)
  - Holds primary state: `chapter`, `verse`, `darkmode`, `english`, `hindi`, `sanskrit`, plus UI flags like `tabOpen`.
  - `numberOfVerses`: an in-file array listing counts of verses per chapter (used for bounds checking and UI generation).
  - Persists settings (`gitaSettings`) to `localStorage` whenever toggles change.
  - Applies a CSS class to `document.body` and `document.documentElement` to enable a global dark mode via CSS selectors.
  - Exposes functions to change `chapter` and `verse` with validation:
    - `changeChapter(c)`: validates range (1..18), sets `verse` to 1 on chapter change, and saves to `localStorage`.
    - `changeVerse(v)`: validates against `numberOfVerses` for the current chapter.
  - Renders layout composed of `Header`, `HorizontalTab`, `Content`, `VerticalTab`, and `Footer`.

- `src/components/header/*`
  - `Header.jsx` is a thin composition component connecting `Search`, `About`, and `Dropdown` and forwarding callbacks.
  - `Search.jsx` offers a two-select UI (chapter  verse) and calls `changeChapter` & `changeVerse` when a search is executed. It sets the verse select length based on `numberOfVerses`.
  - `Dropdown.jsx` contains the settings menu with toggles for theme and languages. It guards toggles so the user cannot disable all languages at once.
  - `Bookmarks.jsx` (header-scoped) is a simple presentational list used where appropriate (see `src/components/bookmarks/Bookmarks.jsx`).

- `src/components/horizontalTab/HorizontalTab.jsx`
  - Renders a horizontal, scrollable list of verse quick-jump items for the current chapter.
  - Uses a `ref` to the container and scrolls by a fraction of the viewport width to provide left/right navigation.
  - Clicking a verse invokes `changeVerse` passed from `App`.

- `src/components/verticalTab/*`
  - `VerticalTab.jsx` manages whether the side tab is open and renders `Chapters` and a `Slider` placeholder.
  - `Chapters.jsx` renders a list of chapter buttons (1–18) and calls back to `App` to change chapter.
  - `Slider.jsx` is a small placeholder component; currently lightweight with scope for future features (e.g., seek by scrollbar).

- `src/components/content/Content.jsx` and `src/components/content/Shlok.jsx`
  - `Content.jsx` renders navigation arrows (previous/next verse) and embeds `Shlok`.
  - `Shlok.jsx` is responsible for fetching content via `axios` from the external static host `https://vedicscriptures.github.io/slok/{chapter}/{verse}`.
  - `Shlok` maps the fetched object into three displays (sanskrit, english, hindi) depending on `props.*` language toggles, and shows an error string when fetching fails.

- `src/components/bookmarks/Bookmarks.jsx`
  - A dropdown UI that shows saved bookmarks (format: `chapter:verse`). Bookmarks list is passed as props and clicking a bookmark triggers `goToBookmark(bookmark)`.

- `src/components/footer/Footer.jsx`
  - Simple footer with deployment attribution.

- CSS files
  - App-level and component-level CSS exist under `public/` and `src/styles/`. Global theme toggles are achieved via `body.dark` / `:root.dark` classes.

---

## Key Workflows and Design Reasoning

1. State Centralization

   The `App` component is the single source of truth for navigation and presentation state. This simplifies persistence (one place to save to `localStorage`) and avoids prop-drilling confusion because top-level callbacks are passed down to only a few UI components.

2. Persistence via localStorage

   - `chapterAndVerse` and `gitaSettings` are stored as small JSON blobs. This keeps the app usable across reloads without a server-side session.
   - Trade-off: localStorage is synchronous and limited per-domain, but it is sufficient for these small settings and avoids complexity of IndexedDB for this use case.

3. Data fetching in `Shlok`

   - `Shlok` fetches only the required verse on render (no eager bulk-fetch). This keeps initial load small and gives the browser control over caching via HTTP caching headers on the static host.
   - Error handling is coarse-grained: network or parse errors set an `error` state and present a user-facing message.
   - Trade-off: Per-verse fetches create more network requests if users navigate quickly; a potential optimization is prefetching adjacent verses or caching responses in memory.

4. UI Responsiveness and Navigation

   - Horizontal tab is scrollable (via `scrollBy`) to handle many verse elements without wrapping.
   - Previous/next arrows in `Content` are conditional based on verse bounds.

5. Language toggle constraints

   - The dropdown prevents disabling all languages at once. This prevents a blank reading area and simplifies UX decisions.

---

## Important Functions & Behavior (Developer Reference)

- `App.changeChapter(c)`
  - Validates `1 <= c <= 18`.
  - Sets `verse` to 1 when the chapter changes and persists `{chapter, verse}` to `localStorage`.

- `App.changeVerse(v)`
  - Validates against `numberOfVerses[chapter - 1]` and only updates when in range.

- `App.toggleTheme()` / `toggleEnglish()` / `toggleHindi()` / `toggleSanskrit()`
  - Update settings and persist `gitaSettings` to `localStorage` via a `useEffect` hook.
  - Language toggles guard against disabling all languages.

- `Shlok` fetch flow
  - On mount/update (chapter/verse change) it calls `axios.get('https://vedicscriptures.github.io/slok/${ch}/${sl}')`, then maps `obj.slok`, `obj.prabhu?.et`, `obj.rams?.ht` to UI regions. If errors occur, `error` state is set.

- `Search` component
  - Provides a local controlled form with two selects: chapter and verse.
  - When the user clicks `Search`, it calls parent `changeChapter` and `changeVerse`, then resets its selects.

---

## Edge Cases, Validations & Constraints

- Chapter bounds: `1..18`. The UI prevents invalid chapter entries and `App.changeChapter` enforces it.
- Verse bounds: `1..numberOfVerses[chapter-1]`. Both `HorizontalTab` and `App.changeVerse` rely on `numberOfVerses` to stay within bounds.
- Language toggles: guarded so disabling the last remaining language is prevented.
- No-bookmarks state: `Bookmarks` components render a suitable empty state message.
- Network errors: `Shlok` sets an `error` message when fetching fails; the UI shows this message.

---

## Correctness, Performance & Scalability

Correctness
- Input validation for chapter and verse maintains consistency between UI and stored state.
- Controlled components (`Search`, `HorizontalTab`) manage their display state and send validated updates to `App`.

Performance
- Minimal initial payload: only the current verse is fetched on demand.
- React keys are used in several places (`HorizontalTab` and `Content`) to ensure predictable re-rendering.

Scalability
- This codebase is designed for a static corpus and small scale. If the dataset grew substantially or required search across verses, the next steps would be:
  - Introduce an indexed search (client-side or backend) and paginate results.
  - Add an in-memory cache and prefetching logic in `Shlok` for adjacent verses.
  - Consider server-side rendering (SSR) for SEO and faster first contentful paint.

---

## Known Limitations & Future Improvements

- Caching: add an in-memory (or IndexedDB) cache to avoid duplicate network fetches during navigation.
- Prefetching: when the user is on verse N, prefetch N+1 and N-1 to improve perceived performance.
- Accessibility: keyboard focus management in dropdowns and aria attributes can be improved.
- Tests: no unit/integration tests included—add Jest + React Testing Library for component tests and mock `axios`.
- Error UX: present retry actions for fetch failures.

---

## Development & Contribution

Prerequisites

- Node.js (>= 18 recommended) and npm

Local development

```bash
npm install
npm run dev
```

Build for production

```bash
npm run build
npm run preview
```

Linting

```bash
npm run lint
```

Project structure (high level)

- `index.html` — app entry
- `src/index.jsx` — React bootstrap
- `src/components` — all UI components
- `public/` and `src/styles` — shared static assets and CSS

Contributing

- Open an issue for bugs or feature proposals.
- For code changes, fork and create a pull request. Keep changes small and focused.

---

## Troubleshooting

- If the app shows a fetch error: confirm network connectivity and that `https://vedicscriptures.github.io/slok/CH/V` responds with JSON.
- If toggles do not persist: verify browser `localStorage` permissions and clear conflicting storage entries.

---

## Contact

If you want help extending this project or shipping enhancements (prefetching, caching, tests), open an issue or contact the repository owner.

