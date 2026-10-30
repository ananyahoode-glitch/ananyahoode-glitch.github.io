/**
 * R4X BOT-INSPIRED DEVELOPER PORTFOLIO — INTERACTIVE ENGINE
 * Owner: Ananya V. Hoode (ananyahoode-glitch)
 * Features: Cursor Eye Tracking, 3D Head Tilt, Reactive HUD,
 * Web Audio Synthesizer, Project Filtering, Interactive Terminal
 */

(function () {
  'use strict';

  // --- 1. Sound Synthesizer (Web Audio API) ---
  let audioCtx = null;
  let audioEnabled = true;

  function initAudio() {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        audioCtx = new AudioContext();
      }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
  }

  // Futuristic synth blip / chime generator
  function playFuturisticSound(type = 'blip') {
    if (!audioEnabled) return;
    try {
      initAudio();
      if (!audioCtx) return;

      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      const now = audioCtx.currentTime;

      if (type === 'blip') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(580, now);
        osc.frequency.exponentialRampToValueAtTime(1100, now + 0.08);
        gain.gain.setValueAtTime(0.08, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
        osc.start(now);
        osc.stop(now + 0.08);
      } else if (type === 'chime') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(440, now);
        osc.frequency.setValueAtTime(880, now + 0.06);
        osc.frequency.setValueAtTime(1320, now + 0.12);
        gain.gain.setValueAtTime(0.09, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.28);
        osc.start(now);
        osc.stop(now + 0.28);
      } else if (type === 'robot') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.linearRampToValueAtTime(640, now + 0.05);
        osc.frequency.linearRampToValueAtTime(480, now + 0.12);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);
        osc.start(now);
        osc.stop(now + 0.18);
      } else if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        gain.gain.setValueAtTime(0.04, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // --- 2. DOM Elements & State ---
  const robotTarget = document.getElementById('r4x-interactive-target');
  const robotLeftPupil = document.getElementById('r4x-left-pupil');
  const robotRightPupil = document.getElementById('r4x-right-pupil');
  const robotHeadGroup = document.getElementById('r4x-head-group');
  const robotMouthCurve = document.getElementById('r4x-mouth-curve');
  const robotReactorCore = document.getElementById('r4x-reactor-core');
  const speechTextEl = document.getElementById('robot-speech-text');
  const moodTextEl = document.getElementById('r4x-mood-text');
  const dialogueBox = document.getElementById('robot-dialogue-box');

  const btnSayHello = document.getElementById('btn-say-hello');
  const btnChangeMood = document.getElementById('btn-change-mood');
  const audioToggleBtn = document.getElementById('audio-toggle');
  const audioOnSvg = document.querySelector('.audio-on-svg');
  const audioOffSvg = document.querySelector('.audio-off-svg');

  const header = document.getElementById('header');
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileClose = document.getElementById('mobile-close');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  const backToTopBtn = document.getElementById('back-to-top');

  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  const terminalTabs = document.querySelectorAll('.terminal-tab');
  const terminalPanes = document.querySelectorAll('.terminal-pane');
  const terminalCliInput = document.getElementById('terminal-cli-input');
  const cliHistory = document.getElementById('cli-history');
  const cliChips = document.querySelectorAll('.cli-chip');

  const btnCopyEmail = document.getElementById('btn-copy-email');
  const copyBtnLabel = document.getElementById('copy-btn-label');
  const emailAddress = document.getElementById('email-address');

  // Check reduced motion preference
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // --- 3. Audio Toggle Handling ---
  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      audioEnabled = !audioEnabled;
      if (audioEnabled) {
        audioOnSvg.classList.remove('hidden');
        audioOffSvg.classList.add('hidden');
        playFuturisticSound('blip');
      } else {
        audioOnSvg.classList.add('hidden');
        audioOffSvg.classList.remove('hidden');
      }
    });
  }

  // --- 4. R4X Robot Cursor & Touch Tracking ---
  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let currentPupilX = 0;
  let currentPupilY = 0;
  let currentHeadRotY = 0;
  let currentHeadRotX = 0;

  function updatePointerPosition(x, y) {
    mouseX = x;
    mouseY = y;
  }

  window.addEventListener('mousemove', (e) => {
    updatePointerPosition(e.clientX, e.clientY);
  }, { passive: true });

  window.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      updatePointerPosition(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });

  function renderRobotTracking() {
    if (!prefersReducedMotion && robotTarget && robotLeftPupil && robotRightPupil && robotHeadGroup) {
      const rect = robotTarget.getBoundingClientRect();
      const botCenterX = rect.left + rect.width / 2;
      const botCenterY = rect.top + rect.height * 0.35; // Target head height

      const deltaX = mouseX - botCenterX;
      const deltaY = mouseY - botCenterY;
      const distance = Math.hypot(deltaX, deltaY);

      // Clamp pupil travel within eye socket (max 10px X, 7px Y)
      const maxPupilTravelX = 10;
      const maxPupilTravelY = 7;
      const angle = Math.atan2(deltaY, deltaX);
      const intensity = Math.min(distance / 350, 1);

      const targetPupilX = Math.cos(angle) * maxPupilTravelX * intensity;
      const targetPupilY = Math.sin(angle) * maxPupilTravelY * intensity;

      // Smooth interpolation (lerp)
      currentPupilX += (targetPupilX - currentPupilX) * 0.15;
      currentPupilY += (targetPupilY - currentPupilY) * 0.15;

      const pupilTransform = `translate(${currentPupilX.toFixed(2)}px, ${currentPupilY.toFixed(2)}px)`;
      robotLeftPupil.style.transform = pupilTransform;
      robotRightPupil.style.transform = pupilTransform;

      // Head 3D tilt (rotateY for horizontal glance, rotateX for tilt)
      const maxHeadRotY = 12; // degrees
      const maxHeadRotX = 8;
      const targetHeadRotY = (deltaX / (window.innerWidth / 2)) * maxHeadRotY;
      const targetHeadRotX = -(deltaY / (window.innerHeight / 2)) * maxHeadRotX;

      currentHeadRotY += (Math.max(Math.min(targetHeadRotY, maxHeadRotY), -maxHeadRotY) - currentHeadRotY) * 0.1;
      currentHeadRotX += (Math.max(Math.min(targetHeadRotX, maxHeadRotX), -maxHeadRotX) - currentHeadRotX) * 0.1;

      robotHeadGroup.style.transform = `perspective(600px) rotateY(${currentHeadRotY.toFixed(2)}deg) rotateX(${currentHeadRotX.toFixed(2)}deg)`;
    }

    requestAnimationFrame(renderRobotTracking);
  }

  requestAnimationFrame(renderRobotTracking);

  // --- 5. R4X Natural Eye Blinking System ---
  let isBlinking = false;
  function triggerRobotBlink() {
    if (isBlinking || !robotLeftPupil || !robotRightPupil) return;
    isBlinking = true;

    robotLeftPupil.style.transition = 'transform 0.08s ease-in-out';
    robotRightPupil.style.transition = 'transform 0.08s ease-in-out';

    robotLeftPupil.style.transform = `translate(${currentPupilX}px, ${currentPupilY}px) scaleY(0.1)`;
    robotRightPupil.style.transform = `translate(${currentPupilX}px, ${currentPupilY}px) scaleY(0.1)`;

    setTimeout(() => {
      robotLeftPupil.style.transform = `translate(${currentPupilX}px, ${currentPupilY}px) scaleY(1)`;
      robotRightPupil.style.transform = `translate(${currentPupilX}px, ${currentPupilY}px) scaleY(1)`;
      
      setTimeout(() => {
        isBlinking = false;
        robotLeftPupil.style.transition = '';
        robotRightPupil.style.transition = '';
      }, 100);
    }, 120);
  }

  setInterval(() => {
    if (Math.random() > 0.3) {
      triggerRobotBlink();
    }
  }, 4500);

  // --- 6. R4X Dialogue & Reaction System ---
  const robotPhrases = [
    "Exploring Ananya's verified repositories? Check out MatchWise and the Multi-Agent Assistant!",
    "Ananya specializes in Artificial Intelligence and Machine Learning with Python & Django.",
    "Did you know? All 6 showcased projects run on verified GitHub codebases!",
    "Systems optimal! Looking for an AI/ML developer? Connect with Ananya anytime.",
    "Bzzzt! Neural networks, NLP algorithms, and clean architecture are online!"
  ];

  let phraseIndex = 0;

  function speak(text, mood = null) {
    if (!speechTextEl) return;
    playFuturisticSound('robot');

    if (mood && moodTextEl) {
      moodTextEl.textContent = `STATE: ${mood}`;
    }

    speechTextEl.style.opacity = '0';
    setTimeout(() => {
      speechTextEl.textContent = `"${text}"`;
      speechTextEl.style.opacity = '1';
    }, 120);

    // Dynamic mouth reaction
    if (robotMouthCurve) {
      robotMouthCurve.setAttribute('d', 'M-22 0 Q0 16 22 0');
      setTimeout(() => {
        robotMouthCurve.setAttribute('d', 'M-22 0 Q0 12 22 0');
      }, 800);
    }
  }

  // Robot click reaction
  if (robotTarget) {
    robotTarget.addEventListener('click', () => {
      playFuturisticSound('chime');
      triggerRobotBlink();

      robotTarget.classList.add('robot-clicked');
      setTimeout(() => {
        robotTarget.classList.remove('robot-clicked');
      }, 500);

      const phrase = robotPhrases[phraseIndex % robotPhrases.length];
      phraseIndex++;
      speak(phrase, 'HAPPY');
    });

    // Keyboard accessibility for robot click
    robotTarget.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        robotTarget.click();
      }
    });
  }

  // Dialogue Quick Chips
  const dialogueChips = document.querySelectorAll('.dialogue-chip');
  dialogueChips.forEach(chip => {
    chip.addEventListener('click', () => {
      playFuturisticSound('blip');
      const action = chip.getAttribute('data-action');
      if (action === 'hello') {
        speak("Hello! Welcome to Ananya V. Hoode's portfolio. She is an AI & Machine Learning student passionate about building intelligent software!", "FRIENDLY");
      } else if (action === 'about') {
        speak("Ananya is a Computer Science Engineering student specializing in AI & ML. She loves Python, Django, and machine learning models!", "INFORMATIVE");
      } else if (action === 'project') {
        speak("Check out MatchWise AI Resume Analyzer and the Multi-Agent Research Assistant below in the project showcase!", "RECOMMENDING");
      } else if (action === 'scan') {
        speak("Diagnostics complete: 6 verified GitHub repositories active, 100% systems nominal, ready to collaborate!", "DIAGNOSTIC");
      }
    });
  });

  // Hero Buttons
  if (btnSayHello) {
    btnSayHello.addEventListener('click', () => {
      playFuturisticSound('chime');
      triggerRobotBlink();
      speak("Greetings from R4X! Glad you're here. Scroll down to discover Ananya's code repositories and technical skills!", "GREETING");
    });
  }

  // Change Mood Button
  const moods = [
    { name: 'OPTIMISTIC', color: '#55E6D1', phrase: "Status: Ready to learn, build, and innovate with state-of-the-art AI!" },
    { name: 'ANALYTICAL', color: '#60A5FA', phrase: "Analyzing data structures, gradient descent, and supervised ML models..." },
    { name: 'CYBERPUNK', color: '#A78BFA', phrase: "Matrix calibrated. Electric violet & cyber cyan protocol activated." },
    { name: 'TURBO', color: '#F43F5E', phrase: "Turbo mode engaged! High-efficiency Python & Django backend processing." }
  ];
  let currentMoodIdx = 0;

  if (btnChangeMood) {
    btnChangeMood.addEventListener('click', () => {
      currentMoodIdx = (currentMoodIdx + 1) % moods.length;
      const mood = moods[currentMoodIdx];
      playFuturisticSound('robot');
      speak(mood.phrase, mood.name);
      if (robotReactorCore) {
        robotReactorCore.style.fill = mood.color;
      }
    });
  }

  // --- 7. Project Category Filtering ---
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      playFuturisticSound('blip');
      const filter = btn.getAttribute('data-filter');

      filterBtns.forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      projectCards.forEach(card => {
        const categories = card.getAttribute('data-category') || '';
        if (filter === 'all' || categories.includes(filter)) {
          card.classList.remove('filtered-out');
          card.style.opacity = '1';
          card.style.transform = 'scale(1)';
        } else {
          card.classList.add('filtered-out');
        }
      });
    });
  });

  // --- 8. Interactive Terminal Window ---
  // Tab Switching
  terminalTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      playFuturisticSound('click');
      const targetTab = tab.getAttribute('data-tab');

      terminalTabs.forEach(t => t.classList.remove('active'));
      terminalPanes.forEach(p => p.classList.remove('active'));

      tab.classList.add('active');
      const activePane = document.getElementById(`pane-${targetTab}`);
      if (activePane) {
        activePane.classList.add('active');
      }
    });
  });

  // Interactive CLI commands
  function handleCliCommand(rawCmd) {
    const cmd = rawCmd.trim().toLowerCase();
    if (!cmd) return;

    playFuturisticSound('blip');

    const entry = document.createElement('div');
    entry.className = 't-line';

    let responseText = '';
    if (cmd === 'help') {
      responseText = `Available commands:\n  • skills       - List verified technical competencies\n  • projects     - Show all 6 GitHub projects\n  • contact      - Get Ananya's contact details\n  • r4x --say-hi - Trigger robot speech\n  • clear        - Clear command history\n  • about        - Developer background summary`;
    } else if (cmd === 'skills') {
      responseText = `Core Technical Stack:\n  - Languages: Python (Primary), JavaScript, HTML5, CSS3, SQL\n  - Frameworks: Django, Scikit-Learn, Pandas, NumPy, Matplotlib\n  - Domains: Machine Learning, NLP, Multi-Agent Systems, Full-Stack\n  - Tools: Git, GitHub, VS Code, GitHub Pages`;
    } else if (cmd === 'projects') {
      responseText = `Verified Repositories on GitHub:\n  1. Smart-Internship-Portal [Full Stack, Django]\n  2. matchwise-ai-resume-analyzer [AI, NLP Matching]\n  3. multi-agent-research-assistant [Multi-Agent Systems]\n  4. Iris-flower-classification [ML, Scikit-Learn]\n  5. House-price-predictor [ML, Regression]\n  6. S4AJIET_AIML_ANANYA_17 [Academic Lab Workbench]`;
    } else if (cmd === 'contact') {
      responseText = `Contact Information:\n  - GitHub: https://github.com/ananyahoode-glitch\n  - Email: ananyahoode@gmail.com\n  - Status: Open for AI/ML engineering opportunities`;
    } else if (cmd === 'about') {
      responseText = `Ananya V. Hoode is a Computer Science Engineering student specializing in Artificial Intelligence & Machine Learning. Focused on Python, Django, and practical intelligent applications.`;
    } else if (cmd === 'r4x --say-hi' || cmd === 'r4x') {
      responseText = `R4X: "Beep boop! Hello human user! Command received and executed successfully!"`;
      speak("Command executed in terminal! R4X systems running smoothly.", "ACTIVE");
    } else if (cmd === 'clear') {
      if (cliHistory) cliHistory.innerHTML = '';
      if (terminalCliInput) terminalCliInput.value = '';
      return;
    } else {
      responseText = `Command not recognized: '${cmd}'. Type 'help' for available commands.`;
    }

    entry.innerHTML = `
      <div><span class="t-prompt">ananya@r4x:~$</span> <span class="t-cmd">${escapeHtml(cmd)}</span></div>
      <div class="t-output" style="white-space: pre-wrap; margin-top: 0.25rem;">${escapeHtml(responseText)}</div>
    `;

    if (cliHistory) {
      cliHistory.appendChild(entry);
      cliHistory.scrollTop = cliHistory.scrollHeight;
    }

    if (terminalCliInput) {
      terminalCliInput.value = '';
    }
  }

  function escapeHtml(str) {
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  if (terminalCliInput) {
    terminalCliInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') {
        handleCliCommand(terminalCliInput.value);
      }
    });
  }

  cliChips.forEach(chip => {
    chip.addEventListener('click', () => {
      const cmd = chip.getAttribute('data-cmd');
      if (cmd) {
        handleCliCommand(cmd);
      }
    });
  });

  // --- 9. Navigation & Header Scroll State ---
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    // Header styling on scroll
    if (scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Back to top button visibility
    if (scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }

    // Active link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let currentSectionId = '';

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSectionId}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      playFuturisticSound('blip');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- 10. Mobile Drawer Menu ---
  if (mobileToggle && mobileDrawer && mobileClose) {
    mobileToggle.addEventListener('click', () => {
      playFuturisticSound('click');
      mobileDrawer.classList.add('open');
      mobileToggle.setAttribute('aria-expanded', 'true');
      mobileDrawer.setAttribute('aria-hidden', 'false');
    });

    function closeMobileMenu() {
      mobileDrawer.classList.remove('open');
      mobileToggle.setAttribute('aria-expanded', 'false');
      mobileDrawer.setAttribute('aria-hidden', 'true');
    }

    mobileClose.addEventListener('click', closeMobileMenu);
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileMenu();
      }
    });

    mobileNavLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mobileDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    });
  }

  // --- 11. Copy Email Helper ---
  if (btnCopyEmail && copyBtnLabel && emailAddress) {
    btnCopyEmail.addEventListener('click', () => {
      playFuturisticSound('chime');
      const email = emailAddress.textContent.trim();
      navigator.clipboard.writeText(email).then(() => {
        const originalText = copyBtnLabel.textContent;
        copyBtnLabel.textContent = 'Copied! ✓';
        btnCopyEmail.style.borderColor = 'var(--accent-emerald)';
        btnCopyEmail.style.color = 'var(--accent-emerald)';

        setTimeout(() => {
          copyBtnLabel.textContent = originalText;
          btnCopyEmail.style.borderColor = '';
          btnCopyEmail.style.color = '';
        }, 2500);
      }).catch(() => {
        // Fallback for browsers with strict clipboard restrictions
        copyBtnLabel.textContent = 'Email Ready';
      });
    });
  }

  // --- 12. Smooth Scroll for all internal hash links ---
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          playFuturisticSound('blip');
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  });

  // Log friendly system init message
  console.log(
    '%c[R4X BOT ENGINE]%c System Initialized :: Portfolio of Ananya V. Hoode (ananyahoode-glitch)',
    'background: #1E1B4B; color: #55E6D1; font-weight: bold; padding: 4px 8px; border-radius: 4px;',
    'color: #A78BFA; font-weight: 500;'
  );

})();
