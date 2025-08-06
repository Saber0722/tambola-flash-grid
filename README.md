# Tambola Flash Grid 🎲

A dynamic web-based Tambola (Housie) game featuring animated ticket generation and live number calling.
Built with **React**, styled using **Tailwind CSS**, and offering a **theme switcher** for light/dark modes.

---

## Features

* Generate multiple Tambola tickets with animated fade-in / grid effects
* Automatic number draw with lively call-out animations
* Track and highlight winning patterns: *Early Five*, *Top Row*, *Full House*, etc.
* Light and dark theme toggle, persisted across sessions
* Mobile-responsive and accessible UI

---

## 🧩 Tech Stack

* **Frontend**: React, Tailwind CSS
* **State & Animations**: React Context / Hooks, GSAP or Framer Motion (if used)
* **Styling**: Utility-first styling with Tailwind
* **Theme Toggle**: Switch between light and dark modes
* **Optional Backend**: (if present) Node.js / Express / WebSocket

---

## 📁 Project Structure

```
├── public/
│   ├── index.html
│   └── ...
├── src/
│   ├── components/
│   │   ├── GameStats.tsx
│   │   ├── NumberPicker.tsx
│   │   └── TambolaTicket.tsx
│   ├── context/
│   │   └── ThemeContext.tsx
│   ├── hooks/
│   │   └── useNumberDraw.js
│   ├── styles/
│   │   └── tailwind.css
│   ├── App.jsx
│   └── index.jsx
├── tailwind.config.js
├── package.json
└── README.md
```

> Adjust this structure to match your actual project layout.

---

## ⚙️ Installation

Clone the repository:

```bash
git clone https://github.com/Saber0722/tambola-flash-grid.git
cd tambola-flash-grid
```

Install dependencies:

```bash
npm install
# or
yarn install
```

Start the development server:

```bash
npm start
# or
yarn start
```

The app will be live at `http://localhost:3000`.

---

## 🎮 Usage Guide

1. **Launch the App**: Open it in your browser.
2. **Select Tickets**: Generate or customize tickets.
3. **Start Calling Numbers**: The system auto-draws and displays numbers with animations.
4. **View Updates**: Ticket marks and winning patterns (e.g. Early Five, Full House) highlight in real time.
5. **Toggle Theme**: Use the theme switcher to change between light and dark modes.

---

## 🏆 Win Patterns (Typical Tambola Rules)

* **Early Five**: Player marks any five numbers first
* **Top Row**: Complete the first horizontal row
* **Middle Row**: Complete the second row
* **Bottom Row**: Complete the third row
* **Full House**: All fifteen numbers marked

---

## ✏️ Customization & Configuration

* **Ticket Count**: Set number of tickets generated at startup
* **Draw Interval**: Modify the timer or speed of number calls
* **Styling**: Customize Tailwind theme, colors, and animations
* **Theme Persistence**: Stores current theme in localStorage/sessionStorage

---

## 🧪 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repo
2. Create a feature branch: `git checkout -b feature-name`
3. Make your improvements / fixes
4. Commit: `git commit -m "Your description"`
5. Push: `git push origin feature-name`
6. Open a Pull Request

---

## 💬 Contact & Support

If you encounter any issues or have feature ideas, feel free to open an issue or reach out at your preferred contact.

---
[3]: https://github.com/kashish-jain/Tambola?utm_source=chatgpt.com "An online multiplayer Tambola/Housie game. - GitHub"
[4]: https://github.com/sidaudhi/tambola-generator?utm_source=chatgpt.com "A library for generating tambola tickets and calling the draw - GitHub"
