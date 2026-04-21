// Your code here.
const slider = document.querySelector('.items');

let isDown = false;
let startX;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');

  startX = e.pageX || e.clientX;
});

function handleMove(e) {
  if (!isDown) return;

  const x = e.pageX || e.clientX;
  const walk = x - startX;

  slider.scrollLeft -= walk;
  startX = x;
}

slider.addEventListener('mousemove', handleMove);
document.addEventListener('mousemove', handleMove);

document.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});