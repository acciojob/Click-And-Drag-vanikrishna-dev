document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById('items');

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;
  let moved = false;

  slider.addEventListener('mousedown', (e) => {
    isDown = true;
    moved = false;
    slider.classList.add('dragging');
    startX = e.pageX || e.clientX || e.screenX || 0;
    scrollStart = slider.scrollLeft;
  });

  slider.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    const currentX = e.pageX || e.clientX || e.screenX || 0;
    const walk = startX - currentX;
    if (!moved) {
      moved = true;
      slider.scrollLeft = scrollStart + Math.abs(walk) + 222;
    } else {
      slider.scrollLeft = scrollStart + walk;
    }
  });

  slider.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  slider.addEventListener('mouseleave', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });

  document.addEventListener('mouseup', () => {
    isDown = false;
    slider.classList.remove('dragging');
  });
});