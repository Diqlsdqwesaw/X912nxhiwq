const songs = [
  "./assets/music/music.mp3",
  "./assets/music/music2.mp3",
  "./assets/music/music3.mp3",
];

let currentSongIndex = Math.floor(Math.random() * songs.length);
let audio = null; // Store the current Audio object

function playNextSong() {
  // Stop and clean up the current audio if it exists
  if (audio) {
    audio.pause();
    audio.removeEventListener("ended", playNextSong); // Remove previous listener
    audio = null;
  }

  // Create a new Audio object for the current song
  audio = new Audio(songs[currentSongIndex]);
  audio.loop = false;
  audio.volume = 0.4;

  // Add event listener for when the song ends
  audio.addEventListener("ended", () => {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    playNextSong();
  });

  // Play the song
  audio.play().catch((error) => {
    console.error("Error playing audio:", error);
  });
}

function userHasClicked() {
  // Hide the flexbox container
  document.getElementById("flexboxcontainer").style.display = "none";
  document.getElementById("flexboxcontainer").style.width = 0;
  document.getElementById("flexboxcontainer").style.height = 0;

  // Show the hidden container
  const hiddenContainer = document.getElementById("hiddencontainer");
  hiddenContainer.style.display = "flex";
  
  // Start playing music
  playNextSong();

  // Fade in the hidden container
  setTimeout(() => {
    hiddenContainer.style.opacity = 1;
  }, 50);
}

function updateFlicker() {
  const randomOpacity = Math.random() * 0.75 + 0.75;
  document.querySelectorAll(".flickertext").forEach((element) => {
    element.style.setProperty("--rand", randomOpacity);
  });
}

setInterval(updateFlicker, 500);

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("flexboxcontainer")
    .addEventListener("click", userHasClicked);
});
