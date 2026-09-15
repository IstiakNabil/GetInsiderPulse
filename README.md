# GetInsiderPulse

## Project overview
GetInsiderPulse is a mobile prototype that helps a user scan, search, and understand fictional disclosed insider-activity (executives buying or selling their own company's stock). The app solves the problem of quickly browsing this kind of activity on mobile: a home dashboard for an at-a-glance summary, a searchable/filterable screener for finding a specific transaction, and a details view for understanding one transaction in depth.

## Concept and data statement
This is an original mobile concept inspired by the broad insider-activity product category. StockInsider.io was not used as a data, copy, or UI source — no layouts, wording, or transaction values were copied or referenced from it or any live financial data source. All companies, tickers, insider names, values, signals, dates, and chart data displayed in this app are local, fictional, mock/demo content, hardcoded in the app and not fetched from any API.

## Screens and features
- **Home (Market Pulse)** — header with a "Fictional demo data" badge, a search entry point, three summary cards (total transactions, purchase value, sale value) calculated from local mock data, a Top Signals row, and a Latest Activity list of the four most recent trades.
- **Screener** — full searchable list of all mock trades. Search matches ticker or company name case-insensitively. Three independent filters (transaction type, insider role, value threshold) can be combined with search. Shows a live result count and a "no results" empty state with a Clear Filters action.
- **Trade Details** — company header with sector and a "FICTIONAL DEMO DATA" badge, a signal card, a full detail grid (insider, transaction type/code, shares, price per share, total value, transaction date, filed date, signal strength), a 7-day mock activity chart built from a local numeric array, a short "why this matters" explanation, and the required mock-data disclaimer.

## Tech stack
- Expo (React Native) with TypeScript
- Expo Router (file-based navigation)
- react-native-safe-area-context
- No external chart library — the 7-day activity chart is built with plain `View` bars sized from a local array
- No network calls, no backend, no external APIs

## Setup
```bash
git clone <your-repo-url>
cd GetInsiderPulse
npm install
npx expo start
```
Scan the QR code with Expo Go (Android) to run the app.

## Mobile design decisions
- Dark theme throughout for a focused, fintech-app feel, using a consistent color palette (dark navy background, card surfaces, green for purchases, red for sales) applied across all three screens.
- Filter chips instead of dropdown menus, since they're faster to tap and scan on a small screen and make the active filter state visually obvious at a glance.
- Search and filters combine live as the user types/taps, with no separate "apply" button, so feedback is immediate.
- Text and color are both used together (not color alone) to distinguish Purchase vs. Sale, for accessibility.

## Known limitations
- All data is static and local; there are no live filings, real market data, authentication, portfolio tracking, alerts, or backend of any kind.
- The 7-day activity chart uses fixed illustrative values, not calculated from any real time-series logic.
- No persistence — filter/search state resets if the app is restarted.

## AI-use disclosure
I used Claude (Anthropic) as a guided coding assistant throughout development — to help plan the screen structure, explain React Native/Expo Router/TypeScript concepts as I learned them, write and debug component code, and structure this README. I reviewed, typed, tested, and can explain all the code in this project myself.

## Deliverables
- GitHub repository: https://github.com/IstiakNabil/GetInsiderPulse
- Google Drive folder (APK, screenshots, video): https://drive.google.com/drive/folders/13brOkiYEHDAfmjoIL9uHdjiG7aieYhpf?usp=drive_link