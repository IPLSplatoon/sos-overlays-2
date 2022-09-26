import { casters } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';
const mainCasterWrappers = [
    document.getElementById("caster-1-main-wrapper"),
    document.getElementById("caster-2-main-wrapper"),
    document.getElementById("caster-3-main-wrapper")
];
const mainCasterNames = [
    document.getElementById("caster-1-main-name"),
    document.getElementById("caster-2-main-name"),
    document.getElementById("caster-3-main-name")
];
const mainCasterSocials = [
    document.getElementById("caster-1-main-social"),
    document.getElementById("caster-2-main-social"),
    document.getElementById("caster-3-main-social")
];
const mainCasterPronouns = [
    document.getElementById("caster-1-main-pronouns"),
    document.getElementById("caster-2-main-pronouns"),
    document.getElementById("caster-3-main-pronouns")
];
const casterNames = [
    document.getElementById("caster-1-name"),
    document.getElementById("caster-2-name"),
    document.getElementById("caster-3-name")
];
const casterSocials = [
    document.getElementById("caster-1-social"),
    document.getElementById("caster-2-social"),
    document.getElementById("caster-3-social")
];
const casterPronouns = [
    document.getElementById("caster-1-pronouns"),
    document.getElementById("caster-2-pronouns"),
    document.getElementById("caster-3-pronouns")
];
const castersNamesStack = document.getElementById("casters-name-stack");
const castersSocialsStack = document.getElementById("casters-socials-stack");
NodeCG.waitForReplicants(casters).then(() => {
    casters.on('change', newValue => {
        const cast = Object.values(newValue);
        const numCasters = cast.length;
        const tl = gsap.timeline();
        tl.to([mainCasterWrappers[0].parentElement, ...casterNames, ...casterSocials], {
            opacity: 0,
            duration: .25,
            ease: "power2.in",
            onComplete: function () {
                for (var i = 0; i < numCasters; i++) {
                    const caster = cast[i];
                    mainCasterWrappers[i].style.display = "flex";
                    mainCasterNames[i].setAttribute("text", caster.name);
                    mainCasterSocials[i].setAttribute("text", caster.twitter);
                    mainCasterPronouns[i].innerText = caster.pronouns;
                    casterNames[i].style.display = "block";
                    casterSocials[i].style.display = "block";
                    casterPronouns[i].style.display = "block";
                    casterNames[i].setAttribute("text", caster.name);
                    casterSocials[i].setAttribute("text", caster.twitter);
                    casterPronouns[i].innerText = caster.pronouns;
                }
                for (var i = numCasters; i < 3; i++) {
                    mainCasterWrappers[i].style.display = "none";
                    casterNames[i].style.display = "none";
                    casterSocials[i].style.display = "none";
                    casterPronouns[i].style.display = "none";
                }
                castersNamesStack.style.fontSize = numCasters >= 3 ? ".75em" : "1em";
                castersSocialsStack.style.fontSize = numCasters >= 3 ? ".75em" : "1em";
            }
        })
            .to([mainCasterWrappers[0].parentElement, ...casterNames, ...casterSocials], {
            opacity: 1,
            duration: .45,
            ease: "power2.out"
        }, "+=.25");
    });
});
//# sourceMappingURL=casters.js.map