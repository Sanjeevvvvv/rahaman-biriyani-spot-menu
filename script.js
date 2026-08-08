const LABELS = [
  "Cover",
  "Combo Offers",
  "Egg, Salad & Beverages",
  "Rice, Noodles, Sea Foods & Mutton",
  "Veg Gravy, Grilled & Barbeque",
  "Chicken & Tandoori",
  "Biriyani, Soups & Bucket Biriyani",
];

const frame = document.querySelector(".viewer__frame");
const track = document.getElementById("track");
const pages = Array.from(track.children);
const dotsWrap = document.getElementById("dots");
const pageNum = document.getElementById("pageNum");
const pageLabel = document.getElementById("pageLabel");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxClose = document.getElementById("lightboxClose");

const COUNT = pages.length;
let current = 0;
let frameHeight = frame.clientHeight;

// Build dots
pages.forEach((_, i) => {
  const b = document.createElement("button");
  b.setAttribute("aria-label", `Go to page ${i + 1}`);
  b.addEventListener("click", () => goTo(i));
  dotsWrap.appendChild(b);
});
const dots = Array.from(dotsWrap.children);

function setTransform(px, withTransition) {
  track.classList.toggle("is-dragging", !withTransition);
  track.style.transform = `translateY(${px}px)`;
}

function render() {
  frameHeight = frame.clientHeight;
  setTransform(-current * frameHeight, true);
  pageNum.textContent = current + 1;
  pageLabel.textContent = LABELS[current] || "";
  dots.forEach((d, i) => d.classList.toggle("is-active", i === current));
  prevBtn.disabled = current === 0;
  nextBtn.disabled = current === COUNT - 1;
}

// Move exactly one page at a time, however hard the swipe/flick was.
function goTo(i) {
  current = Math.max(0, Math.min(COUNT - 1, i));
  render();
}

prevBtn.addEventListener("click", () => goTo(current - 1));
nextBtn.addEventListener("click", () => goTo(current + 1));
window.addEventListener("resize", render);

// ---- Controlled drag: track follows the finger 1:1, release snaps to
// at most one page over, regardless of swipe speed/momentum. ----
let dragging = false;
let dragStartY = 0;
let dragDeltaY = 0;
let pointerId = null;
let movedEnoughToBeSwipe = false;

function onPointerDown(e) {
  if (e.button !== undefined && e.button !== 0) return;
  dragging = true;
  movedEnoughToBeSwipe = false;
  pointerId = e.pointerId;
  dragStartY = e.clientY;
  dragDeltaY = 0;
  track.setPointerCapture && track.setPointerCapture(pointerId);
}

function onPointerMove(e) {
  if (!dragging || e.pointerId !== pointerId) return;
  dragDeltaY = e.clientY - dragStartY;
  if (Math.abs(dragDeltaY) > 6) movedEnoughToBeSwipe = true;
  // Resist dragging past the first/last page.
  let delta = dragDeltaY;
  if ((current === 0 && delta > 0) || (current === COUNT - 1 && delta < 0)) {
    delta = delta / 3;
  }
  setTransform(-current * frameHeight + delta, false);
}

function onPointerUp(e) {
  if (!dragging || e.pointerId !== pointerId) return;
  dragging = false;

  const threshold = Math.min(70, frameHeight * 0.16);
  if (dragDeltaY <= -threshold) {
    goTo(current + 1);
  } else if (dragDeltaY >= threshold) {
    goTo(current - 1);
  } else {
    render(); // snap back to current page
  }
  dragDeltaY = 0;
}

track.addEventListener("pointerdown", onPointerDown);
track.addEventListener("pointermove", onPointerMove);
track.addEventListener("pointerup", onPointerUp);
track.addEventListener("pointercancel", onPointerUp);

// Keyboard navigation
document.addEventListener("keydown", (e) => {
  if (lightbox.classList.contains("is-open")) {
    if (e.key === "Escape") closeLightbox();
    return;
  }
  if (e.key === "ArrowRight") goTo(current + 1);
  if (e.key === "ArrowLeft") goTo(current - 1);
});

// Lightbox (tap a page to zoom — but not right after a swipe)
function openLightbox(src, alt) {
  lightboxImg.src = src;
  lightboxImg.alt = alt;
  lightbox.classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeLightbox() {
  lightbox.classList.remove("is-open");
  document.body.style.overflow = "";
}
pages.forEach((page) => {
  const img = page.querySelector("img");
  page.addEventListener("click", () => {
    if (movedEnoughToBeSwipe) return;
    openLightbox(img.src, img.alt);
  });
});
lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});

render();
