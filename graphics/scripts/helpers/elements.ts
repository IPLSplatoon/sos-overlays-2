import { mapNameToImagePath } from "./constants.js";

export function getElementById(id) : HTMLElement | undefined {
    return document.getElementById(id) as HTMLElement;
}

export function getPlayerElement(name: string) : HTMLElement{
    const elim = document.createElement("fitted-text");
    elim.setAttribute("text", name);
    elim.setAttribute("max-width", "380");
    elim.classList.add("player");
    return elim;
}

export function getMapElement(name: string, mode: string) : HTMLElement{
    const stage = document.createElement("div");
    stage.classList.add("stage");
    stage.style.background = `var(--gradient), url('./assets/stages/${mapNameToImagePath[name]}')`;

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