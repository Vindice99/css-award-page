let progress = document.getElementById("progress");
let song = document.getElementById("song");
let controlIcon = document.getElementById("controlIcon");
let songTitle = document.getElementById("songTitle");
let songArtist = document.getElementById("songArtist");
let songThumbnail = document.getElementById("songThumbnail");
let audioSource = document.getElementById("audioSource");

// Array of songs with their respective details
const songs = [
    {
        title: "Despacito",
        artist: "Luis Fonsi Ft. Puerto Rican",
        src: "./Asset/Music/Go! - NEFFEX.mp3",
        thumbnail: "./Asset/Thumbnail/Go! - NEFFEX.png"
    },
    {
        title: "Moving In The Shadows",
        artist: "The Soundlings",
        src: "./Asset/Music/Moving In The Shadows - The Soundlings.mp3",
        thumbnail: "./Asset/Thumbnail/Moving In The Shadows - The Soundlings.png"
    },
    {
        title: "Retribution",
        artist: "NEFFEX",
        src: "./Asset/Music/Retribution - NEFFEX.mp3",
        thumbnail: "./Asset/Thumbnail/Retribution - NEFFEX.png"
    },
    {
        title: "Sky_Skating",
        artist: "N/A",
        src: "./Asset/Music/Sky_Skating.mp3",
        thumbnail: "./Asset/Thumbnail/Sky_Skating.jpg"
    }
    // Add more songs as needed
];

let currentSongIndex = 0;

// Load the initial song
loadSong(currentSongIndex);

function loadSong(index) {
    const songDetails = songs[index];
    audioSource.src = songDetails.src;
    song.load();
    songTitle.innerText = songDetails.title;
    songArtist.innerText = songDetails.artist;
    songThumbnail.src = songDetails.thumbnail;
    progress.value = 0; // Reset progress
}

song.onloadedmetadata = function () {
    progress.max = song.duration;
    progress.value = song.currentTime;
};

function playPause() {
    if (controlIcon.classList.contains("fa-pause")) {
        song.pause();
        controlIcon.classList.remove("fa-pause");
        controlIcon.classList.add("fa-play");
        songThumbnail.classList.remove("spinning"); // Stop spinning when paused
    } else {
        song.play();
        controlIcon.classList.add("fa-pause");
        controlIcon.classList.remove("fa-play");
        songThumbnail.classList.add("spinning"); // Stop spinning when paused
    }
}

function increaseVolume() {
    if (song.volume < 1) {
        song.volume = Math.min(song.volume + 0.1, 1);
    }
}

function decreseVolume() {
    if (song.volume > 0) {
        song.volume = Math.max(song.volume - 0.1, 0);
    }
}

function playNext() {
    /*If currentSongIndex is at the last song (for example, if there are 3 songs, currentSongIndex would be 2), then (2 + 1) equals 3. When you perform 3 % 3, the result is 0. */
    currentSongIndex = (currentSongIndex + 1) % songs.length; // Loop back to start
    loadSong(currentSongIndex);
    song.play(); // Automatically play the next song
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
}

function playPrevious() {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length; // Loop to the end if at start
    loadSong(currentSongIndex);
    song.play(); // Automatically play the previous song
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
}

setInterval(() => {
    progress.value = song.currentTime;
}, 500);

progress.onchange = function () {
    song.currentTime = progress.value;
    song.play();
    controlIcon.classList.add("fa-pause");
    controlIcon.classList.remove("fa-play");
};
