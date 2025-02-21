// Loading Screen Animation
document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    const container = document.querySelector('.container');
    const percentage = document.querySelector('.percentage');
    const decryptText = document.querySelector('.decrypt-text');
    const chromeHeartsText = document.querySelector('.chrome-hearts-text');
    
    // Ensure container is hidden initially
    container.style.opacity = '0';
    container.style.transform = 'translateY(20px)';
    
    let progress = 0;
    const progressInterval = setInterval(() => {
        progress += 1;
        percentage.textContent = `${progress}%`;
        
        // Update decrypt text with typing effect
        if (progress === 30) {
            typeText('VERIFYING SECURITY PROTOCOLS...');
        } else if (progress === 60) {
            typeText('ESTABLISHING SECURE CONNECTION...');
        } else if (progress === 90) {
            typeText('FINALIZING ACCESS...');
        } else if (progress === 100) {
            typeText('DECRYPTION COMPLETE');
            chromeHeartsText.style.animation = 'textGlitch 0.5s ease';
        }
        
        if (progress >= 100) {
            clearInterval(progressInterval);
            completeLoading();
        }
    }, 30);
    
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
        setTimeout(() => {
            loadingScreen.classList.add('complete');
            
            // Create and play audio
            const audio = new Audio('jdhn5y.mp3');
            audio.play().catch(error => {
                console.log('Audio playback failed:', error);
            });
            
            setTimeout(() => {
                // Fade out loading screen
                loadingScreen.style.opacity = '0';
                
                // Show and animate in the main container
                container.style.display = 'block';
                container.style.opacity = '1';
                container.style.transform = 'translateY(0)';
                
                // Remove loading screen after fade
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 800);
            }, 800);
        }, 500);
    }

    createMatrixRain();

    if (document.querySelector('.docs-loading')) {
        setTimeout(() => {
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
    const modal = document.getElementById('loginModal');
    if (event.target == modal) {
        hideLoginModal();
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
