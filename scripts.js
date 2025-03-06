// Add this at the beginning of your scripts.js file
document.addEventListener('keydown', function(e) {
    // Detect Control + U
    if (e.ctrlKey && e.key === 'u') {
        e.preventDefault();
        showSourceBlockedModal();
        return false;
    }
    // Also block Control + Shift + I and Control + Shift + J
    if (e.ctrlKey && e.shiftKey && (e.key === 'I' || e.key === 'i' || e.key === 'J' || e.key === 'j')) {
        e.preventDefault();
        showSourceBlockedModal();
        return false;
    }
    // Block F12
    if (e.key === 'F12') {
        e.preventDefault();
        showSourceBlockedModal();
        return false;
    }
});

// Disable right-click
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    showSourceBlockedModal();
    return false;
});

// Add this new modal function
function showSourceBlockedModal() {
    const modal = document.getElementById('sourceBlockedModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    });
}

function hideSourceBlockedModal() {
    const modal = document.getElementById('sourceBlockedModal');
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    document.body.style.overflow = '';
    setTimeout(() => modal.style.display = 'none', 300);
}

// Loading Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const container = document.querySelector('.container');
    const percentage = document.querySelector('.percentage');
    const decryptText = document.querySelector('.decrypt-text');
    const chromeHeartsText = document.querySelector('.chrome-hearts-text');
    
    // Create audio element early and configure it
    const audio = new Audio('jdhn5y.mp3');
    audio.volume = 0.5;
    audio.preload = 'auto';
    audio.muted = true; // Start muted to help with autoplay
    
    // Function to handle audio playback
    async function playAudio() {
        try {
            audio.muted = false; // Unmute before playing
            await audio.play();
            console.log('Audio playing successfully');
        } catch (error) {
            console.log('Autoplay failed:', error);
            // Add click handler as fallback
            document.addEventListener('click', () => {
                audio.muted = false;
                audio.play().catch(e => console.log('Play failed:', e));
            }, { once: true });
        }
    }

    // Try to play audio at multiple points
    setTimeout(async () => {
        await playAudio();
    }, 100); // Try immediately after load

    setTimeout(async () => {
        await playAudio();
    }, 3000); // Try after 3 seconds

    setTimeout(async () => {
        await playAudio();
    }, 6000); // Try after 6 seconds

    // Rest of your loading code...
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    let progress = 0;
    // Adjust interval to complete in ~3 seconds (3000ms / 100 steps = 30ms per step)
    const progressInterval = setInterval(() => {
        progress += 1;
        percentage.textContent = `${progress}%`;
        
        if (progress === 30) {
            typeText('VERIFYING SECURITY PROTOCOLS...');
        } else if (progress === 60) {
            typeText('ESTABLISHING SECURE CONNECTION...');
        } else if (progress === 90) {
            typeText('FINALIZING ACCESS...');
        } else if (progress === 100) {
            typeText('DECRYPTION COMPLETE');
            chromeHeartsText.style.animation = 'textGlitch 0.5s ease';
            setTimeout(completeLoading, 500); // Add delay before completion
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
        }
    }, 30); // Reduced from 50ms to 30ms per step
    
    function typeText(text) {
        let i = 0;
        decryptText.textContent = '';
        const typing = setInterval(() => {
            if (i < text.length) {
                decryptText.textContent += text.charAt(i);
                i++;
            } else {
                clearInterval(typing);
            }
        }, 50);
    }
    
    function completeLoading() {
        loadingScreen.classList.add('complete');
        
        setTimeout(() => {
            loadingScreen.style.opacity = '0';
            container.style.display = 'flex';
            container.style.opacity = '1';
            container.style.transform = 'translateY(0)';
            
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 800);
        }, 800);
    }

    createMatrixRain();

    if (document.querySelector('.docs-loading')) {
        setTimeout(() => {
            playAudio();
            document.querySelector('.docs-loading').style.opacity = '0';
            document.querySelector('.docs-container').classList.add('loaded');
            setTimeout(() => {
                document.querySelector('.docs-loading').style.display = 'none';
            }, 800);
        }, 2000);
    }
});

// Enhanced modal interactions
function showLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    });
}

function hideLoginModal() {
    const modal = document.getElementById('loginModal');
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    document.body.style.overflow = '';
    setTimeout(() => modal.style.display = 'none', 300);
}

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Close modal when clicking outside
window.onclick = function(event) {
    const loginModal = document.getElementById('loginModal');
    const comingSoonModal = document.getElementById('comingSoonModal');
    const accessBlockedModal = document.getElementById('accessBlockedModal');
    const sourceBlockedModal = document.getElementById('sourceBlockedModal');
    
    if (event.target == loginModal) {
        hideLoginModal();
    }
    if (event.target == comingSoonModal) {
        hideComingSoonModal();
    }
    if (event.target == accessBlockedModal) {
        hideAccessBlockedModal();
    }
    if (event.target == sourceBlockedModal) {
        hideSourceBlockedModal();
    }
}

// Add Matrix Rain Effect
function createMatrixRain() {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.className = 'matrix-rain';
    document.querySelector('.loading-screen').appendChild(canvas);

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*';
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];

    for (let i = 0; i < columns; i++) {
        drops[i] = 1;
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < drops.length; i++) {
            const text = characters[Math.floor(Math.random() * characters.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            drops[i]++;
        }
    }

    setInterval(draw, 33);
}

// Add these functions after your existing modal functions
function showComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    });
}

function hideComingSoonModal() {
    const modal = document.getElementById('comingSoonModal');
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    document.body.style.overflow = '';
    setTimeout(() => modal.style.display = 'none', 300);
}

// Add these functions to handle the login and access blocked modal
function handleLogin(event) {
    event.preventDefault();
    hideLoginModal();
    showAccessBlockedModal();
}

function showAccessBlockedModal() {
    const modal = document.getElementById('accessBlockedModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
        modal.style.opacity = '1';
        modal.style.transform = 'scale(1)';
    });
}

function hideAccessBlockedModal() {
    const modal = document.getElementById('accessBlockedModal');
    modal.style.opacity = '0';
    modal.style.transform = 'scale(0.95)';
    document.body.style.overflow = '';
    setTimeout(() => modal.style.display = 'none', 300);
}

// Add this at the beginning of your scripts.js file, after the existing event listeners
function updateTitle() {
    const titles = [
        'NYX | Valentine',
        'NYX | spid3r',
        'NYX | watchdogs'
    ];
    let currentTitleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100; // Base typing speed
    let deletingSpeed = 50; // Faster deleting speed
    let pauseTime = 2000; // Time to pause at full title

    function type() {
        const currentTitle = titles[currentTitleIndex];
        
        if (isDeleting) {
            // Only delete after "NYX | "
            if (currentCharIndex > 6) {
                document.title = currentTitle.substring(0, currentCharIndex - 1);
                currentCharIndex--;
                setTimeout(type, deletingSpeed);
            } else {
                isDeleting = false;
                currentTitleIndex = (currentTitleIndex + 1) % titles.length;
                setTimeout(type, typingSpeed);
            }
        } else {
            document.title = currentTitle.substring(0, currentCharIndex + 1);
            currentCharIndex++;

            if (currentCharIndex === currentTitle.length) {
                isDeleting = true;
                setTimeout(type, pauseTime); // Pause before deleting
            } else {
                setTimeout(type, typingSpeed);
            }
        }
    }

    type();
}

// Start the title animation when the page loads
document.addEventListener('DOMContentLoaded', updateTitle); 
