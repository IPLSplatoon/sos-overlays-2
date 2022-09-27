import { casters } from '../helpers/replicants.js';
import { DASHBOARD_BUNDLE_NAME } from '../helpers/constants.js';
import gsap from '../../../node_modules/gsap/all.js';

const commWrappers = [
    document.getElementById("comm-1-wrapper"),
    document.getElementById("comm-2-wrapper"),
    document.getElementById("comm-3-wrapper")
]

const commNames = [
    document.getElementById("comm-1-name"),
    document.getElementById("comm-2-name"),
    document.getElementById("comm-3-name"),
]

const commSocials = [
    document.getElementById("comm-1-socials"),
    document.getElementById("comm-2-socials"),
    document.getElementById("comm-3-socials"),
]

const commPronouns = [
    document.getElementById("comm-1-pronouns"),
    document.getElementById("comm-2-pronouns"),
    document.getElementById("comm-3-pronouns")
]

NodeCG.waitForReplicants(casters).then(() => {
    casters.on('change', (newValue, oldValue) => {

        const casters = Object.values(newValue);
        const oldCasters = oldValue === undefined ? undefined : Object.values(oldValue);

        if (oldCasters === undefined){
            for(var i = 0; i < 3; i++){
                if (casters[i] !== undefined){
                    changeComm(i, casters[i]);
                    showComm(i, true);
                } else {
                    showComm(i, false);
                }
            }
        } else {
            for(var i = 0; i < 3; i++){
                if (oldCasters[i] === undefined || casters[i] === undefined){
                    if (oldCasters[i] === undefined && casters[i] !== undefined){
                        showComm(i, true);
                    } else if (oldCasters[i] !== undefined && casters[i] === undefined){
                        showComm(i, false);
                    }
                } else {
                    if (casters[i].name !== oldCasters[i].name
                        || casters[i].twitter !== oldCasters[i].twitter
                        || casters[i].pronouns !== oldCasters[i].pronouns){
                            changeComm(i, casters[i]);
                        }
                }      
            }
        }
    });
});

nodecg.listenFor('mainShowCasters', DASHBOARD_BUNDLE_NAME, () => {
    const tl = gsap.timeline();
    const elim = document.getElementById("comms-container");

    tl.fromTo(elim, {
        scale: .85,
        filter: "blur(12px)",
        opacity: 0
    }, {
        scale: 1,
        filter: "blur(0px)",
        opacity: 1,
        ease: "power2.out",
        duration: .6
    })
    .to(elim, {
        scale: .85,
        filter: "blur(12px)",
        opacity: 0,
        duration: .6,
        ease: "power2.in"
    }, "+=15")
});

function changeComm(index: number, caster){
    const tl = gsap.timeline();

    tl.to(commWrappers[index], {
        opacity: 0,
        duration: .25,
        ease: "power2.in",
        onComplete: function(){
            commNames[index].setAttribute("text", caster.name);
            commSocials[index].setAttribute("text", caster.twitter);
            commPronouns[index].innerText = caster.pronouns;
        }
    })
    .to(commWrappers[index], {
        opacity: 1,
        duration: .45,
        ease: "power2.out"
    }, "+=.25");
}

function showComm(index: number, show: boolean){
    commWrappers[index].style.display = show ? "block" : "none";
}