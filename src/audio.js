// --- SOUND SYNTHESIZER MODULE (WEB AUDIO API) ---
export const SoundFX = {
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
