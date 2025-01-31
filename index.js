const songs = [
    {
        src: "./assets/sound/Daddy Cool x nơi vực nơi trời.mp3"
    },
    {
        src: "./assets/sound/SUNAMI - Под Луной (Silver Ace Remix).mp3"
    },
    {
        src: "./assets/sound/Tinh Vệ 0.8x - Bothlazer Remix Tiktok.mp3"
    },
    {
        src: "./assets/sound/Troublemaker by Akon.mp3"
    },
    {
        src: "./assets/sound/Alejandro.mp3"
    },
    {
        src: "./assets/sound/Daddy Home.mp3"
    },
    {
        src: "./assets/sound/Small Town Boy.mp3"
    },
    {
        src: "./assets/sound/Nothing on you.mp3"
    },
    {
        src: "./assets/sound/Normal No More.mp3"
    },
    {
        src: "./assets/sound/Dancin in the moonlight_dancin.mp3"
    },
    {
        src: "./assets/sound/李嘉嘉.mp3"
    }

];
let currentAudio = null; // Track the current audio
let currentButton = null; // Track the current play/pause button
let isPlaying = false; // Track the play/pause state
let progressInterval = null; // Track the progress update interval

// Function to create the song list dynamically
function createSongList() {
    const songList = document.getElementById('songList');

    songs.forEach((song, index) => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = getFileName(song.src);
        row.appendChild(nameCell);

        const controlsCell = document.createElement('td');

        const playPauseButton = document.createElement('button');
        playPauseButton.classList.add('btn');
        playPauseButton.onclick = () => playPauseAudio(index, playPauseButton);
        playPauseButton.innerHTML = '<i class="fa-solid fa-play icon"></i>';

        controlsCell.appendChild(playPauseButton);
        row.appendChild(controlsCell);

        const audioElement = document.createElement('audio');
        audioElement.id = `audio${index}`;
        audioElement.src = song.src;
        row.appendChild(audioElement);

        songList.appendChild(row);
    });
}

// Function to play/pause the audio
function playPauseAudio(index, button) {
    if (currentAudio && currentAudio.id === `audio${index}` && isPlaying) {
        // If the current audio is already playing, pause it
        currentAudio.pause();
        isPlaying = false;
        button.innerHTML = '<i class="fa-solid fa-play icon"></i>'; // Change to play icon
        clearInterval(progressInterval); // Stop the progress update
    } else {
        // Pause the current audio (if there is any)
        if (currentAudio) {
            currentAudio.pause();
            currentButton.innerHTML = '<i class="fa-solid fa-play icon"></i>'; // Reset previous button to play
            clearInterval(progressInterval); // Stop the progress update
        }

        // Play the selected audio
        currentAudio = document.getElementById(`audio${index}`);
        currentAudio.play();
        isPlaying = true;
        button.innerHTML = '<i class="fa-solid fa-pause icon"></i>'; // Change to pause icon

        document.getElementById("soundName").textContent = getFileName(currentAudio.src);
        document.getElementById("duration").textContent = formatTime(currentAudio.duration);

        // Update the current button to track the play/pause state
        currentButton = button;

        // Start progress update
        updateProgress();
    }
}

// Function to update progress
function updateProgress() {
    progressInterval = setInterval(() => {
        if (currentAudio && !currentAudio.paused) {
            const currentTime = document.getElementById('currentTime');
            currentTime.textContent = formatTime(currentAudio.currentTime);
        }
    }, 100);
}

// Function to format time in minutes:seconds
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

// Function to get the file name without extension
function getFileName(fullPath) {
    let fileName = fullPath.split("/").pop();
    fileName = decodeURIComponent(fileName);
    return fileName.replace(/\.[^/.]+$/, "");
}

// Initialize the song list after the page is loaded
window.onload = createSongList;
