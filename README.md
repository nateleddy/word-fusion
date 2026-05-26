# 🎹 WordFusion // Merge the Mind

Welcome to **WordFusion**, a stylish, high-fidelity compound word puzzle game designed for modern web browsers. Solve word pairings, build your score matrix, and enjoy retro arcade synth sweeps synthesized natively in your browser.

👉 **Play the game live here:** [https://nateleddy.github.io/word-fusion/](https://nateleddy.github.io/word-fusion/)

---

## ⚡ How to Play

WordFusion challenges your vocabulary and lateral thinking through elegant word associations:
1. **The Clue**: You are given one half of a compound word (e.g., `SWEAT`).
2. **The Target**: You must guess the matching half of the word (e.g., `SHOP`).
3. **The Multiplier**: Each puzzle starts at **5 points**. Submitting an incorrect guess or revealing a hint letter reduces the point value by 1.
4. **Sequencing**: On wrong guesses or hints, the game automatically reveals the target letters left-to-right to guide you toward the solution.
5. **The Score Matrix**: Complete all 5 puzzles in a round to get your final score and copy your custom Wordle-style shareable emoji block grid (e.g., `🟩🟦🟪🟩🟥`) to share with friends!

---

## 🛠️ Architecture & Tech Stack

This project was built from scratch using vanilla web technologies, emphasizing raw performance and rich user aesthetics:

*   **Structure**: Semantic HTML5 with robust ARIA labeling.
*   **Styling**: Advanced Vanilla CSS featuring HSL custom property mappings, modern typography (*Outfit* and *Space Grotesk*), glassmorphic panels (`backdrop-filter`), slow-floating background glowing elements, and custom micro-animations (card flipping, incorrect guess shaking, and fluid toast alert notifications).
*   **Engine & Sound**: Pure modern JavaScript utilizing the **Web Audio API** to dynamically synthesize rich retro sound effects (perfect solve chimes, low-frequency buzz sweeps, hint clicks, and victory pads) completely offline without loading heavy external audio assets.
*   **State & Storage**: Lightweight state engine tracking round indices, multiplier tracking, and persistent statistics (Rounds Completed, High Scores, and Perfect Solves) stored locally using browser `localStorage`.

---

## 📂 Project Structure

```
word-fusion/
├── index.html   # HTML5 Interface and layout modules
├── style.css    # Colors, animations, responsive design rules
├── app.js       # Game controller, state management, Web Audio synthesizer
└── README.md    # Documentation and game manual
```

---

## 🚀 Local Development

To run this project locally on your machine:
1. Clone this repository:
   ```bash
   git clone https://github.com/your-username/word-fusion.git
   ```
2. Navigate into the folder:
   ```bash
   cd word-fusion
   ```
3. Open `index.html` in your favorite web browser (or run a local development server of your choice).

---

*Crafted with 💜 as a first step into vibe coding.*
