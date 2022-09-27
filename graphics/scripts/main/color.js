import { activeRound } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';
NodeCG.waitForReplicants(activeRound).then(() => {
    activeRound.on("change", (newValue, oldValue) => {
        if (oldValue === undefined) {
            changeColor(newValue.teamA.color, 'a');
            changeColor(newValue.teamB.color, 'b');
        }
        else {
            if (newValue.teamA.color !== oldValue.teamA.color) {
                changeColor(newValue.teamA.color, 'a');
            }
            if (newValue.teamB.color !== oldValue.teamB.color) {
                changeColor(newValue.teamB.color, 'b');
            }
        }
    });
});
function changeColor(hex, team) {
    const elim = document.getElementById(`team-${team}-color`);
    gsap.to(elim, {
        background: hex,
        duration: .25,
        ease: "power2.inOut"
    });
}
//# sourceMappingURL=color.js.map