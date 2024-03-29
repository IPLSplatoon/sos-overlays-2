import { activeRound, assetPaths } from '../helpers/replicants.js';
import { getMapElement } from '../helpers/elements.js';
import { getStageImagePath, modeNameToSvgPath } from '../helpers/constants.js';
import { addDots } from '../helpers/misc.js';
import gsap from '../../../node_modules/gsap/all.js';
NodeCG.waitForReplicants(activeRound, assetPaths).then(() => {
    activeRound.on("change", (newValue, oldValue) => {
        if (oldValue === undefined || stagesChanged(oldValue.games, newValue.games)) {
            setStages(newValue);
        }
        else if (newValue.teamA.score !== oldValue.teamA.score || newValue.teamB.score !== oldValue.teamB.score) {
            updateScores(newValue);
        }
    });
});
function stagesChanged(oldGames, newGames) {
    if (oldGames.length !== newGames.length) {
        return true;
    }
    for (var i = 0; i < oldGames.length; i++) {
        if (newGames[i].stage !== oldGames[i].stage
            || newGames[i].mode !== oldGames[i].mode) {
            return true;
        }
    }
    return false;
}
function setStages(round) {
    const games = round.games;
    const wrapper = document.getElementById("stage-wrapper");
    const tl = gsap.timeline();
    tl.to(wrapper, {
        opacity: 0,
        ease: "power2.in",
        duration: .25,
        onComplete: function () {
            wrapper.innerHTML = "";
            for (var i = 0; i < games.length; i++) {
                const stage = getMapElement(games[i].stage, games[i].mode);
                wrapper.appendChild(stage);
            }
            switch (games.length) {
                case 3:
                    wrapper.style.fontSize = "46px";
                    break;
                case 5:
                    wrapper.style.fontSize = "38px";
                    break;
                case 7:
                    wrapper.style.fontSize = "32px";
            }
            updateScores(round);
        }
    });
    tl.to(wrapper, {
        opacity: 1,
        ease: "power2.out",
        duration: .25
    }, "+=.25");
}
export function updateScores(round) {
    const wrapper = document.getElementById("stage-wrapper");
    const stageElims = wrapper.children;
    const games = round.games;
    const alphaName = round.teamA.name;
    const bravoName = round.teamB.name;
    for (var i = 0; i < games.length; i++) {
        if (stageElims[i] === undefined) {
            continue;
        }
        const winnerElim = stageElims[i].querySelector(".winner");
        stageElims[i].classList.remove("next");
        if (stageElims[i].classList.contains("finished") && games[i].winner == "none") {
            winnerElim.innerText = "";
            stageElims[i].classList.remove("finished");
        }
        else if (games[i].winner !== "none") {
            switch (games[i].winner) {
                case "alpha":
                    winnerElim.innerText = addDots(alphaName);
                    break;
                case "bravo":
                    winnerElim.innerText = addDots(bravoName);
            }
            stageElims[i].classList.add("finished");
        }
    }
    for (var i = 0; i < games.length; i++) {
        if (games[i].winner === "none") {
            stageElims[i].classList.add("next");
            break;
        }
    }
    const bottomBarNextStage = document.getElementById("next-stage");
    const bottomBarName = document.getElementById("next-stage-name");
    const bottomBarImage = document.getElementById("next-stage-image");
    const bottomBarModeIcon = document.getElementById("next-stage-mode-icon");
    const barTl = gsap.timeline();
    for (var i = 0; i < games.length; i++) {
        if (games[i].winner === "none") {
            barTl.to(bottomBarNextStage, {
                opacity: 0,
                ease: "power2.in",
                duration: .25,
                onComplete: function () {
                    bottomBarName.setAttribute("text", games[i].stage);
                    bottomBarImage.setAttribute("src", getStageImagePath(games[i].stage));
                    bottomBarModeIcon.setAttribute("src", "./assets/svg/" + modeNameToSvgPath[games[i].mode]);
                }
            })
                .to(bottomBarNextStage, {
                opacity: 1,
                ease: "power2.out",
                duration: .45
            }, "+=.25");
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
//# sourceMappingURL=stages.js.map