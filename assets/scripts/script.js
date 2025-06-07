const songs = [
  "./assets/music/music.mp3",
  "./assets/music/music2.mp3",
  "./assets/music/music3.mp3",
];

let currentSongIndex = Math.floor(Math.random() * songs.length);
let audio = new Audio();

function playNextSong() {
  audio.pause(); // Stop the current audio
  audio.currentTime = 0; // Reset to the beginning
  audio.src = songs[currentSongIndex]; // Set the new song
  audio.loop = false;
  audio.volume = 0.4;

  audio.play().catch((error) => {
    console.log("Audio play failed:", error);
  });

  audio.addEventListener("ended", () => {
    currentSongIndex = Math.floor(Math.random() * songs.length);
    playNextSong();
  });
}

function userHasClicked() {
  document.getElementById("flexboxcontainer").style.display = "none";
  document.getElementById("flexboxcontainer").style.width = 0;
  document.getElementById("flexboxcontainer").style.height = 0;

  const hiddenContainer = document.getElementById("hiddencontainer");
  hiddenContainer.style.display = "flex";
  playNextSong();
  setTimeout(() => {
    hiddenContainer.style.opacity = 1;
  }, 50);
}

function updateFlicker() {
  const randomOpacity = Math.random() * 0.75 + 0.75;

  const flickerTexts = document
    .querySelectorAll(".flickertext")
    .forEach((element) => {
      element.style.setProperty("--rand", randomOpacity);
    });
}

setInterval(updateFlicker, 500);

document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("flexboxcontainer")
    .addEventListener("click", userHasClicked);
});
