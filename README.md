# 🤖 Ananya V. Hoode — R4X BOT-Inspired Developer Portfolio

> **Live Website:** [https://ananyahoode-glitch.github.io/](https://ananyahoode-glitch.github.io/)  
> **GitHub Profile:** [https://github.com/ananyahoode-glitch](https://github.com/ananyahoode-glitch)  
> **Primary Repository:** `ananyahoode-glitch.github.io`

A futuristic, interactive developer portfolio website designed for **Ananya V. Hoode**, Computer Science Engineering student specializing in **Artificial Intelligence and Machine Learning**. 

Built around an original **R4X BOT-inspired interactive robot concept**, the website blends creative technology, fluid animation, real-time mouse/touch tracking, cybernetic aesthetics, and software engineering rigor.

---

## 🌟 Key Highlights & Design Direction

- **Futuristic AI Aesthetic:** Deep midnight black (`#080B12`), dark navy (`#101626`), electric violet (`#A78BFA`), and cyan (`#55E6D1`) color scheme.
- **Interactive R4X Robot Companion:**
  1. **Cursor Eye Tracking:** Smooth vector-calculated pupil movement clamped to eye sockets.
  2. **3D Head Rotation:** Perspective head tilt reacting dynamically to user pointer movements.
  3. **Reactive Dialogue HUD:** Interactive speech bubble with conversational chips (`Say Hello`, `Who is Ananya?`, `Top Project`, `Scan Matrix`).
  4. **Click Shockwave & Blinking:** Organic eye blinking intervals and nod reaction animation on click.
  5. **State/Mood Switcher:** Dynamic mood cycles altering dialogue, reactor core LED colors, and system status.
- **Embedded Web Audio Synthesizer:** Real-time sci-fi UI blips, chimes, and robot audio synthesized directly via the Web Audio API with zero external audio assets.
- **Interactive Cyber Terminal:** In-browser command line interface featuring `help`, `skills`, `projects`, `contact`, and `r4x --say-hi` commands.
- **Verified Open-Source Projects:** All 6 verified GitHub repositories with custom high-tech SVG illustrations and responsive category filtering.
- **100% Dependency-Free:** Pure semantic HTML5, modern CSS3 (Custom Properties & Grid/Flexbox), and Vanilla JavaScript (ES6+). Zero paid APIs, zero bloated frameworks.
- **GitHub Pages Ready:** Contains `.nojekyll`, standalone `404.html`, and clean relative paths.

---

## 📁 Repository Structure

```
ananyahoode-glitch.github.io/
├── index.html                   # Master semantic HTML5 portfolio
├── styles.css                   # Cyberpunk design system & fluid animations
├── script.js                    # Interaction engine, tracking & synth
├── README.md                    # Comprehensive documentation & deploy guide
├── 404.html                     # Custom cyberpunk error page
├── .nojekyll                    # GitHub Pages bypass for Jekyll
│
└── assets/
    ├── favicon.svg              # Custom cyber robot favicon
    ├── hero-background.svg      # Futuristic cyber matrix grid
    ├── robot.svg                # Standalone master R4X BOT asset
    └── project-images/          # High-fidelity project dashboard illustrations
        ├── smart-internship-portal.svg
        ├── iris-flower-classification.svg
        ├── house-price-predictor.svg
        ├── matchwise-ai-resume-analyzer.svg
        ├── multi-agent-research-assistant.svg
        └── s4ajiet-aiml.svg
```

---

## 🚀 Showcased Verified Projects

| Project | Category | Tech Stack | GitHub Link |
|---|---|---|---|
| **Smart-Internship-Portal** | Full Stack / Web | Python, Django, SQLite, HTML5, CSS3, JS | [View Repository](https://github.com/ananyahoode-glitch/Smart-Internship-Portal) |
| **matchwise-ai-resume-analyzer** | AI / ML / NLP | Python, NLP, Machine Learning, Text Parsing | [View Repository](https://github.com/ananyahoode-glitch/matchwise-ai-resume-analyzer) |
| **multi-agent-research-assistant** | AI / Agents | Python, Multi-Agent Architecture, AI Workflows | [View Repository](https://github.com/ananyahoode-glitch/multi-agent-research-assistant) |
| **Iris-flower-classification** | Machine Learning | Python, Scikit-Learn, Pandas, NumPy | [View Repository](https://github.com/ananyahoode-glitch/Iris-flower-classification) |
| **House-price-predictor** | Machine Learning | Python, Scikit-Learn, Regression, Pandas, NumPy | [View Repository](https://github.com/ananyahoode-glitch/House-price-predictor) |
| **S4AJIET_AIML_ANANYA_17** | Academic Lab | Python, Algorithms, AI Labs, Machine Learning | [View Repository](https://github.com/ananyahoode-glitch/S4AJIET_AIML_ANANYA_17) |

---

## 🛠️ Verified Technology Stack

- **Core Languages:** Python (Primary), JavaScript (ES6+), HTML5, CSS3, SQL
- **Frameworks & Libraries:** Django, Scikit-Learn, Pandas, NumPy, Matplotlib
- **Concepts & Domains:** Machine Learning, Supervised Learning, NLP, Multi-Agent Systems, RESTful Architecture
- **Tooling & Environments:** Git, GitHub, VS Code, GitHub Pages

---

## 🌐 GitHub Pages Deployment Instructions

To deploy this portfolio to GitHub Pages under `https://ananyahoode-glitch.github.io/`:

### Method 1: Using Git CLI (Recommended)

1. Clone or initialize the repository on your machine:
   ```bash
   git init ananyahoode-glitch.github.io
   cd ananyahoode-glitch.github.io
   ```
2. Copy all files from this folder (`index.html`, `styles.css`, `script.js`, `README.md`, `404.html`, `.nojekyll`, and `assets/`) into the root directory.
3. Commit the files:
   ```bash
   git add .
   git commit -m "feat: launch premium R4X BOT developer portfolio"
   ```
4. Set the remote to your GitHub repository:
   ```bash
   git remote add origin https://github.com/ananyahoode-glitch/ananyahoode-glitch.github.io.git
   git branch -M main
   git push -u origin main
   ```
5. On GitHub, navigate to **Settings > Pages**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` / `root`
   - Click **Save**.
6. Your portfolio will be live at `https://ananyahoode-glitch.github.io/` in 1–2 minutes!

### Method 2: Direct Upload via Web Interface

1. Open [https://github.com/ananyahoode-glitch/ananyahoode-glitch.github.io](https://github.com/ananyahoode-glitch/ananyahoode-glitch.github.io).
2. Unzip the provided package (`ananyahoode-glitch.github.io.zip`).
3. Drag and drop all files and the `assets/` folder into the GitHub web interface.
4. Commit changes directly to `main`.
5. Under **Settings > Pages**, verify the source branch is set to `main` (`/root`).

---

## 🧪 Local Development & Testing

Since this project uses modern native web standards with zero build dependencies, you can run and test it locally using any static web server:

```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# Or open index.html directly in any modern browser!
```

---

## ♿ Accessibility & Performance

- **Semantic HTML5:** Validated landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`).
- **Keyboard Navigation:** Full tab indexing, visible cyan focus rings, and Escape key listeners for drawers.
- **Prefers Reduced Motion:** Automatically detects `(prefers-reduced-motion: reduce)` to disable cursor transforms and floating animations for sensitive users.
- **Fast Loading:** Zero external scripts or heavyweight libraries; instant first contentful paint (FCP).

---

Designed and developed by **Ananya V. Hoode**.  
*Engineered with R4X BOT interactive technology.*
