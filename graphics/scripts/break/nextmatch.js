import { nextRound } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';
import { getNextMatchMapElement, getMoreStagesElement } from '../helpers/elements.js';
const wrapper = document.getElementById("up-next-wrapper");
const teamA = document.getElementById("next-match-team-a");
const teamB = document.getElementById("next-match-team-b");
const stageWrapper = document.getElementById("next-match-stages-wrapper");
const tl = gsap.timeline();
NodeCG.waitForReplicants(nextRound).then(() => {
    setNextRound(nextRound.value);
});
nextRound.on('change', (newValue, oldValue) => {
    console.log(newValue);
    if (oldValue === undefined || newValue.showOnStream !== oldValue.showOnStream) {
        showUpNext(newValue.showOnStream);
    }
    else if (newValue.teamA.name !== oldValue.teamA.name
        || newValue.teamB.name !== oldValue.teamB.name
        || roundsChanged(oldValue.games, newValue.games)) {
        setNextRound(newValue);
    }
});
function roundsChanged(oldRounds, newRounds) {
    if (oldRounds.length !== newRounds.length) {
        return true;
    }
    for (var i = 0; i < oldRounds.length; i++) {
        if (newRounds[i].stage !== oldRounds[i].stage || newRounds[i].mode !== oldRounds[i].mode) {
            return true;
        }
    }
    return false;
}
function showUpNext(show) {
    if (show == false) {
        const height = wrapper.offsetHeight + 1;
        tl.to(wrapper, {
            opacity: 0,
            duration: .25,
            ease: "power2.out"
        })
            .fromTo(wrapper, {
            height: height
        }, {
            height: 0,
            duration: .75,
            display: "none",
            ease: "power3.inOut",
            onComplete: function () {
                wrapper.style.height = "";
            }
        });
    }
    else {
        tl.fromTo(wrapper, {
            height: 0,
            display: "block"
        }, {
            height: "auto",
            duration: .75,
            ease: "power3.inOut"
        })
            .fromTo(wrapper, {
            opacity: 0
        }, {
            opacity: 1,
            duration: .25,
            ease: "power2.out"
        });
    }
}
function setNextRound(round) {
    if (nextRound.value.showOnStream) {
        tl.to(wrapper, {
            opacity: 0,
            duration: .35,
            ease: "power2.out",
            onComplete: function () {
                changeTeams(round);
            }
        })
            .to(wrapper, {
            opacity: 1,
            duration: .35,
            ease: "power2.in"
        });
    }
    else {
        changeTeams(round);
    }
}
function changeTeams(round) {
    teamA.setAttribute("text", round.teamA.name);
    teamB.setAttribute("text", round.teamB.name);
    stageWrapper.innerHTML = "";
    for (var i = 0; i < Math.min(round.games.length, 3); i++) {
        stageWrapper.appendChild(getNextMatchMapElement(round.games[i].stage, round.games[i].mode));
    }
    if (round.games.length > 3) {
        stageWrapper.appendChild(getMoreStagesElement((round.games.length - 3).toString()));
    }
}
//# sourceMappingURL=nextmatch.js.map