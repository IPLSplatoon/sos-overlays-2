export function getElementById(id) : HTMLElement | undefined {
    return document.getElementById(id) as HTMLElement;
}

export function getPlayerElement(name: string){
    const elim = document.createElement("fitted-text");
    elim.setAttribute("text", name);
    elim.setAttribute("max-width", "380");
    elim.classList.add("player");
    return elim;
}