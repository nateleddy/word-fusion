// --- WORD POOL SYSTEM ---
// Curated list of high-quality, recognisable compound words/word pairs
const PHRASE_POOL = [
    ["dmliZQ==", "Y29kZQ=="],         // vibe code
    ["c3dlYXQ=", "c2hvcA=="],         // sweat shop
    ["Z3JlZW4=", "aG91c2U="],         // green house
    ["ZmlyZQ==", "Zmx5"],             // fire fly
    ["aG9uZXk=", "Y29tYg=="],         // honey comb
    ["ZHJhZ29u", "Zmx5"],             // dragon fly
    ["YnV0dGVy", "Zmx5"],             // butter fly
    ["d2F0ZXI=", "bWVsb24="],         // water melon
    ["c3Vu", "Zmxvd2Vy"],             // sun flower
    ["c3Rhcg==", "ZmlzaA=="],         // star fish
    ["cmFpbg==", "Ym93"],             // rain bow
    ["amVsbHk=", "ZmlzaA=="],         // jelly fish
    ["cGluZQ==", "YXBwbGU="],         // pine apple
    ["c25vdw==", "Zmxha2U="],         // snow flake
    ["c2FuZA==", "cGFwZXI="],         // sand paper
    ["bW9vbg==", "bGlnaHQ="],         // moon light
    ["dG9vdGg=", "YnJ1c2g="],         // tooth brush
    ["c2thdGU=", "Ym9hcmQ="],         // skate board
    ["Zm9vdA==", "YmFsbA=="],         // foot ball
    ["ZWFydGg=", "cXVha2U="],         // earth quake
    ["Ym9vaw==", "c2hlbGY="],         // book shelf
    ["a2V5", "Ym9hcmQ="],             // key board
    ["bGlmZQ==", "Z3VhcmQ="],         // life guard
    ["Y3Vw", "Y2FrZQ=="],             // cup cake
    ["Z29sZA==", "ZmlzaA=="],         // gold fish
    ["cGFu", "Y2FrZQ=="],             // pan cake
    ["c3RyYXc=", "YmVycnk="],         // straw berry
    ["bm90ZQ==", "Ym9vaw=="],         // note book
    ["bGlnaHQ=", "aG91c2U="],         // light house
    ["d2hlZWw=", "Y2hhaXI="],         // wheel chair
    ["c3VwZXI=", "bWFu"],             // super man
    ["cmFpbg==", "Y29hdA=="],         // rain coat
    ["d2luZA==", "bWlsbA=="],         // wind mill
    ["dGh1bmRlcg==", "c3Rvcm0="],       // thunder storm
    ["ZWNobw==", "Y2hhbWJlcg=="],       // echo chamber
    ["Y2FyYm9u", "Zm9vdHByaW50"],     // carbon footprint
    ["c2lsdmVy", "bGluaW5n"],         // silver lining
    ["Z3Jhdml0eQ==", "cHVsbA=="],       // gravity pull
    ["bWluZA==", "c2V0"],             // mind set
    ["cXVhbnR1bQ==", "bGVhcA=="]        // quantum leap
];

// --- SOUND SYNTHESIZER (WEB AUDIO API) ---
const SoundFX = {
    ctx: null,
    muted: localStorage.getItem('wordfusion_muted') === 'true',

    init() {
        if (!this.ctx) {
            this.ctx = new (window.AudioContext || window.webkitAudioContext)();
        }
    },

    toggleMute() {
        this.muted = !this.muted;
        localStorage.setItem('wordfusion_muted', this.muted);
        return this.muted;
    },

    playCorrect() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const playTone = (freq, time, duration) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(freq, time);
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(0.15, time + 0.04);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            
            osc.start(time);
            osc.stop(time + duration);
        };
        
        playTone(523.25, now, 0.3);      // C5
        playTone(659.25, now + 0.08, 0.3); // E5
        playTone(783.99, now + 0.16, 0.3); // G5
        playTone(1046.50, now + 0.24, 0.5); // C6
    },

    playWrong() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        const filter = this.ctx.createBiquadFilter();
        
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, now);
        osc.frequency.linearRampToValueAtTime(80, now + 0.25);
        
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(400, now);
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.25);
        
        osc.connect(filter);
        filter.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.25);
    },

    playHint() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(587.33, now); // D5
        osc.frequency.setValueAtTime(698.46, now + 0.04); // F5
        
        gain.gain.setValueAtTime(0, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        
        osc.start(now);
        osc.stop(now + 0.15);
    },

    playWinRound() {
        if (this.muted) return;
        this.init();
        const now = this.ctx.currentTime;
        
        const playSynthNode = (freq, time, duration, vol = 0.05) => {
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(freq, time);
            
            gain.gain.setValueAtTime(0, time);
            gain.gain.linearRampToValueAtTime(vol, time + 0.08);
            gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);
            
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(time);
            osc.stop(time + duration);
        };
        
        const tempo = 0.1;
        const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50];
        notes.forEach((f, i) => {
            playSynthNode(f, now + (i * tempo), 0.7, 0.04);
        });
    }
};

