import { scoreboardData, activeRound } from "../helpers/replicants.js";
import gsap from '../../../node_modules/gsap/all.js';

const flavorTextElim = document.getElementById("flavor-text");
const scoreboard = document.getElementById("scoreboard");

scoreboardData.on("change", (newValue, oldValue) => {
    if (oldValue === undefined){
        updateFlavorText(newValue.flavorText);
        showScoreboard(newValue.isVisible);
    } else {
        if (newValue.flavorText !== oldValue.flavorText){
            updateFlavorText(newValue.flavorText);
        }
        if (newValue.isVisible !== oldValue.isVisible){
            showScoreboard(newValue.isVisible);
        }
    }
});

activeRound.on("change", (newValue, oldValue) => {
    console.log(newValue);
    if (oldValue === undefined){
        changeScore(newValue.teamA.score, 'a');
        changeScore(newValue.teamB.score, 'b');
    } else {
        if (newValue.teamA.score !== oldValue.teamA.score){
            changeScore(newValue.teamA.score, 'a');
        }
        if (newValue.teamB.score !== oldValue.teamB.score){
            changeScore(newValue.teamB.score, 'b');
        }
    }
});

function updateFlavorText(text: string): void{
    const tl = gsap.timeline();
    tl.to(flavorTextElim, {
        opacity: 0,
        duration: .25,
        ease: "power2.out",
        onComplete: function(){
            flavorTextElim.setAttribute("text", text);
        }
    })
    .to(flavorTextElim, {
        opacity: 1,
        duration: .25,
        ease: "power2.in"
    });
}

function showScoreboard(show: boolean): void{
    gsap.fromTo(scoreboard, {
        scale: show ? .85 : 1,
        filter: show ? "blur(12px)" : "blur(0px)",
        opacity: show ? 0 : 1
    }, {
        scale: show ? 1 : .85,
        filter: show ? "blur(0px)" : "blur(12px)",
        opacity: show ? 1 : 0,
        duration: .6,
        ease: show ? "power2.out" : "power2.in"
    });
}

function changeScore(score: number, team: 'a' | 'b'): void {
    const elim = document.getElementById(`team-${team}-score`);
    elim.innerText = score.toString();
}