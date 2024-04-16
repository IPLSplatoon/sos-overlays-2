import { casters } from '../helpers/replicants.js';
const wrapper = document.querySelector("#cam-wrapper");

NodeCG.waitForReplicants(casters).then(() => {
    casters.on("change", (newVal, oldVal) => {
        let changed = true;

        if (oldVal){
            changed = false;
            if (Object.keys(oldVal).length !== Object.keys(newVal).length) {
                changed = true;
            }
            for (const key in newVal) {
                if (newVal.hasOwnProperty(key)) {
                    if (oldVal[key].videoUrl ?? "" !== newVal[key].videoUrl ?? "") {
                        changed = true;
                        break;
                    }
                }
            }
        }

        if (!changed) return;

        wrapper.innerHTML = "";
        const isSmall = Object.keys(newVal).length > 2;
        for (const key in newVal) {
            if (newVal.hasOwnProperty(key)) {
                const caster = newVal[key];
                wrapper.innerHTML += getWebcamTemplate(caster, isSmall);
            }
        }
    });
});

function getWebcamTemplate(caster, isSmall) {
    return `
        <div class="caster-wrapper ${isSmall ? "small" : ""}">
            <iframe src="${caster.videoUrl}"></iframe>
            <div class="info-container">
                <div class="name">${caster.name}</div>
                <div class="socials">${caster.twitter}</div>
                <div class="pronouns-dark">${caster.pronouns}</div>
            </div>
        </div>
    `;
}