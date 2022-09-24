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
//# sourceMappingURL=elements.js.map