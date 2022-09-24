import { activeBreakScene } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';

const sceneTl = gsap.timeline();

const fadeInStart = {
    scale: .85,
    webkitFilter: "blur(8px)",
    opacity: 0
}
const fadeInEnd = {
    scale: 1,
    webkitFilter: "blur(0px)",
    opacity: 1,
    duration: .5,
    ease: "power2.out"
}
const fadeOut = {
    scale: .85,
    webkitFilter: "blur(8px)",
    opacity: 0,
    duration: .5,
    ease: "power2.in"
}

activeBreakScene.on('change', (newValue, oldValue) => {
    switch(oldValue){
        case "main":
            sceneTl.add(hideMain());
            sceneTl.add(shiftDown());
            break;

        case "teams":
            sceneTl.add(hideTeams());
            if (newValue == "main"){
                sceneTl.add(hideBottomBar(), "<");
                sceneTl.add(shiftUp());
            }
            break;

        case "stages":
            sceneTl.add(hideStages());
            if (newValue == "main"){
                sceneTl.add(hideBottomBar(), "<");
                sceneTl.add(shiftUp());
            }
    }

    switch(newValue){
        case "main":
            sceneTl.add(showMain());
            break;

        case "teams":
            sceneTl.add(showTeams());
            if (oldValue == "main"){
                sceneTl.add(showBottomBar(), "<");
            }
            break;

        case "stages":
            sceneTl.add(showStages());
            if (oldValue == "main"){
                sceneTl.add(showBottomBar(), "<");
            }
            
    }
});

function shiftUp() : gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(
        '.scrolling-container', {
            duration: 2,
            ease: "power2.inOut",
            y: 0
        }
    );

    return tl;
}

function shiftDown() : gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.to(
        '.scrolling-container', {
            duration: 2,
            ease: "power2.inOut",
            y: -1080-540
        }
    );

    return tl;
}

function showMain() : gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.fromTo(".break > .left", fadeInStart, fadeInEnd);
    tl.fromTo(".break > .right > .flavor-text", fadeInStart, fadeInEnd, "-=.2");
    tl.fromTo(".break > .right > .up-next-wrapper > .header", fadeInStart, fadeInEnd, "-=.4");
    tl.fromTo(".break > .right > .up-next-wrapper > .detail", fadeInStart, fadeInEnd, "-=.4");
    tl.fromTo(".break > .right > .up-next-wrapper > .stages-wrapper > *", fadeInStart, {...fadeInEnd, stagger: .1}, "-=.4");
    tl.fromTo(".break > .right > .up-next-wrapper > .timer", fadeInStart, fadeInEnd, "-=.4");
    tl.fromTo(".break-bottom-bar", {
        opacity: 0,
        y: 50
    }, {
        opacity: 1,
        y: 0,
        ease: "power2.out",
        duration: .8
    }, 
    "-=.4");

    return tl;
}

function hideMain() : gsap.core.Timeline {
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
    },
    "-=.4");

    return tl;
}

function showTeams() : gsap.core.Timeline {
    const tl = gsap.timeline();
    tl.fromTo(".game-info-wrapper > .teams-wrapper > *", {
        ...fadeInStart
    }, {
        ...fadeInEnd,
        stagger: .2,
        onStart: function(){
            const wrapper = document.querySelector(".game-info-wrapper > .teams-wrapper") as HTMLElement;
            wrapper.style.display = "flex";
        }
    });
    return tl;
}

function hideTeams() : gsap.core.Timeline {
    const tl = gsap.timeline();
    tl.to(".game-info-wrapper > .teams-wrapper > *", {
        ...fadeOut,
        stagger: .1,
        onComplete: function(){
            const wrapper = document.querySelector(".game-info-wrapper > .teams-wrapper") as HTMLElement;
            wrapper.style.display = "none";
        }
    });
    return tl;
}

function showStages() : gsap.core.Timeline {
    const tl = gsap.timeline();
    const stageElems = document.querySelectorAll(".game-info-wrapper > .stages-wrapper > .stage");
    const count = stageElems.length;
    tl.fromTo(stageElems, { 
        ...fadeInStart
    }, {
        ...fadeInEnd,
        stagger: (.6/count),
        onStart: function(){
            const wrapper = document.querySelector(".game-info-wrapper > .stages-wrapper") as HTMLElement;
            wrapper.style.display = "flex";
        }
    });
    return tl;
}

function hideStages() : gsap.core.Timeline {
    const tl = gsap.timeline();
    const stageElems = document.querySelectorAll(".game-info-wrapper > .stages-wrapper > .stage");
    const count = stageElems.length;
    tl.to(stageElems, {
        ...fadeOut,
        stagger: (.3/count),
        onComplete: function(){
            const wrapper = document.querySelector(".game-info-wrapper > .stages-wrapper") as HTMLElement;
            wrapper.style.display = "none";
        }
    });
    return tl;
}

function showBottomBar() : gsap.core.Timeline {
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

function hideBottomBar() : gsap.core.Timeline {
    const tl = gsap.timeline();
    tl.to(".bottom-bar", {
        opacity: 0,
        y: 85,
        ease: "power2.in",
        duration: .5
    });
    return tl;
}