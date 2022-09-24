import { activeBreakScene } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';
const sceneTl = gsap.timeline();
const fadeInStart = {
    scale: .85,
    webkitFilter: "blur(8px)",
    opacity: 0
};
const fadeInEnd = {
    scale: 1,
    webkitFilter: "blur(0px)",
    opacity: 1,
    duration: .5,
    ease: "power2.out"
};
const fadeOut = {
    scale: .85,
    webkitFilter: "blur(8px)",
    opacity: 0,
    duration: .5,
    ease: "power2.out"
};
activeBreakScene.on('change', (newValue, oldValue) => {
    switch (oldValue) {
        case "main":
            sceneTl.add(hideMain());
            sceneTl.add(shiftDown());
            break;
        case "teams":
            sceneTl.add(hideTeams());
            if (newValue == "main") {
                sceneTl.add(shiftUp());
            }
            break;
        case "stages":
            if (newValue == "main") {
                sceneTl.add(shiftUp());
            }
    }
    switch (newValue) {
        case "main":
            sceneTl.add(showMain());
            break;
        case "teams":
            sceneTl.add(showTeams());
            break;
        case "stages":
    }
});
function shiftUp() {
    const tl = gsap.timeline();
    tl.to('.scrolling-container', {
        duration: 2,
        ease: "power2.inOut",
        y: 0
    });
    return tl;
}
function shiftDown() {
    const tl = gsap.timeline();
    tl.to('.scrolling-container', {
        duration: 2,
        ease: "power2.inOut",
        y: -1080 - 540
    });
    return tl;
}
function showMain() {
    const tl = gsap.timeline();
    tl.fromTo(".break > .left", fadeInStart, fadeInEnd);
    tl.fromTo(".break > .right > .flavor-text", fadeInStart, fadeInEnd, "-=.2");
    tl.fromTo(".break > .right > .up-next-wrapper > .header", fadeInStart, fadeInEnd, "-=.4");
    tl.fromTo(".break > .right > .up-next-wrapper > .detail", fadeInStart, fadeInEnd, "-=.4");
    tl.fromTo(".break > .right > .up-next-wrapper > .stages-wrapper > *", fadeInStart, Object.assign(Object.assign({}, fadeInEnd), { stagger: .1 }), "-=.4");
    tl.fromTo(".break > .right > .up-next-wrapper > .timer", fadeInStart, fadeInEnd, "-=.4");
    tl.fromTo(".break-bottom-bar", {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: .8
    }, "-=.4");
    return tl;
}
function hideMain() {
    const tl = gsap.timeline();
    tl.to(".break > .left", fadeOut);
    tl.to(".break > .right > .flavor-text", fadeOut, "-=.45");
    tl.to(".break > .right > .up-next-wrapper > .header", fadeOut, "-=.45");
    tl.to(".break > .right > .up-next-wrapper > .detail", fadeOut, "-=.45");
    tl.to(".break > .right > .up-next-wrapper > .stages-wrapper > *", fadeOut, "-=.45");
    tl.to(".break > .right > .up-next-wrapper > .timer", fadeOut, "-=.4");
    tl.to(".break-bottom-bar", {
        opacity: 0,
        y: 50,
        ease: "power2.out",
        duration: .5
    }, "-=.4");
    return tl;
}
function showTeams() {
    const tl = gsap.timeline();
    tl.fromTo(".game-info-wrapper > .teams-wrapper > *", fadeInStart, Object.assign(Object.assign({}, fadeInEnd), { stagger: .2 }));
    return tl;
}
function hideTeams() {
    const tl = gsap.timeline();
    tl.to(".game-info-wrapper > .teams-wrapper > *", Object.assign(Object.assign({}, fadeOut), { stagger: .1 }));
    return tl;
}
//# sourceMappingURL=sceneSwitcher.js.map