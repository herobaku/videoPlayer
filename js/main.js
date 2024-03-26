const playPause = document.querySelector(".playPause"),
  volume = document.querySelector(".volume"),
  video = document.getElementById("video");
full = document.querySelector(".full"),
  wrapper = document.querySelector(".wrapper"),
  progressContainer = document.querySelector(".progress__container"),
  progress = document.querySelector(".progress"),
  duration__current = document.querySelector(".duration__current"),
  duration__time = document.querySelector(".duration__time");

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

const fullVideo = () => {
  video.classList.toggle("active")
  wrapper.classList.toggle("active")
}

video.addEventListener("dblclick", () => {
  fullVideo()
})

full.addEventListener("click", () => {
  fullVideo()
})

video.addEventListener("click", () => {
  isPlay ? pause() : play();
})

document.body.addEventListener("keypress", (e) => {
  if (e.key === "Space" || e.keyCode === 32) {
    isPlay ? pause() : play();
  }
})

video.muted = true;

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


/*
icon volume
<span class="material-symbols-outlined">
volume_up
</span>

<span class="material-symbols-outlined">
volume_down
</span>

<span class="material-symbols-outlined">
no_sound
</span>

<span class="material-symbols-outlined">
fullscreen_exit
</span>
*/
