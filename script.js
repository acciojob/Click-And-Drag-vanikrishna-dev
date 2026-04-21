// Your code here.
const container = document.querySelector('.items');
const items = document.querySelectorAll('.item');

let activeItem = null;
let offsetX = 0;
let offsetY = 0;

items.forEach((item, index) => {
  // initial grid placement
  const cols = 5;
  const size = 200;
  const gap = 20;

  const row = Math.floor(index / cols);
  const col = index % cols;

  item.style.left = `${col * (size + gap)}px`;
  item.style.top = `${row * (size + gap)}px`;

  item.addEventListener('mousedown', (e) => {
    activeItem = item;

    const rect = item.getBoundingClientRect();

    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    item.style.cursor = 'grabbing';
  });
});

document.addEventListener('mousemove', (e) => {
  if (!activeItem) return;

  const containerRect = container.getBoundingClientRect();

  let x = e.clientX - containerRect.left - offsetX;
  let y = e.clientY - containerRect.top - offsetY;

  // boundaries
  const maxX = container.clientWidth - activeItem.offsetWidth;
  const maxY = container.clientHeight - activeItem.offsetHeight;

  x = Math.max(0, Math.min(x, maxX));
  y = Math.max(0, Math.min(y, maxY));

  activeItem.style.left = `${x}px`;
  activeItem.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
  if (activeItem) {
    activeItem.style.cursor = 'grab';
  }
  activeItem = null;
});
});