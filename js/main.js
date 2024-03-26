const playPause = document.querySelector(".playPause"),
  video = document.getElementById("video");
full = document.querySelector(".full"),
  wrapper = document.querySelector(".wrapper");

// Duration Video
const duration__current = document.querySelector(".duration__current"),
  duration__time = document.querySelector(".duration__time");

// Progress Video length
const progressContainer = document.querySelector(".progress__container"),
  progress = document.querySelector(".progress");

// Volume
const volumePanel = document.querySelector(".volume-panel"),
  volumePanelProgress = document.querySelector(".volume-panel-progress"),
  rangeEl = document.getElementById("range"),
  volume = document.querySelector(".volume");

// Rate 
let playRate = document.querySelectorAll(".playRate");

let isPlay = false;

const play = () => {
  isPlay = true;
  video.play();
  playPause.innerHTML = `<span class="material-symbols-outlined">pause</span>`
};

const pause = () => {
  isPlay = false;
  video.pause();
  playPause.innerHTML = `<span class="material-symbols-outlined">play_arrow</span>`
};

playPause.addEventListener("click", () => {
  isPlay ? pause() : play();
});

const playRateSpeed = () => {
  isPlay = false;
  playRate.forEach((item, index) => {
    item.addEventListener("click", () => {
      if (index === 0) {
        video.currentTime -= 10
      } else {
        video.currentTime += 10
      }
    })
  })
}

playRateSpeed()

video.addEventListener("click", () => {
  isPlay ? pause() : play();
})

document.addEventListener("keypress", (e) => {
  if (e.key === "Space" || e.keyCode === 32) {
    isPlay ? pause() : play();
  }
})

video.addEventListener("ended", () => {
  isPlay ? pause() : play();
});

progressContainer.addEventListener("click", (e) => {
  const click = e.offsetX
  const width = progressContainer.clientWidth
  const duration = video.duration;
  video.currentTime = (click / width) * duration
})


video.addEventListener("timeupdate", (e) => {
  const { duration, currentTime } = e.target
  const total = (currentTime / duration) * 100
  if (!duration) return;
  // Currentime in progress music
  progress.style.width = `${total}%`

  // Duration
  const hourDuration = Math.floor(duration / 3600);
  const minuteDuration = Math.floor((duration % 3600) / 60);
  const secondDuration = Math.floor(duration % 60);
  let durationText = '';
  if (hourDuration > 0) {
    durationText = `${String(hourDuration).padStart(2, "00")} : `;
  }
  durationText += `${String(minuteDuration).padStart(2, "00")} : ${String(secondDuration).padStart(2, "00")}`;
  duration__time.innerText = durationText;

  // Current Time
  const hourCurrent = Math.floor(currentTime / 3600);
  const minuteCurrent = Math.floor((currentTime % 3600) / 60);
  const secondCurrent = Math.floor(currentTime % 60);
  let currentText = '';
  if (hourDuration > 0) {
    currentText = `${String(hourCurrent).padStart(2, "00")} : `;
  }
  currentText += `${String(minuteCurrent).padStart(2, "00")} : ${String(secondCurrent).padStart(2, "00")}`;
  duration__current.innerText = currentText;
})

rangeEl.addEventListener("input", () => {
  const correctValue = rangeEl.value / 100
  video.volume = correctValue;
  if (rangeEl.value <= 0) {
    volume.innerHTML = `<span class="material-symbols-outlined">no_sound</span>`
  } else if (rangeEl.value > 50) {
    volume.innerHTML = `<span class="material-symbols-outlined">volume_up</span>`
  } else if (rangeEl.value <= 50) {
    volume.innerHTML = `<span class="material-symbols-outlined">volume_down</span>`
  }
})

volume.addEventListener("click", () => {
  video.muted = !video.muted
  if (video.muted) {
    rangeEl.value = "0"
    volume.innerHTML = `<span class="material-symbols-outlined">no_sound</span>`
  } else {
    rangeEl.value = video.volume * 100
    if (rangeEl.value > 50) {
      volume.innerHTML = `<span class="material-symbols-outlined">volume_up</span>`
    } else if (rangeEl.value <= 50) {
      volume.innerHTML = `<span class="material-symbols-outlined">volume_down</span>`
    }
  }
})

const fullScreen = () => {
  if (!document.fullscreenElement) {
    wrapper.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

document.addEventListener("fullscreenchange", () => {
  if (!document.fullscreenElement) {
    full.innerHTML = `<span class="material-symbols-outlined">fullscreen</span>`
  } else {
    full.innerHTML = `<span class="material-symbols-outlined">fullscreen_exit</span>`
  }
})

full.addEventListener("click", fullScreen)

video.addEventListener("dblclick", fullScreen)

document.addEventListener("keydown", (e) => {
  if (e.key === "f" || e.keyCode === 102) {
    fullScreen()
  }
})

volume.addEventListener("mouseenter", () => {
  volumePanel.style.display = "block"
})

wrapper.addEventListener("mouseleave", () => {
  if (!document.body.classList.contains("wrapper")) {
    volumePanel.style.display = "none"
  }
})