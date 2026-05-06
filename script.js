document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('items');

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    slider.classList.add('dragging');
    startX = e.pageX;
    scrollStart = slider.scrollLeft;
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const walk = startX - e.pageX;
    slider.scrollLeft = scrollStart + walk;
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });
});