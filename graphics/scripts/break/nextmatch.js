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
function setNextRound(nextRound) {
    tl.to(wrapper, {
        opacity: 0,
        duration: .35,
        ease: "power2.out",
        onComplete: function () {
            teamA.setAttribute("text", nextRound.teamA.name);
            teamB.setAttribute("text", nextRound.teamB.name);
            stageWrapper.innerHTML = "";
            for (var i = 0; i < Math.min(nextRound.games.length, 3); i++) {
                stageWrapper.appendChild(getNextMatchMapElement(nextRound.games[i].stage, nextRound.games[i].mode));
            }
            if (nextRound.games.length > 3) {
                stageWrapper.appendChild(getMoreStagesElement((nextRound.games.length - 3).toString()));
            }
        }
    })
        .to(wrapper, {
        opacity: 1,
        duration: .35,
        ease: "power2.in"
    });
}
//# sourceMappingURL=nextmatch.js.map