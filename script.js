// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

const cols = 5;
const gap = 10;
const size = 100;

items.forEach((item, index) => {
  const row = Math.floor(index / cols);
  const col = index % cols;
  item.style.left = `${col * (size + gap)}px`;
  item.style.top = `${row * (size + gap)}px`;
});

let current = null;
let offsetX = 0;
let offsetY = 0;

items.forEach(item => {
  item.addEventListener('mousedown', (e) => {
    current = item;
    offsetX = e.clientX - item.offsetLeft;
    offsetY = e.clientY - item.offsetTop;
    item.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!current) return;

  const rect = container.getBoundingClientRect();

  let x = e.clientX - rect.left - offsetX;
  let y = e.clientY - rect.top - offsetY;

  x = Math.max(0, Math.min(x, container.clientWidth - current.offsetWidth));
  y = Math.max(0, Math.min(y, container.clientHeight - current.offsetHeight));

  current.style.left = `${x}px`;
  current.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (current) current.style.cursor = 'grab';
  current = null;
});