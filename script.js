document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('items');

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.clientX;
    scrollStart = slider.scrollLeft;
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const walk = startX - e.clientX;
    slider.scrollLeft = scrollStart + walk;
  });
});