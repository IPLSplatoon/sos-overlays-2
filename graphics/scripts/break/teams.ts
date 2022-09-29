import { activeRound } from '../helpers/replicants.js';
import { getPlayerElement } from '../helpers/elements.js';
import { addDots } from '../helpers/misc.js';
import { updateScores } from './stages.js';
import gsap from '../../../node_modules/gsap/all.js';
import { TLSSocket } from 'tls';

NodeCG.waitForReplicants(activeRound).then(() => {
    if (!activeRound.value.teamA.showLogo){
        setTeamImage('', 'a');
    }
    if (!activeRound.value.teamB.showLogo){
        setTeamImage('', 'b');
    }
});


activeRound.on("change", (newValue, oldValue) => {
    if (oldValue === undefined){ 
        setPlayers(newValue.teamA.players, 'a');
        setTeamName(newValue.teamA.name, 'a');
        setTeamImage(newValue.teamA.logoUrl, 'a');
        setPlayers(newValue.teamB.players, 'b');
        setTeamName(newValue.teamB.name, 'b');
        setTeamImage(newValue.teamB.logoUrl, 'b');
        setScore(newValue.teamA.score, newValue.teamB.score, newValue.games.length);

    } else {
        if (newValue.teamA.name !== oldValue.teamA.name){
            setPlayers(newValue.teamA.players, 'a');
            setTeamName(newValue.teamA.name, 'a');
            setTeamImage(newValue.teamA.logoUrl, 'a');
            setScore(newValue.teamA.score, newValue.teamB.score, newValue.games.length);
            updateScores(newValue);
        }
        if (newValue.teamB.name !== oldValue.teamB.name){
            setPlayers(newValue.teamB.players, 'b');
            setTeamName(newValue.teamB.name, 'b');
            setTeamImage(newValue.teamB.logoUrl, 'b');
            setScore(newValue.teamA.score, newValue.teamB.score, newValue.games.length);
            updateScores(newValue);
        }
        
        if (newValue.teamA.score !== oldValue.teamA.score 
            || newValue.teamB.score !== oldValue.teamB.score
            || newValue.games.length !== oldValue.games.length){
            setScore(newValue.teamA.score, newValue.teamB.score, newValue.games.length);
        }

        if (newValue.teamA.showLogo !== oldValue.teamA.showLogo){
            setTeamImage(newValue.teamA.showLogo ? newValue.teamA.logoUrl : "", 'a');
        }
        if (newValue.teamB.showLogo !== oldValue.teamB.showLogo){
            setTeamImage(newValue.teamB.showLogo ? newValue.teamB.logoUrl : "", 'b');
        }
    }
});

function setTeamName(teamName: string, team: 'a' | 'b') : void{
    const elim = document.getElementById(`team-${team}-name`);
    const barElim = document.getElementById(`bar-team-${team}-name`);
    const tl = gsap.timeline();

    tl.to([elim, barElim], {
        opacity: 0,
        ease: "power2.in",
        duration: .25,
        onComplete: function(){
            elim.setAttribute("text", addDots(teamName));
            barElim.setAttribute("text", addDots(teamName, 52));
        }
    });

    tl.to([elim, barElim], {
        opacity: 1,
        ease: "power2.out",
        duration: .25
    });
}

function setTeamImage(url: string, team: 'a' | 'b') : void{
    const elim = document.getElementById(`team-${team}-image`);
    const barElim = document.getElementById(`bar-team-${team}-image`);
    const tl = gsap.timeline();
    
    function fadeIn(elim){
        tl.fromTo(elim, {
            opacity: 0
        }, {
            visibility: "visible",
            opacity: 1,
            ease: "power2.out",
            duration: .5
        }, "<");
    }

    tl.to([elim, barElim], {
        opacity: 0,
        ease: "power2.in",
        duration: .25,
        onComplete: function(){
            if (url == '' || url === undefined || url == null){
                elim.style.visibility = "hidden";
                barElim.style.visibility = "hidden";
            } else {
                tl.to({}, { duration: .15})

                elim.setAttribute("src", url);
                (elim as HTMLImageElement).addEventListener('load', () => {
                    fadeIn(elim);
                });

                barElim.setAttribute("src", url);
                (barElim as HTMLImageElement).addEventListener('load', () => {
                    fadeIn(barElim);
                });
            }
        }
    });
}

function setPlayers(players, team: 'a' | 'b'): void {
    const elim = document.getElementById(`team-${team}-roster`);
    const tl = gsap.timeline();

    tl.to(elim, {
        opacity: 0,
        ease: "power2.in",
        duration: .25,
        onComplete: function(){
            elim.innerHTML = "";
            for (var i = 0; i < players.length; i++){
                const playerElement = getPlayerElement(addDots(players[i].name, 32));
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

function setScore(scoreA: number, scoreB: number, matchGames: number) : void {
    const elim = document.getElementById("teams-screen-score");
    const barAScore = document.getElementById("bar-team-a-score");
    const barBScore = document.getElementById("bar-team-b-score");
    const gamesCount = document.getElementById("teams-screen-game-num");

    elim.innerHTML = `<div>${scoreA}</div><div>-</div><div>${scoreB}</div>`;
    barAScore.innerText = scoreA.toString();
    barBScore.innerText = scoreB.toString();
    gamesCount.innerText = `${matchGames} Games`;
}