// --- GAME STATE ---
const Game = {
    // Current active round details
    roundNumber: 1,
    puzzleIndex: 0, // 0 to 4
    roundScore: 0,
    roundPuzzles: [], // List of 5 puzzles selected for this round
    
    // Active puzzle details
    clueWord: "",
    targetWord: "",
    clueFirst: true, // true: Clue + Target, false: Target + Clue
    puzzleMultiplier: 5, // Starts at 5, drops on fail/hint
    revealedIndices: [], // Boolean array indicating revealed indices
    transitioning: false,
    
    // Performance records for this round
    roundResults: [], // Objects: { clue, target, clueFirst, solved, score, hintsUsed }

    // Init & Boot
    init() {
        this.loadSettings();
        this.setupEventListeners();
        this.startNewRound(true);
        
        // Show tutorial on first boot
        if (!localStorage.getItem('wordfusion_visited')) {
            document.getElementById('modal-how').classList.remove('hidden');
            localStorage.setItem('wordfusion_visited', 'true');
        }
    },

    loadSettings() {
        // Audio Toggle Setup
        const audioBtn = document.getElementById('btn-audio');
        this.updateAudioIcon(SoundFX.muted);

        // Create initial stats if they don't exist
        if (!localStorage.getItem('wf_rounds_completed')) {
            localStorage.setItem('wf_rounds_completed', '0');
            localStorage.setItem('wf_puzzles_solved', '0');
            localStorage.setItem('wf_high_score', '0');
            localStorage.setItem('wf_perfect_solves', '0');
        }
    },

    updateAudioIcon(isMuted) {
        const wave1 = document.getElementById('volume-wave-1');
        const wave2 = document.getElementById('volume-wave-2');
        if (isMuted) {
            wave1.style.display = 'none';
            wave2.style.display = 'none';
            document.getElementById('btn-audio').classList.add('muted');
        } else {
            wave1.style.display = 'block';
            wave2.style.display = 'block';
            document.getElementById('btn-audio').classList.remove('muted');
        }
    },

    // Choose 5 random pairs from the pool, making sure to randomize clue/target sides
    startNewRound(isFirstBoot = false) {
        if (!isFirstBoot) {
            this.roundNumber++;
        }
        
        this.puzzleIndex = 0;
        this.roundScore = 0;
        this.roundResults = [];
        this.roundPuzzles = [];
        
        // Shuffle and pick 5 pairs
        const shuffled = [...PHRASE_POOL].sort(() => 0.5 - Math.random());
        const selectedPairs = shuffled.slice(0, 5);
        
        selectedPairs.forEach(encodedPair => {
            const pair = [atob(encodedPair[0]), atob(encodedPair[1])];
            const clueFirst = Math.random() > 0.5;
            this.roundPuzzles.push({
                pair: pair,
                clueFirst: clueFirst,
                clue: clueFirst ? pair[0] : pair[1],
                target: clueFirst ? pair[1] : pair[0]
            });
        });

        // Reset Score UI
        document.getElementById('current-score').textContent = '0';
        document.getElementById('round-num').textContent = this.roundNumber;

        // Render progress bar placeholders
        this.renderProgressTracker();
        
        // Load the first puzzle
        this.loadPuzzle();
    },

    renderProgressTracker() {
        const track = document.getElementById('progress-track');
        track.innerHTML = '';
        for (let i = 0; i < 5; i++) {
            const dot = document.createElement('div');
            dot.className = 'progress-dot';
            if (i === 0) dot.classList.add('active');
            track.appendChild(dot);
        }
    },

    updateProgressTrackerDot(index, state) {
        const dots = document.querySelectorAll('.progress-dot');
        if (dots[index]) {
            dots[index].className = `progress-dot ${state}`;
        }
    },

    loadPuzzle() {
        this.transitioning = false;
        
        const puzzle = this.roundPuzzles[this.puzzleIndex];
        this.clueWord = puzzle.clue;
        this.targetWord = puzzle.target;
        this.clueFirst = puzzle.clueFirst;
        this.puzzleMultiplier = 5;
        this.revealedIndices = new Array(this.targetWord.length).fill(false);

        // Update indicators
        document.getElementById('puzzle-index').textContent = this.puzzleIndex + 1;
        this.updateMultiplierUI();

        // Setup layouts
        const clueCard = document.getElementById('clue-card-el');
        const targetCard = document.getElementById('target-card-el');
        
        clueCard.className = 'word-card clue-card';
        targetCard.className = 'word-card target-card';

        // Re-arrange DOM cards based on order of phrase
        const container = document.querySelector('.word-card-container');
        const bridge = document.querySelector('.connector-bridge');
        
        container.innerHTML = '';
        if (this.clueFirst) {
            container.appendChild(clueCard);
            container.appendChild(bridge);
            container.appendChild(targetCard);
            
            // Highlight styling direction
            clueCard.style.borderLeft = "4px solid var(--neon-cyan)";
            clueCard.style.borderRight = "none";
            targetCard.style.borderRight = "4px solid var(--neon-purple)";
            targetCard.style.borderLeft = "none";
        } else {
            container.appendChild(targetCard);
            container.appendChild(bridge);
            container.appendChild(clueCard);
            
            clueCard.style.borderRight = "4px solid var(--neon-cyan)";
            clueCard.style.borderLeft = "none";
            targetCard.style.borderLeft = "4px solid var(--neon-purple)";
            targetCard.style.borderRight = "none";
        }

        // Set Texts
        document.getElementById('clue-word-display').textContent = this.clueWord;
        this.renderTargetSlots();

        // Clear input and focus
        const input = document.getElementById('guess-input');
        input.value = '';
        input.disabled = false;
        input.focus();
        
        document.getElementById('btn-submit').disabled = false;
        document.getElementById('btn-hint').disabled = false;
        document.getElementById('btn-skip').disabled = false;

        // Highlight active dot
        const dots = document.querySelectorAll('.progress-dot');
        dots.forEach((dot, idx) => {
            if (idx === this.puzzleIndex) {
                dot.classList.add('active');
            } else if (dot.classList.contains('active')) {
                dot.classList.remove('active');
            }
        });
    },

    renderTargetSlots() {
        const display = document.getElementById('target-word-display');
        display.innerHTML = '';
        
        for (let i = 0; i < this.targetWord.length; i++) {
            const slot = document.createElement('div');
            slot.className = 'letter-slot';
            
            if (this.revealedIndices[i]) {
                slot.textContent = this.targetWord[i];
                slot.classList.add('revealed');
            } else {
                slot.textContent = '';
            }
            display.appendChild(slot);
        }
    },

    updateMultiplierUI() {
        document.getElementById('multiplier-value').textContent = this.puzzleMultiplier;
        const fill = document.getElementById('multiplier-fill');
        const percentage = (this.puzzleMultiplier / 5) * 100;
        fill.style.width = `${percentage}%`;
        
        // Colors mapping based on multiplier
        if (this.puzzleMultiplier === 5) {
            fill.style.background = 'linear-gradient(90deg, var(--neon-purple), var(--neon-cyan))';
        } else if (this.puzzleMultiplier >= 3) {
            fill.style.background = 'var(--neon-orange)';
        } else {
            fill.style.background = 'var(--neon-red)';
        }
    },

    revealLetter() {
        if (this.transitioning) return;

        // Find all indexes not yet revealed
        const unrevealed = [];
        for (let i = 0; i < this.targetWord.length; i++) {
            if (!this.revealedIndices[i]) unrevealed.push(i);
        }

        if (unrevealed.length > 0) {
            // Reveal the first unrevealed letter (left-to-right is clean and logical)
            const indexToReveal = unrevealed[0];
            this.revealedIndices[indexToReveal] = true;
            this.renderTargetSlots();
            SoundFX.playHint();

            // Decrease Multiplier
            this.puzzleMultiplier = Math.max(0, this.puzzleMultiplier - 1);
            this.updateMultiplierUI();

            // If the whole word is now visible, the user gets 0 points and moves on
            const fullyRevealed = this.revealedIndices.every(r => r === true);
            if (fullyRevealed) {
                this.handlePuzzleFailure(true); // Automatically failed
            }
        }
    },

    submitGuess() {
        if (this.transitioning) return;

        const input = document.getElementById('guess-input');
        const guess = input.value.trim().toLowerCase();

        if (!guess) return;

        if (guess === this.targetWord.toLowerCase()) {
            this.handlePuzzleSuccess();
        } else {
            this.handleWrongGuess();
        }
    },

    handleWrongGuess() {
        SoundFX.playWrong();
        this.showToast("Incorrect Guess!", "error");
        
        // Shake animation
        const wrapper = document.querySelector('.input-wrapper');
        wrapper.classList.add('shake-input');
        setTimeout(() => wrapper.classList.remove('shake-input'), 400);

        // Clear input field but retain focus
        const input = document.getElementById('guess-input');
        input.value = '';
        input.focus();

        // Wrong guess automatically triggers a letter reveal
        this.revealLetter();
    },

    handlePuzzleSuccess() {
        this.transitioning = true;
        SoundFX.playCorrect();
        
        // Lock controls
        this.lockControls();

        // Award points
        const pointsEarned = this.puzzleMultiplier;
        this.roundScore += pointsEarned;
        document.getElementById('current-score').textContent = this.roundScore;

        // Reveal everything
        this.revealedIndices.fill(true);
        this.renderTargetSlots();

        // Success Styling & Flip animation
        const targetCard = document.getElementById('target-card-el');
        targetCard.classList.add('solved');

        // Map state to dot colors
        let dotState = "failed";
        if (pointsEarned === 5) dotState = "perfect";
        else if (pointsEarned > 0) dotState = "assisted";

        this.updateProgressTrackerDot(this.puzzleIndex, dotState);
        this.showToast(`Perfect Fusion! +${pointsEarned} pts`, "success");

        // Save round result
        this.roundResults.push({
            clue: this.clueWord,
            target: this.targetWord,
            clueFirst: this.clueFirst,
            solved: true,
            score: pointsEarned,
            hintsUsed: 5 - pointsEarned
        });

        // Move to next puzzle after brief flip animation delay
        setTimeout(() => this.moveToNext(), 1500);
    },

    handlePuzzleFailure(isFullReveal = false) {
        this.transitioning = true;
        SoundFX.playWrong();
        
        this.lockControls();
        this.puzzleMultiplier = 0;
        this.updateMultiplierUI();

        // Reveal full solution
        this.revealedIndices.fill(true);
        this.renderTargetSlots();

        // Failed style
        const targetCard = document.getElementById('target-card-el');
        targetCard.classList.add('failed-state');

        this.updateProgressTrackerDot(this.puzzleIndex, "failed");
        
        const msg = isFullReveal ? "Too many hints! Answer revealed." : "Puzzle Skipped!";
        this.showToast(msg, "error");

        this.roundResults.push({
            clue: this.clueWord,
            target: this.targetWord,
            clueFirst: this.clueFirst,
            solved: false,
            score: 0,
            hintsUsed: 5
        });

        setTimeout(() => this.moveToNext(), 1800);
    },

    lockControls() {
        document.getElementById('guess-input').disabled = true;
        document.getElementById('btn-submit').disabled = true;
        document.getElementById('btn-hint').disabled = true;
        document.getElementById('btn-skip').disabled = true;
    },

    moveToNext() {
        this.puzzleIndex++;
        if (this.puzzleIndex < 5) {
            this.loadPuzzle();
        } else {
            this.completeRound();
        }
    },

    completeRound() {
        SoundFX.playWinRound();
        this.saveStatsToStorage();
        this.showRoundSummary();
    },

    saveStatsToStorage() {
        // Fetch existing
        let rounds = parseInt(localStorage.getItem('wf_rounds_completed') || '0');
        let puzzles = parseInt(localStorage.getItem('wf_puzzles_solved') || '0');
        let high = parseInt(localStorage.getItem('wf_high_score') || '0');
        let perfects = parseInt(localStorage.getItem('wf_perfect_solves') || '0');

        // Incrementals from this round
        rounds++;
        
        let perfectsThisRound = 0;
        let solvedThisRound = 0;
        
        this.roundResults.forEach(res => {
            if (res.solved) {
                solvedThisRound++;
                puzzles++;
                if (res.score === 5) {
                    perfectsThisRound++;
                    perfects++;
                }
            }
        });

        if (this.roundScore > high) {
            high = this.roundScore;
        }

        // Commit to LocalStorage
        localStorage.setItem('wf_rounds_completed', rounds.toString());
        localStorage.setItem('wf_puzzles_solved', puzzles.toString());
        localStorage.setItem('wf_high_score', high.toString());
        localStorage.setItem('wf_perfect_solves', perfects.toString());
    },

    showRoundSummary() {
        document.getElementById('summary-round-num').textContent = this.roundNumber;
        document.getElementById('summary-score-total').textContent = this.roundScore;

        // Custom grade description based on performance
        const gradeEl = document.getElementById('summary-grade');
        if (this.roundScore === 25) {
            gradeEl.textContent = "Absolute Perfection! Legendary Fusion Mind!";
            gradeEl.style.color = "var(--neon-green)";
        } else if (this.roundScore >= 20) {
            gradeEl.textContent = "Spectacular vocabulary skill! High-tier bonding.";
            gradeEl.style.color = "var(--neon-cyan)";
        } else if (this.roundScore >= 12) {
            gradeEl.textContent = "Well played! Solid word merging capabilities.";
            gradeEl.style.color = "var(--neon-purple)";
        } else {
            gradeEl.textContent = "A respectable run! Keep practicing your links.";
            gradeEl.style.color = "var(--text-secondary)";
        }

        // Populate emoji performance grid
        const emojiTrack = document.getElementById('summary-emoji-track');
        emojiTrack.innerHTML = '';
        
        this.roundResults.forEach(res => {
            const block = document.createElement('div');
            
            let typeClass = "e-fail";
            let sym = "✖";
            
            if (res.solved) {
                if (res.score === 5) { typeClass = "e-perfect"; sym = "5★"; }
                else if (res.score === 4) { typeClass = "e-high"; sym = "4★"; }
                else if (res.score === 3) { typeClass = "e-medium"; sym = "3★"; }
                else if (res.score === 2) { typeClass = "e-low"; sym = "2★"; }
                else { typeClass = "e-zero"; sym = "1★"; }
            }
            
            block.className = `emoji-block ${typeClass}`;
            block.textContent = sym;
            emojiTrack.appendChild(block);
        });

        // Populate breakdown list
        const listEl = document.getElementById('summary-breakdown-list');
        listEl.innerHTML = '';

        this.roundResults.forEach(res => {
            const item = document.createElement('div');
            item.className = 'breakdown-item';

            const pairString = res.clueFirst 
                ? `${res.clue.toUpperCase()} + <span class="breakdown-target">${res.target.toUpperCase()}</span>`
                : `<span class="breakdown-target">${res.target.toUpperCase()}</span> + ${res.clue.toUpperCase()}`;

            let scoreStyle = 'p-fail';
            if (res.solved) {
                if (res.score === 5) scoreStyle = 'p-perfect';
                else if (res.score === 4) scoreStyle = 'p-high';
                else if (res.score === 3) scoreStyle = 'p-med';
                else if (res.score === 2) scoreStyle = 'p-low';
                else scoreStyle = 'p-zero';
            }

            item.innerHTML = `
                <div class="breakdown-words">${pairString}</div>
                <div class="breakdown-pts ${scoreStyle}">${res.solved ? `+${res.score} pts` : 'Failed'}</div>
            `;
            listEl.appendChild(item);
        });

        // Show Modal
        document.getElementById('modal-summary').classList.remove('hidden');
    },

    copyScoreGrid() {
        let blockString = "";
        this.roundResults.forEach(res => {
            if (!res.solved) blockString += "🟥";
            else if (res.score === 5) blockString += "🟩";
            else if (res.score === 4) blockString += "🟦";
            else if (res.score === 3) blockString += "🟪";
            else if (res.score === 2) blockString += "🟧";
            else blockString += "🟨";
        });

        const shareText = `WordFusion // Round ${this.roundNumber}\nScore: ${this.roundScore}/25\nMatrix: ${blockString}\n\nCan you beat my fusion speed? Play now! ⚡`;
        
        navigator.clipboard.writeText(shareText).then(() => {
            this.showToast("Performance grid copied to clipboard!", "success");
        }).catch(() => {
            this.showToast("Could not copy clipboard automatically.", "error");
        });
    },

    showToast(message, type = "info") {
        const container = document.getElementById('toast-container');
        const toast = document.createElement('div');
        
        let typeClass = "t-info";
        let icon = "💡";
        
        if (type === "success") { typeClass = "t-success"; icon = "✨"; }
        else if (type === "error") { typeClass = "t-error"; icon = "⚡"; }
        
        toast.className = `toast ${typeClass}`;
        toast.innerHTML = `
            <span class="toast-icon">${icon}</span>
            <span class="toast-msg">${message}</span>
        `;
        
        container.appendChild(toast);
        
        // Remove after slide-out/fade-out duration
        setTimeout(() => {
            toast.style.animation = "toastSlideIn 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) reverse forwards";
            setTimeout(() => toast.remove(), 350);
        }, 2200);
    },

    showLifetimeStats() {
        document.getElementById('stats-rounds').textContent = localStorage.getItem('wf_rounds_completed') || '0';
        document.getElementById('stats-puzzles').textContent = localStorage.getItem('wf_puzzles_solved') || '0';
        document.getElementById('stats-high').textContent = localStorage.getItem('wf_high_score') || '0';
        document.getElementById('stats-perfects').textContent = localStorage.getItem('wf_perfect_solves') || '0';
        
        document.getElementById('modal-stats').classList.remove('hidden');
    },

    resetLifetimeStats() {
        if (confirm("Are you sure you want to permanently clear all your game achievements?")) {
            localStorage.setItem('wf_rounds_completed', '0');
            localStorage.setItem('wf_puzzles_solved', '0');
            localStorage.setItem('wf_high_score', '0');
            localStorage.setItem('wf_perfect_solves', '0');
            
            // Reload into fields
            this.showLifetimeStats();
            this.showToast("Lifetime stats wiped successfully.", "info");
        }
    },

    // UI Event Listeners
    setupEventListeners() {
        // Audio Button Control
        const audioBtn = document.getElementById('btn-audio');
        audioBtn.addEventListener('click', () => {
            const isMuted = SoundFX.toggleMute();
            this.updateAudioIcon(isMuted);
            this.showToast(isMuted ? "Sound Fx Muted" : "Sound Fx Enabled", "info");
        });

        // Info Button Modals
        const howBtn = document.getElementById('btn-how');
        const statsBtn = document.getElementById('btn-stats');
        
        const modalHow = document.getElementById('modal-how');
        const modalStats = document.getElementById('modal-stats');
        const modalSummary = document.getElementById('modal-summary');

        howBtn.addEventListener('click', () => modalHow.classList.remove('hidden'));
        statsBtn.addEventListener('click', () => this.showLifetimeStats());

        // Close Triggers
        document.getElementById('btn-how-close').addEventListener('click', () => modalHow.classList.add('hidden'));
        document.getElementById('btn-how-start').addEventListener('click', () => modalHow.classList.add('hidden'));
        
        document.getElementById('btn-stats-close').addEventListener('click', () => modalStats.classList.add('hidden'));
        document.getElementById('btn-stats-ok').addEventListener('click', () => modalStats.classList.add('hidden'));
        document.getElementById('btn-reset-stats').addEventListener('click', () => this.resetLifetimeStats());

        // Guess Submission
        const form = document.getElementById('guess-form');
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitGuess();
        });

        // Hint Letter Action
        document.getElementById('btn-hint').addEventListener('click', () => {
            this.revealLetter();
        });

        // Skip / Reveal Solution Action
        document.getElementById('btn-skip').addEventListener('click', () => {
            this.handlePuzzleFailure(false);
        });

        // Summary modal buttons
        document.getElementById('btn-share').addEventListener('click', () => {
            this.copyScoreGrid();
        });

        document.getElementById('btn-next-round').addEventListener('click', () => {
            modalSummary.classList.add('hidden');
            this.startNewRound(false);
        });

        // Escape keys close open modals
        window.addEventListener('keydown', (e) => {
            if (e.key === "Escape") {
                modalHow.classList.add('hidden');
                modalStats.classList.add('hidden');
            }
        });
    }
};

// --- INITIALIZE GAME ON DOM CONTENT LOADED ---
document.addEventListener('DOMContentLoaded', () => {
    Game.init();
});
