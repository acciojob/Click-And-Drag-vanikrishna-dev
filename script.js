// Your code here.
const slider = document.querySelector('.items');

let isDown = false;
let startX = 0;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');

  startX = e.pageX || e.clientX;
});

slider.addEventListener('mousemove', (e) => {
  if (!isDown) return;

  const currentX = e.pageX || e.clientX;

  const diff = startX - currentX;

  slider.scrollLeft += diff;

  startX = currentX;
});

slider.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});

slider.addEventListener('mouseleave', () => {
  isDown = false;
  slider.classList.remove('active');
});