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

// todo image hover effect

// Get all target arrows
const arrows = document.querySelectorAll(
  "#down_arrow, #rightdown_arrow, #right_arrow"
);

// Loop through each arrow
arrows.forEach((arrow) => {
  const whiteCircle = arrow.querySelector(".white_circle");
  const circleText = arrow.querySelector(".circle-text");

  // Start hidden
  gsap.set(whiteCircle, {
    scale: 0,
    opacity: 0,
  });
  gsap.set(circleText, {
    scale: 0.9,
    opacity: 0,
  });

  // On hover in
  arrow.addEventListener("mouseenter", () => {
    gsap.to(whiteCircle, {
      scale: 1.05,
      opacity: 1,
      duration: 0.4,
      ease: "power3.out",
    });

    gsap.to(circleText, {
      scale: 1,
      opacity: 1,
      duration: 0.4,
      delay: 0.05,
      ease: "power2.out",
    });
  });

  // On hover out
  arrow.addEventListener("mouseleave", () => {
    gsap.to(whiteCircle, {
      scale: 0,
      opacity: 0,
      duration: 0.3,
      ease: "power3.in",
    });

    gsap.to(circleText, {
      scale: 0.9,
      opacity: 0,
      duration: 0.3,
      ease: "power2.in",
    });
  });
});

// todo all projects animation
const allProjects = document.getElementById("all_projects");

allProjects.addEventListener("mouseenter", () => {
  gsap.to(allProjects, {
    scale: 0.88, // slightly larger
    duration: 0.4,
    ease: "power2.out",
  });
});

allProjects.addEventListener("mouseleave", () => {
  gsap.to(allProjects, {
    scale: 1, // back to normal
    duration: 0.4,
    ease: "power2.inOut",
  });
});

//todo headline animation

gsap.from(".headline-underline", {
  x: 1000,
  scrollTrigger: {
    trigger: "#page3_headline",
    scroller: "#main-content",
    start: "top 80%",
    end: "top 27%",
    scrub: true,
  },
});

gsap.from(".about-underline", {
  x: 1000,
  scrollTrigger: {
    trigger: "#page8_headline",
    scroller: "#main-content",
    start: "top 80%",
    end: "top 27%",
    scrub: true,
  },
});
gsap.from(".page9-underline", {
  x: 1000,
  scrollTrigger: {
    trigger: "#page9_line",
    scroller: "#main-content",
    start: "top 80%",
    end: "top 27%",
    scrub: true,
  },
});
gsap.from(".page11-underline", {
  x: 1000,
  scrollTrigger: {
    trigger: "#page11_headline",
    scroller: "#main-content",
    start: "top 80%",
    end: "top 22%",
    scrub: true,
  },
});
gsap.from(".page11-lastline", {
  x: 1000,
  scrollTrigger: {
    trigger: "#page11_headline",
    scroller: "#main-content",
    start: "top 20%",
    end: "top 0%",
    scrub: true,
  },
});

const links = document.querySelectorAll("#part1 h5");

links.forEach((link) => {
  // Customize this width per link if needed
  const customWidth = link.getAttribute("data-underline-width") || "100%";

  // Create underline element
  const underline = document.createElement("span");
  underline.style.position = "absolute";
  underline.style.bottom = "0";
  underline.style.left = "0";
  underline.style.height = "1px";
  underline.style.background = "white";
  underline.style.width = "0%";
  underline.style.transformOrigin = "right";
  underline.style.pointerEvents = "none";

  // Required for positioning
  link.style.position = "relative";
  link.appendChild(underline);

  link.addEventListener("mouseenter", () => {
    gsap.to(underline, {
      width: customWidth,
      duration: 0.4,
      ease: "power2.out",
      transformOrigin: "right",
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(underline, {
      width: "0%",
      duration: 0.4,
      ease: "power2.in",
      transformOrigin: "left",
    });
  });
});

//todo vid crsr animation

const play_pause = document.querySelector("#play_pause");
const vid_container = document.querySelector("#vid-container");
const video = vid_container.querySelector("video");
const image = vid_container.querySelector("img");

// SVG icons
const playIcon = play_pause.querySelector(".button__play-icon");
const pauseIcon = play_pause.querySelector(".button__pause-icon");

let isPlaying = true; // autoplay is ON initially

// Hover effect (only when paused)
play_pause.addEventListener("mouseenter", () => {
  if (!isPlaying) {
    gsap.to(play_pause, {
      scale: 0.88,
      duration: 0.4,
      ease: "power2.out",
    });
  }
});

play_pause.addEventListener("mouseleave", () => {
  if (!isPlaying) {
    gsap.to(play_pause, {
      scale: 1,
      duration: 0.4,
      ease: "power2.inOut",
    });
  }
});

// Click to toggle play/pause
play_pause.addEventListener("click", () => {
  if (!isPlaying) {
    // ▶️ → ⏸️ Play video
    gsap.to(image, {
      opacity: 0,
      duration: 0.5,
      ease: "power2.inOut",
    });

    video.play();

    gsap.to(play_pause, {
      scale: 0.8,
      duration: 0.4,
      ease: "power2.out",
    });

    // Play → Pause icon
    gsap.to(playIcon, { opacity: 0, visibility: "hidden", duration: 0.2 });
    gsap.to(pauseIcon, { opacity: 1, visibility: "visible", duration: 0.2 });
  } else {
    // ⏸️ → ▶️ Pause video
    gsap.to(image, {
      opacity: 1,
      duration: 0.5,
      ease: "power2.inOut",
    });

    video.pause();

    gsap.to(play_pause, {
      scale: 1,
      duration: 0.4,
      ease: "power2.out",
    });

    // Pause → Play icon
    gsap.to(pauseIcon, { opacity: 0, visibility: "hidden", duration: 0.2 });
    gsap.to(playIcon, { opacity: 1, visibility: "visible", duration: 0.2 });
  }

  isPlaying = !isPlaying;
});

//todo flag animation

document.addEventListener("mousemove", (dets) => {
  gsap.to("#flag", { x: dets.x, y: dets.y, duration: 0.2, ease: "power2.out" });
});

document.querySelectorAll("#web, #graphic").forEach((elem) => {
  elem.addEventListener("mouseenter", () => {
    gsap.to("#flag", {
      display: "block",
      opacity: 1,
      duration: 0.3,
      ease: "power2.out",
    });
  });
  elem.addEventListener("mouseleave", () => {
    gsap.to("#flag", {
      display: "none",
      opacity: 0,
      duration: 0.3,
      ease: "power2.out",
    });
  });
});
