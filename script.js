// Animate loading text lines
gsap.from(".main-text", {
  y: 100,
  opacity: 0,
  duration: 1,
  stagger: 0.3,
});
gsap.from(".numbers", {
  opacity: 0,
  delay: 0.3,
  duration: 2,
});

var timerElement = document.querySelector("#timer");
var count = 0;

var interval = setInterval(() => {
  if (count <= 100) {
    timerElement.textContent = count;
    count++;
  } else {
    clearInterval(interval); // Stop the counter
  }
}, 29);

// Hide loader after animation
gsap.to("#loader", {
  delay: 3,
  opacity: 0,
  duration: 1.8,
  onComplete: () => {
    document.getElementById("loader").style.display = "none";
    document.getElementById("main-content").style.display = "block";
    // Allow scroll after loader is hidden
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
  },
});
// Fade in wait message after animation
gsap.to("#wait-message", {
  opacity: 1, // adjust timing based on when you want it to appear
  duration: 1,
});
gsap.from("#page1", {
  y: 1600,
  opacity: 0,
  duration: 1.4,
  ease: "power1.8.in", // or "expo.in" for even more effect
  delay: 4.4,
});
