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
  gsap.set(whiteCircle, { scale: 0, opacity: 0 });
  gsap.set(circleText, { scale: 0.9, opacity: 0 });

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

// todo hover


// todo gooey animation
// function gooeyAnimation() {
//   Shery.imageEffect("#olga", {
//     style: 5,
//     config: {
//       a: { value: 2, range: [0, 30] },
//       b: { value: 0.75, range: [-1, 1] },
//       zindex: { value: -9996999, range: [-9999999, 9999999] },
//       aspect: { value: 0.8081953766802364 },
//       ignoreShapeAspect: { value: true },
//       shapePosition: { value: { x: 0, y: 0 } },
//       shapeScale: { value: { x: 0.5, y: 0.5 } },
//       shapeEdgeSoftness: { value: 0, range: [0, 0.5] },
//       shapeRadius: { value: 0, range: [0, 2] },
//       currentScroll: { value: 0 },
//       scrollLerp: { value: 0.07 },
//       gooey: { value: true },
//       infiniteGooey: { value: false },
//       growSize: { value: 4, range: [1, 15] },
//       durationOut: { value: 1, range: [0.1, 5] },
//       durationIn: { value: 1.5, range: [0.1, 5] },
//       displaceAmount: { value: 0.5 },
//       masker: { value: true },
//       maskVal: { value: 1.31, range: [1, 5] },
//       scrollType: { value: 0 },
//       geoVertex: { range: [1, 64], value: 1 },
//       noEffectGooey: { value: true },
//       onMouse: { value: 1 },
//       noise_speed: { value: 0.2, range: [0, 10] },
//       metaball: { value: 0.34, range: [0, 2] },
//       discard_threshold: { value: 0.5, range: [0, 1] },
//       antialias_threshold: { value: 0, range: [0, 0.1] },
//       noise_height: { value: 0.5, range: [0, 2] },
//       noise_scale: { value: 10, range: [0, 100] },
//     },
//     gooey: true,

//     // effect: "gooey",
//     // intensity: 0.5,
//     // duration: 1.5,
//     ease: "power2.inOut",
//   });
// }
// gooeyAnimation();
