import { scoreboardData } from "../helpers/replicants.js";
const elim = document.getElementById("flavor-text");
scoreboardData.on("change", newValue => {
    console.log(newValue);
});
//# sourceMappingURL=flavortext.js.map