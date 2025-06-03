// Music state management
const bgMusic = document.getElementById('bgMusic');
const hasPlayedBefore = localStorage.getItem('musicStarted') === 'true';
const musicTime = parseFloat(localStorage.getItem('musicTime') || '0');

// Function to save music state
function saveMusicState() {
    if (!bgMusic.paused) {
        localStorage.setItem('musicStarted', 'true');
        localStorage.setItem('musicTime', bgMusic.currentTime.toString());
    }
}

// Function to play music
function playMusic() {
    if (hasPlayedBefore) {
        bgMusic.currentTime = musicTime;
    }
    bgMusic.play().catch(error => console.log('Audio playback failed:', error));
    localStorage.setItem('musicStarted', 'true');
}

// Handle navigation
document.querySelectorAll('a').forEach(link => {
    if (link.href && link.href.startsWith(window.location.origin)) {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            saveMusicState();
            window.location.href = link.href;
        });
    }
});

// Save music position before page unload
window.addEventListener('beforeunload', saveMusicState);

// Initialize music playback
if (hasPlayedBefore) {
    window.addEventListener('DOMContentLoaded', playMusic);
} else {
    const playOnInteraction = () => {
        playMusic();
        document.removeEventListener('click', playOnInteraction);
        document.removeEventListener('keydown', playOnInteraction);
        document.removeEventListener('touchstart', playOnInteraction);
    };
    
    document.addEventListener('click', playOnInteraction);
    document.addEventListener('keydown', playOnInteraction);
    document.addEventListener('touchstart', playOnInteraction);
}

// Update music position periodically
setInterval(saveMusicState, 1000);
