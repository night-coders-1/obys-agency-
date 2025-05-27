// todo loader page
function loader() {
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
  gsap
    .timeline({
      delay: 3,
      onComplete: () => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main-content").style.display = "block";
        document.documentElement.style.overflow = "auto";
        document.body.style.overflow = "auto";
      },
    })
    .to("#loader *", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    })
    .to("#loader", {
      y: "-100vh", // Slide the entire loader out of the viewport
      duration: 1.2,
      ease: "power4.inOut",
    });

  // Fade in wait message after animation
  gsap.to("#wait-message", {
    opacity: 1, // adjust timing based on when you want it to appear
    duration: 1,
  });
}
loader();

document.addEventListener("mousemove", function (dets) {
  gsap.to("#crsr", {
    left: dets.x,
    top: dets.y,
    duration: 0.1,
    ease: "power1.out",
  });
});

// todo Custom cursor magnet effect
const cursor = document.getElementById("crsr");

document.addEventListener("mousemove", (e) => {
  cursor.style.left = `${e.clientX}px`;
  cursor.style.top = `${e.clientY}px`;
});

// Apply Shery.js magnetic effect
Shery.makeMagnet(".menu-opener__square, #rightnav p", {
  ease: "cubic-bezier(0.6, -0.28, 0.735, 0.045)",
  duration: 0.5,
});

gsap.from(".text_01_line h4", {
  y: 100,
  delay: 4.2,
  opacity: 0,
  duration: 0.7,
  stagger: 0.1,
});
