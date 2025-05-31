function scroll() {
  gsap.registerPlugin(ScrollTrigger);

  // Check if we're on mobile
  const isMobile = window.innerWidth <= 600;

  // Only initialize Locomotive Scroll on desktop
  if (!isMobile) {
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main-content"),
      smooth: true,
      multiplier: 1,
      lerp: 0.1,
    });

    locoScroll.on("scroll", ScrollTrigger.update);

    ScrollTrigger.scrollerProxy("#main-content", {
      scrollTop(value) {
        return arguments.length
          ? locoScroll.scrollTo(value, 0, 0)
          : locoScroll.scroll.instance.scroll.y;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.querySelector("#main-content").style.transform
        ? "transform"
        : "fixed",
    });

    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    ScrollTrigger.refresh();
  } else {
    // On mobile, use native scrolling
    ScrollTrigger.defaults({
      scroller: window,
    });
    ScrollTrigger.refresh();
  }
}

// Update loader function
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
      clearInterval(interval);
    }
  }, 29);

  // Hide loader after animation
  gsap
    .timeline({
      delay: 3,
      onComplete: () => {
        document.getElementById("loader").style.display = "none";
        document.getElementById("main-content").style.display = "block";

        // Properly handle overflow after loader
        const isMobile = window.innerWidth <= 600;
        if (isMobile) {
          document.documentElement.style.overflow = "auto";
          document.body.style.overflow = "auto";
        } else {
          document.documentElement.style.overflow = "hidden";
          document.body.style.overflow = "hidden";
        }

        // Refresh scroll trigger after loader is hidden
        ScrollTrigger.refresh();
      },
    })
    .to("#loader *", {
      opacity: 0,
      duration: 0.6,
      ease: "power2.out",
    })
    .to("#loader", {
      y: "-100vh",
      duration: 1.2,
      ease: "power4.inOut",
    });

  // Fade in wait message
  gsap.to("#wait-message", {
    opacity: 1,
    duration: 1,
  });
}

// Add resize handler to reinitialize scroll on window resize
window.addEventListener("resize", () => {
  const isMobile = window.innerWidth <= 600;
  if (isMobile) {
    // Reset scroll behavior for mobile
    document.documentElement.style.overflow = "auto";
    document.body.style.overflow = "auto";
    ScrollTrigger.refresh();
  } else {
    // Reinitialize smooth scroll for desktop
    scroll();
  }
});

// Initialize
scroll();
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
