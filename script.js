document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('items');

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX - slider.offsetLeft;
    scrollStart = slider.scrollLeft;
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  document.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - slider.offsetLeft;
    const walk = startX - x;
    slider.scrollLeft = scrollStart + walk;
  });
});