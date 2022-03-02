// User Interactable Objects 
const musicContainer = document.getElementById('music-container');
const playBtn = document.getElementById('play');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

// Objects for scripting purposes
const audio = document.getElementById('audio');
const progress = document.getElementById('progress');
const progressContainer = document.getElementById('progress-container');
const title = document.getElementById('title');
const cover = document.getElementById('cover');

// List of Song Titles
const songs = ["lefisheauchocolat", "happymonkeycircle", "Igetaround"];

// Variable to keep track of which song is playing
let songIndex = 0;

// Load the Song
function loadSong(song){
    title.innerText = song;
    audio.src = `Songs/${song}.mp3`;
    cover.src = `Songs/${song}.jpg`;
}

loadSong(songs[songIndex]);

// Functions that control song playback
function playSong(){
    musicContainer.classList.add('play'); // Adds the 'play' class to musicContainer
    playBtn.querySelector('i.fa').classList.remove('fa-play'); // Remove the play button graphic
    playBtn.querySelector('i.fa').classList.add('fa-pause'); // Adds the pause button graphic

    audio.play(); // Plays the song
}

function pauseSong(){
    musicContainer.classList.remove('play'); 
    playBtn.querySelector('i.fa').classList.remove('fa-pause'); 
    playBtn.querySelector('i.fa').classList.add('fa-play');

    audio.pause();
}

// Event Listener for Play Button
playBtn.addEventListener('click', () => {
    const isPlaying = musicContainer.classList.contains('play'); // Returns true if playing, returns false if paused
    
    if (isPlaying == true){
        pauseSong();
    }
    else{
        playSong();
    }
});

// Controls song navigation
function prevSong(){
    songIndex = songIndex - 1; // Decrement by 1

    if (songIndex < 0){
        songIndex = songs.length - 1;
    }

    loadSong(songs[songIndex]);
    playSong();
}

function nextSong(){
    songIndex++; // Basically just equal to itself + 1

    if (songIndex > songs.length - 1){
        songIndex = 0;
    }
    
    loadSong(songs[songIndex]);
    playSong();
}

// Event Listeners for Buttons
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
audio.addEventListener('ended', nextSong);

// Updates the progress bar as the song plays
function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
}

// Allows the user to click the progress bar to set what timestamp the song is at
function setProgress(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
}

// Updates song time
audio.addEventListener('timeupdate', updateProgress);

// Progress Bar clickability
progressContainer.addEventListener('click', setProgress);

// Play the next song when the song ends
audio.addEventListener('ended', nextSong);