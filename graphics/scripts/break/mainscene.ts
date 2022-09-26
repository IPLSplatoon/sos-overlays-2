import gsap from '../../../node_modules/gsap/all.js';
import { mainFlavorText, nextRoundTime } from '../helpers/replicants.js';

nextRoundTime.on('change', (newValue, oldValue) => {
    if (oldValue === undefined || newValue.isVisible !== oldValue.isVisible){
        toggleTimer(newValue.isVisible);
    } else if (newValue.startTime !== oldValue.startTime){
        updateTimer();
    }
});

mainFlavorText.on('change', newValue => {
    changeMainFlavorText(newValue)
});

NodeCG.waitForReplicants(nextRoundTime).then(() => {
    updateTimer();
    setInterval(updateTimer, 15000); //every 15 seconds
});

function changeMainFlavorText(text: string){
    const elim = document.getElementById("main-scene-flavor-text");
    const tl = gsap.timeline();

    tl.to(elim, {
        opacity: 0,
        duration: .25,
        ease: "power2.out",
        onComplete: function(){
            elim.setAttribute("text", text);
        }
    })
    .to(elim, {
        opacity: 1,
        duration: .25,
        ease: "power2.in"
    });
}

function toggleTimer(show: boolean){
    const timer = document.getElementById("main-scene-timer");
    const tl = gsap.timeline();

    if (show){
        tl.fromTo(timer, {
            height: 0,
            display: "block"
        }, {
            height: "auto",
            duration: .5,
            ease: "power1.inOut"
        })
        .fromTo(timer, {
            opacity: 0
        }, {
            opacity: 1,
            duration: .25,
            ease: "power2.out"
        })
    } else {
        const height = timer.offsetHeight+1;
        tl.to(timer, {
            opacity: 0,
            duration: .25,
            ease: "power2.out"
        })
        .fromTo(timer, {
            height: height
        }, {
            height: 0,
            duration: .5,
            display: "none",
            ease: "power1.inOut",
            onComplete: function(){
                timer.style.height = "";
            }
        });
    }
}

function updateTimer(){
    const timerText = document.getElementById("next-round-timer");
    const timerTimestamp = new Date(nextRoundTime.value.startTime).valueOf();
    const currentTimestamp = new Date().valueOf();
    const diff = Math.round(((timerTimestamp - currentTimestamp) / 1000) / 60);

    var currentText = timerText.innerText;
    var text: string;
    if (diff > 1){
        text = `In ~${diff} Minute${diff == 1 ? "" : "s"}`;
    } else {
        text = "Soon!"
    }

    if (currentText !== text){
        const tl = gsap.timeline();
        tl.to(timerText, {
            opacity: 0,
            duration: .25,
            ease: "power2.out",
            onComplete: function(){
                timerText.innerText = text;
            }
        })
        .to(timerText, {
            opacity: 1,
            duration: .25,
            ease: "power2.in"
        });
    }
}