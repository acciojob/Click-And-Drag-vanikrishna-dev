document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('container');
  const cubes = Array.from(container.querySelectorAll('.item'));

  const size = 100;
  const gap = 12; 

  function layoutGrid() {
    const style = getComputedStyle(container);
    const paddingLeft = parseInt(style.paddingLeft) || 0;
    const paddingTop = parseInt(style.paddingTop) || 0;
    const paddingRight = parseInt(style.paddingRight) || 0;

    const effectiveWidth = container.clientWidth - paddingLeft - paddingRight;
    const cols = Math.max(1, Math.floor((effectiveWidth + gap) / (size + gap)));

    cubes.forEach((cube, i) => {
      const col = i % cols;
      const row = Math.floor(i / cols);
      const left = paddingLeft + col * (size + gap);
      const top = paddingTop + row * (size + gap);

      cube.style.left = `${left}px`;
      cube.style.top = `${top}px`;
      cube.style.width = `${size}px`;
      cube.style.height = `${size}px`;
    });
  }

  layoutGrid();
  window.addEventListener('resize', layoutGrid);

  let active = null;
  let pointerId = null;
  let startX = 0;
  let startY = 0;
  let origLeft = 0;
  let origTop = 0;
  let isDragging = false;

  function clamp(v, min, max) {
    return Math.max(min, Math.min(max, v));
  }

  function onPointerDown(e) {
    if (typeof e.button !== 'undefined' && e.button !== 0) return;
    active = e.currentTarget;
    pointerId = e.pointerId;

    e.preventDefault();

    try { active.setPointerCapture(pointerId); } catch (err) {}

    const containerRect = container.getBoundingClientRect();
    const rect = active.getBoundingClientRect();

    startX = e.clientX;
    startY = e.clientY;

    origLeft = rect.left - containerRect.left;
    origTop = rect.top - containerRect.top;

    isDragging = false;
    active.classList.add('dragging');
  }

  function onPointerMove(e) {
    if (!active) return;

    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    if (!isDragging && (Math.abs(dx) > 3 || Math.abs(dy) > 3)) {
      isDragging = true;
    }

    let newLeft = origLeft + dx;
    let newTop = origTop + dy;

    const maxLeft = container.clientWidth - active.offsetWidth;
    const maxTop = container.clientHeight - active.offsetHeight;

    newLeft = clamp(newLeft, 0, maxLeft);
    newTop = clamp(newTop, 0, maxTop);

    active.style.left = `${newLeft}px`;
    active.style.top = `${newTop}px`;
  }

  function onPointerUp(e) {
    if (!active) return;


    try { active.releasePointerCapture && active.releasePointerCapture(pointerId); } catch (err) {}

    active.classList.remove('dragging');
    active = null;
    pointerId = null;
    isDragging = false;
  }

  cubes.forEach(cube => {
    cube.addEventListener('pointerdown', onPointerDown);
  });
	
  document.addEventListener('pointermove', onPointerMove);
  document.addEventListener('pointerup', onPointerUp);

  if (!window.PointerEvent) {
    cubes.forEach(cube => {
      cube.addEventListener('mousedown', (e) => onPointerDown(Object.assign(e, { pointerId: 'mouse' })));
    });
    document.addEventListener('mousemove', onPointerMove);
    document.addEventListener('mouseup', onPointerUp);
  }
});