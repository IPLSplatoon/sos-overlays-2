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
    ease: "power2.in"
};
NodeCG.waitForReplicants(activeBreakScene).then(() => {
    if (activeBreakScene.value == "teams" || activeBreakScene.value == "stages") {
        changeScene(activeBreakScene.value, "main", .2);
    }
});
activeBreakScene.on('change', (newValue, oldValue) => {
    changeScene(newValue, oldValue);
});
function changeScene(newValue, oldValue, durMulti = 1) {
    switch (oldValue) {
        case "main":
            sceneTl.add(hideMain());
            sceneTl.add(shiftDown(durMulti));
            break;
        case "teams":
            sceneTl.add(hideTeams());
            if (newValue == "main") {
                sceneTl.add(hideBottomBar(), "<");
                sceneTl.add(shiftUp(durMulti));
            }
            break;
        case "stages":
            sceneTl.add(hideStages());
            if (newValue == "main") {
                sceneTl.add(hideBottomBar(), "<");
                sceneTl.add(shiftUp(durMulti));
            }
    }
    switch (newValue) {
        case "main":
            sceneTl.add(showMain());
            break;
        case "teams":
            sceneTl.add(showTeams());
            if (oldValue == "main") {
                sceneTl.add(showBottomBar(), "<");
            }
            break;
        case "stages":
            sceneTl.add(showStages());
            if (oldValue == "main") {
                sceneTl.add(showBottomBar(), "<");
            }
    }
}
function shiftUp(durMulti) {
    const tl = gsap.timeline();
    tl.to('.scrolling-container', {
        duration: 2 * durMulti,
        ease: "power2.inOut",
        y: 0
    });
    return tl;
}
function shiftDown(durMulti) {
    const tl = gsap.timeline();
    tl.to('.scrolling-container', {
        duration: 2 * durMulti,
        ease: "power2.inOut",
        y: -1080 - 540
    });
    return tl;
}
function showMain() {
    const tl = gsap.timeline();
    tl.fromTo(".break > .left", fadeInStart, fadeInEnd);
    tl.fromTo("#main-scene-flavor-text", fadeInStart, fadeInEnd, "-=.2");
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
    tl.fromTo(".game-info-wrapper > .teams-wrapper > *", Object.assign({}, fadeInStart), Object.assign(Object.assign({}, fadeInEnd), { stagger: .2, onStart: function () {
            const wrapper = document.querySelector(".game-info-wrapper > .teams-wrapper");
            wrapper.style.display = "flex";
        } }));
    tl.fromTo(".bottom-bar > .right > .next-stage", {
        opacity: 0
    }, {
        opacity: 1,
        duration: .4,
        ease: "power2.out",
        display: "flex"
    }, "<");
    return tl;
}
function hideTeams() {
    const tl = gsap.timeline();
    tl.to(".game-info-wrapper > .teams-wrapper > *", Object.assign(Object.assign({}, fadeOut), { stagger: .1, onComplete: function () {
            const wrapper = document.querySelector(".game-info-wrapper > .teams-wrapper");
            wrapper.style.display = "none";
        } }));
    tl.to(".bottom-bar > .right > .next-stage", {
        opacity: 0,
        ease: "power2.in",
        duration: .4,
        display: "none"
    }, "<");
    return tl;
}
function showStages() {
    const tl = gsap.timeline();
    const stageElems = document.querySelectorAll(".game-info-wrapper > .stages-wrapper > .stage");
    const count = stageElems.length;
    tl.fromTo(stageElems, Object.assign({}, fadeInStart), Object.assign(Object.assign({}, fadeInEnd), { stagger: (.6 / count), onStart: function () {
            const wrapper = document.querySelector(".game-info-wrapper > .stages-wrapper");
            wrapper.style.display = "flex";
            for (var i = 0; i < stageElems.length; i++) {
                stageElems[i].style.transitionDuration = "0s";
            }
        }, onComplete: function () {
            for (var i = 0; i < stageElems.length; i++) {
                stageElems[i].style.transitionDuration = ".35s";
            }
        } }));
    tl.fromTo(".bottom-bar > .right > .bar-teams", {
        opacity: 0
    }, {
        opacity: 1,
        duration: .4,
        ease: "power2.out",
        display: "flex"
    }, "<");
    return tl;
}
function hideStages() {
    const tl = gsap.timeline();
    const stageElems = document.querySelectorAll(".game-info-wrapper > .stages-wrapper > .stage");
    const count = stageElems.length;
    tl.to(stageElems, Object.assign(Object.assign({}, fadeOut), { stagger: (.3 / count), onComplete: function () {
            const wrapper = document.querySelector(".game-info-wrapper > .stages-wrapper");
            wrapper.style.display = "none";
            for (var i = 0; i < stageElems.length; i++) {
                stageElems[i].style.transitionDuration = ".35s";
            }
        }, onStart: function () {
            for (var i = 0; i < stageElems.length; i++) {
                stageElems[i].style.transitionDuration = "0s";
            }
        } }));
    tl.to(".bottom-bar > .right > .bar-teams", {
        opacity: 0,
        ease: "power2.in",
        duration: .4,
        display: "none"
    }, "<");
    return tl;
}
function showBottomBar() {
    const tl = gsap.timeline();
    tl.fromTo(".bottom-bar", {
        opacity: 0,
        y: 85
    }, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: .8
    });
    return tl;
}
function hideBottomBar() {
    const tl = gsap.timeline();
    tl.to(".bottom-bar", {
        opacity: 0,
        y: 85,
        ease: "power2.in",
        duration: .5
    });
    return tl;
}
//# sourceMappingURL=sceneSwitcher.js.map