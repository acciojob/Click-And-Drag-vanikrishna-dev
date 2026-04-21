// Your code here.
const slider = document.querySelector('.items');

let isDown = false;
let startX;
let scrollLeft;

slider.addEventListener('mousedown', (e) => {
  isDown = true;
  slider.classList.add('active');

  startX = e.pageX;
  scrollLeft = slider.scrollLeft;
});

function handleMove(e) {
  if (!isDown) return;

  let delta = e.pageX - startX;

  if (!delta && e.movementX) {
    delta = -e.movementX;
  }

  slider.scrollLeft = scrollLeft - delta * 2;
}

slider.addEventListener('mousemove', handleMove);
document.addEventListener('mousemove', handleMove);

document.addEventListener('mouseup', () => {
  isDown = false;
  slider.classList.remove('active');
});