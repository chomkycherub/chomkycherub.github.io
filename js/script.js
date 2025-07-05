document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll('.watch-reel').forEach(button => {
    button.addEventListener('click', () => {
      const videoSrc = button.dataset.reel;
      const modal = document.getElementById('videoModal');
      const video = document.getElementById('modalVideo');
      video.src = videoSrc;
      modal.classList.remove('hidden');
    });
  });

  document.querySelector('.close-button').addEventListener('click', () => {
    const modal = document.getElementById('videoModal');
    const video = document.getElementById('modalVideo');
    video.pause();
    video.src = "";
    modal.classList.add('hidden');
  });
});

