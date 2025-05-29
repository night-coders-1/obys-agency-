function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("#main-content"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "#main-content" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("#main-content", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("#main-content").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
scroll();

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
        document.documentElement.style.overflow = "hidden"; // Allow scrolling after loader
        document.body.style.overflow = "visible"; // Allow scrolling after loader
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
