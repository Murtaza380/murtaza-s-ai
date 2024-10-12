let audioContext = new (window.AudioContext || window.webkitAudioContext)();
let mediaRecorder;
let audioChunks = [];
let isDemo = true; // Start in demo mode
const demoDuration = 5 * 60 * 1000; // 5 minutes in milliseconds
let demoTimeout;

// Function to handle song creation with lyrics and style
document.getElementById("lyrics-style-form").onsubmit = function (event) {
    event.preventDefault();
    if (isDemo) {
        alert("You are in demo mode. Please login for full access.");
        return;
    }
    const lyrics = event.target[0].value;
    const style = event.target[1].value;
    // Logic to create a song using the provided lyrics and style
    document.getElementById("song-output").innerText = `Generated Song:\nLyrics: ${lyrics}\nStyle: ${style}`;
};

// Function to start recording audio for remixing
function startRecording() {
    if (isDemo) {
        alert("You are in demo mode. Please login for full access.");
        return;
    }
    mediaRecorder = new MediaRecorder(audioContext.destination.stream);
    mediaRecorder.start();

    mediaRecorder.ondataavailable = event => {
        audioChunks.push(event.data);
    };

    mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/mpeg' });
        const audioUrl = URL.createObjectURL(audioBlob);
        const a = document.createElement('a');
        a.href = audioUrl;
        a.download = 'remix.mp3'; // Filename
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        audioChunks = []; // Reset chunks after downloading
    };
}

// Function to stop recording
function stopRecording() {
    if (mediaRecorder) {
        mediaRecorder.stop();
    } else {
        alert("No recording in progress.");
    }
}

// Function to handle login
function handleLogin(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const validEmails = [
        "gm0667620@gmail.com",
        "murtaza.abbasi0022@gmail.com",
        "furkanabbasi662@gmail.com",
        "gaming.streaming00@gmail.com"
    ];

    if (validEmails.includes(email)) {
        alert("Login successful! You now have full access.");
        isDemo = false; // User now has full access
        demoTimeout = setTimeout(() => {
            alert("Your session has expired. Please log in again for full access.");
            isDemo = true; // Revert to demo mode
        }, demoDuration);
        document.getElementById("login-message").innerText = "Welcome, " + email + "!";
    } else {
        document.getElementById("login-message").innerText = "Invalid email. Please try again.";
    }
}

// Clean up demo mode on page load
window.onload = function () {
    // Additional initialization if needed
};

// Function to create a song with a specific singer
function createSongWithSinger(singerName) {
    if (isDemo) {
        alert("You are in demo mode. Please login for full access.");
        return;
    }
    // Logic to create a song in the singer's voice
    document.getElementById("voice-output").innerText = `Creating song in the voice of ${singerName}...`;
}

// Function to upload audio for voice cloning
function uploadAudio() {
    const audioUpload = document.getElementById("audio-upload").files[0];
    if (audioUpload) {
        // Logic to handle audio upload for voice cloning
        document.getElementById("voice-output").innerText = `Audio "${audioUpload.name}" uploaded successfully.`;
    } else {
        alert("Please select an audio file to upload.");
    }
}

// Function to start recording voice for cloning
function startVoiceRecording() {
    // Similar logic for voice recording can be implemented here
    alert("Voice recording started...");
}

// Function to stop voice recording
function stopVoiceRecording() {
    // Similar logic for stopping voice recording can be implemented here
    alert("Voice recording stopped.");
}
