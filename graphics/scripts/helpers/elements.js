import { getStageImagePath, modeNameToSvgPath } from './constants.js';
export function getElementById(id) {
    return document.getElementById(id);
}
export function getPlayerElement(name) {
    const elim = document.createElement("fitted-text");
    elim.setAttribute("text", name);
    elim.setAttribute("max-width", "380");
    elim.classList.add("player");
    return elim;
}
export function getMapElement(name, mode) {
    const stage = document.createElement("div");
    stage.classList.add("stage");
    stage.style.background = `var(--gradient), url('${getStageImagePath(name)}')`;
    const winner = document.createElement("div");
    winner.classList.add("winner");
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    const modeElim = document.createElement("div");
    modeElim.classList.add("mode");
    modeElim.innerText = mode;
    const mapElim = document.createElement("div");
    mapElim.classList.add("map");
    mapElim.innerText = name;
    infoContainer.appendChild(modeElim);
    infoContainer.appendChild(mapElim);
    stage.appendChild(winner);
    stage.appendChild(infoContainer);
    return stage;
}
export function getNextMatchMapElement(name, mode) {
    const stage = document.createElement("div");
    stage.classList.add("stage");
    stage.style.background = `var(--gradient), url('${getStageImagePath(name)}')`;
    stage.innerHTML = `<img src='assets/svg/${modeNameToSvgPath[mode]}'>`;
    return stage;
}
export function getMoreStagesElement(num) {
    const moreStages = document.createElement("div");
    moreStages.classList.add("stage", "more-stages");
    moreStages.innerText = "+" + num;
    return moreStages;
}
//# sourceMappingURL=elements.js.map