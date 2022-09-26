import gsap from '../../../node_modules/gsap/all.js';
import { musicShown } from '../helpers/replicants.js';

var bottomBarTl;
var breakBottomBarTl;

export function animInit(){
    NodeCG.waitForReplicants(musicShown).then(() => {

        bottomBarTl = gsap.timeline({
            onComplete: function(){
                bottomBarTl.add(animBottomBar());
            }
        });

        breakBottomBarTl = gsap.timeline({
            onComplete: function(){
                breakBottomBarTl.add(animBreakBottomBar());
            }
        });

        bottomBarTl.add(animBottomBar());
        breakBottomBarTl.add(animBreakBottomBar());

    });
};

function animBreakBottomBar() : gsap.core.Timeline {
    const tl = gsap.timeline();
    const elements = document.querySelectorAll(".break-bottom-bar > .wrapper");

    for (var i = 0; i < elements.length; i++){
        const e = elements[i] as HTMLElement;
        e.style.display = "none";

        const music = e.id == "music-main-bar";

        if (!(music && !musicShown.value)){

            tl.fromTo(e, {
                display: "none",
                opacity: 0,
                x: 50
            }, {
                display: "flex",
                opacity: 1,
                x: 0,
                duration: .6,
                ease: "power2.out"
            })
            .to(e, {
                display: "none",
                opacity: 0,
                x: -50,
                duration: .4,
                ease: "power2.in"
            }, "+=7");

        }
    }

    return tl;
}

function animBottomBar() : gsap.core.Timeline {
    const tl = gsap.timeline();

    const elements = document.querySelectorAll(".bottom-bar > .left > .wrapper");
    
    const castersNamesStack = document.getElementById("casters-name-stack");
    const castersSocialsStack = document.getElementById("casters-socials-stack");

    for (var i = 0; i < elements.length; i++){
        const e = elements[i] as HTMLElement;
        e.style.display = "none";

        const casters = e.id == "casters-bottom-bar";
        const music = e.id == "music-bottom-bar";
        
        if (!(music && !musicShown.value)){

            tl.fromTo(e, {
                display: "none",
                opacity: 0,
                y: 5
            }, {
                display: "flex",
                opacity: 1,
                y: 0,
                duration: .6,
                ease: "power2.out"
            });

            if (casters){
                tl.fromTo(castersNamesStack, {
                    opacity: 1,
                    display: "flex"
                }, {
                    opacity: 0,
                    duration: .3,
                    display: "none",
                    ease: "power2.out"
                }, "+=4.75")
                .fromTo(castersSocialsStack, {
                    display: "none",
                    opacity: 0
                }, {
                    display: "flex",
                    opacity: 1,
                    duration: .2,
                    ease: "power2.in"
                });
            }
            
            tl.to(e, {
                display: "none",
                opacity: 0,
                y: -5,
                duration: .4,
                ease: "power2.in"
            }, !casters ? "+=7" : "+=10");

        }
    }

    return tl;
}