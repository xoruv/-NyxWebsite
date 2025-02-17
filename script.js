const loadingText = document.getElementById('loading-text');
const mainContent = document.getElementById('main-content');
const proceedPage = document.getElementById('proceed-page');
const audio = document.getElementById('background-audio');

const messages = [
    "[ OK ] Executing Nyx Cipher Sequence...",
    "[ OK ] Engaging Quantum Encryption...",
    "[ OK ] Masking Digital Footprint...",
    "[ OK ] Activating Deep Web Nodes...",
    "[ FAILED ] System Breach Detected: Reality Compromised...",
];

let currentMessageIndex = 0;
let currentCharIndex = 0;

function typeMessage() {
    if (currentMessageIndex < messages.length) {
        if (currentCharIndex < messages[currentMessageIndex].length) {
            if (messages[currentMessageIndex].includes("[ FAILED ]")) {
                loadingText.innerHTML += `<span class="error">${messages[currentMessageIndex].charAt(currentCharIndex)}</span>`;
            } else {
                loadingText.innerHTML += messages[currentMessageIndex].charAt(currentCharIndex);
            }
            currentCharIndex++;
            setTimeout(typeMessage, 30); // Speed up the typing effect
        } else {
            // Move to the next message
            currentMessageIndex++;
            currentCharIndex = 0;
            loadingText.innerHTML += '<br>'; // Add a new line for the next message
            setTimeout(typeMessage, 300); // Reduce delay between messages
        }
    } else {
        // Fade out the loading screen and show the proceed page
        setTimeout(() => {
            document.getElementById('loading-screen').style.opacity = 0;
            setTimeout(() => {
                document.getElementById('loading-screen').style.display = 'none';
                proceedPage.style.display = 'flex';
                proceedPage.style.opacity = 1;
            }, 1000); // Adjust the fade-out duration here
        }, 1000);
    }
}

// Start the typewriter effect
typeMessage();

document.querySelector('.proceed-container h1').addEventListener('click', () => {
    proceedPage.style.opacity = 0;
    setTimeout(() => {
        proceedPage.style.display = 'none';
        mainContent.style.display = 'block';
        audio.play();
    }, 1000); // Adjust the fade-out duration here
});
