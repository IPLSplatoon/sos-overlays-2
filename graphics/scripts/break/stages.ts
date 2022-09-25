import { activeRound } from '../helpers/replicants.js';
import { getMapElement } from '../helpers/elements.js';
import { mapNameToImagePath } from "../helpers/constants.js";
import gsap from '../../../node_modules/gsap/all.js';

activeRound.on("change", (newValue, oldValue) => {
    if (oldValue === undefined || stagesChanged(oldValue.games, newValue.games)){ 
        setStages(newValue.games);
        NodeCG.waitForReplicants(activeRound).then(() => {
            updateScores(newValue);
        });
    } else if (newValue.teamA.score !== oldValue.teamA.score || newValue.teamB.score !== oldValue.teamB.score){
        updateScores(newValue);
    }
});

function stagesChanged(oldGames, newGames) : boolean {
    if (oldGames.length !== newGames.length){
        return true;
    }

    for (var i = 0; i < oldGames.length; i++){
        if (newGames[i].stage !== oldGames[i].stage
            || newGames[i].mode !== oldGames[i].mode){
            return true;
        }
    }

    return false;
}

function setStages(games) : void{
    const wrapper = document.getElementById("stage-wrapper") as HTMLElement;
    const tl = gsap.timeline();

    tl.to(wrapper, {
        opacity: 0,
        ease: "power2.in",
        duration: .25,
        onComplete: function(){
            wrapper.innerHTML = "";
            for (var i = 0; i < games.length; i++){
                const stage = getMapElement(games[i].stage, games[i].mode);
                wrapper.appendChild(stage);
            }
        }
    });

    tl.to(wrapper, {
        opacity: 1,
        ease: "power2.out",
        duration: .25
    }, "+=.25");
}

function updateScores(round) : void{
    const wrapper = document.getElementById("stage-wrapper") as HTMLElement;
    const stageElims = wrapper.children;
    const games = round.games;
    const alphaName = round.teamA.name;
    const bravoName = round.teamB.name;

    for (var i = 0; i < games.length; i++){
        const winnerElim = stageElims[i].querySelector(".winner") as HTMLElement;

        if (stageElims[i].classList.contains("finished") && games[i].winner == "none"){

            winnerElim.innerText = "";
            stageElims[i].classList.remove("finished");

        } else if (games[i].winner !== "none") {

            switch(games[i].winner){
                case "alpha":
                    winnerElim.innerText = alphaName;
                    break;
                case "bravo":
                    winnerElim.innerText = bravoName;
            }
            stageElims[i].classList.add("finished");

        }
    }

    const bottomBarNextStage = document.getElementById("next-stage");
    const bottomBarName = document.getElementById("next-stage-name");
    const bottomBarImage = document.getElementById("next-stage-image");
    const barTl = gsap.timeline();

    for (var i = 0; i < games.length; i++){
        if (games[i].winner === "none"){
            barTl.to([bottomBarName, bottomBarImage], {
                opacity: 0,
                ease: "power2.in",
                duration: .25,
                onComplete: function(){
                    bottomBarName.setAttribute("text", games[i].stage);
                    bottomBarImage.setAttribute("src", "./assets/stages/" + mapNameToImagePath[games[i].stage]);
                }
            })
            .to([bottomBarName, bottomBarImage, bottomBarNextStage],{
                opacity: 1,
                ease: "power2.out",
                duration: .45
            });
            return;
        }
    }

    //code only reaches here if game is over
    barTl.to(bottomBarNextStage, {
        opacity: 0,
        ease: "power2.in",
        duration: .25
    });
}