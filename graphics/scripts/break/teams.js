import { activeRound } from '../helpers/replicants.js';
import { getPlayerElement } from '../helpers/elements.js';
import gsap from '../../../node_modules/gsap/all.js';
activeRound.on("change", (newValue, oldValue) => {
    console.log(newValue, oldValue);
    if (oldValue === undefined) {
        setPlayers(newValue.teamA.players, 'a');
        setTeamName(newValue.teamA.name, 'a');
        setTeamImage(newValue.teamA.logoUrl, 'a');
        setPlayers(newValue.teamB.players, 'b');
        setTeamName(newValue.teamB.name, 'b');
        setTeamImage(newValue.teamB.logoUrl, 'b');
        setScore(newValue.teamA.score, newValue.teamB.score, newValue.games.length);
    }
    else {
        if (newValue.teamA.name !== oldValue.teamA.name) {
            setPlayers(newValue.teamA.players, 'a');
            setTeamName(newValue.teamA.name, 'a');
            setTeamImage(newValue.teamA.logoUrl, 'a');
        }
        if (newValue.teamB.name !== oldValue.teamB.name) {
            setPlayers(newValue.teamB.players, 'b');
            setTeamName(newValue.teamB.name, 'b');
            setTeamImage(newValue.teamB.logoUrl, 'b');
        }
        if (newValue.teamA.score !== oldValue.teamA.score || newValue.teamB.score !== oldValue.teamB.score) {
            setScore(newValue.teamA.score, newValue.teamB.score, newValue.games.length);
        }
    }
});
function setTeamName(teamName, team) {
    const elim = document.getElementById(`team-${team}-name`);
    const barElim = document.getElementById(`bar-team-${team}-name`);
    const tl = gsap.timeline();
    tl.to([elim, barElim], {
        opacity: 0,
        ease: "power2.in",
        duration: .25,
        onComplete: function () {
            elim.setAttribute("text", teamName);
            barElim.setAttribute("text", teamName);
        }
    });
    tl.to([elim, barElim], {
        opacity: 1,
        ease: "power2.out",
        duration: .25
    });
}
function setTeamImage(url, team) {
    const elim = document.getElementById(`team-${team}-image`);
    const barElim = document.getElementById(`bar-team-${team}-image`);
    const tl = gsap.timeline();
    tl.to([elim, barElim], {
        opacity: 0,
        ease: "power2.in",
        duration: .25,
        onComplete: function () {
            elim.setAttribute("src", url);
            barElim.setAttribute("src", url);
        }
    });
    tl.to([elim, barElim], {
        opacity: 1,
        ease: "power2.out",
        duration: .25
    }, "+=.5");
}
function setPlayers(players, team) {
    const elim = document.getElementById(`team-${team}-roster`);
    const tl = gsap.timeline();
    tl.to(elim, {
        opacity: 0,
        ease: "power2.in",
        duration: .25,
        onComplete: function () {
            elim.innerHTML = "";
            for (var i = 0; i < players.length; i++) {
                const playerElement = getPlayerElement(players[i].name);
                elim.appendChild(playerElement);
            }
        }
    });
    tl.to(elim, {
        opacity: 1,
        ease: "power2.out",
        duration: .25
    });
}
function setScore(scoreA, scoreB, matchGames) {
    const elim = document.getElementById("teams-screen-score");
    const barAScore = document.getElementById("bar-team-a-score");
    const barBScore = document.getElementById("bar-team-b-score");
    const gamesCount = document.getElementById("teams-screen-game-num");
    elim.innerText = `${scoreA} - ${scoreB}`;
    barAScore.innerText = scoreA.toString();
    barBScore.innerText = scoreB.toString();
    gamesCount.innerText = `${matchGames} Games`;
}
//# sourceMappingURL=teams.js.map