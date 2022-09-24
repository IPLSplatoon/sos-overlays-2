import gsap from '../../../node_modules/gsap/all.js';
export function animInit() {
    initBreakBottomBar();
    initBottomBar();
}
function initBreakBottomBar() {
    const breakBottomBarTl = gsap.timeline({
        repeat: -1
    });
    const elements = document.querySelectorAll(".break-bottom-bar > .wrapper");
    for (var i = 0; i < elements.length; i++) {
        const e = elements[i];
        e.style.display = "none";
        breakBottomBarTl.fromTo(e, {
            display: "none",
            opacity: 0,
            x: 50
        }, {
            display: "flex",
            opacity: 1,
            x: 0,
            duration: .6,
            ease: "power2.out"
        });
        breakBottomBarTl.to(e, {
            display: "none",
            opacity: 0,
            x: -50,
            duration: .4,
            ease: "power2.in"
        }, `+=${6 + e.children.length}`);
    }
}
function initBottomBar() {
    const bottomBarTl = gsap.timeline({
        repeat: -1
    });
    const elements = document.querySelectorAll(".bottom-bar > .left > .wrapper");
    for (var i = 0; i < elements.length; i++) {
        const e = elements[i];
        e.style.display = "none";
        bottomBarTl.fromTo(e, {
            display: "none",
            opacity: 0,
            y: 5
        }, {
            display: "flex",
            opacity: 1,
            y: 0,
            duration: .6,
            ease: "power2.out"
        });
        bottomBarTl.to(e, {
            display: "none",
            opacity: 0,
            y: -5,
            duration: .4,
            ease: "power2.in"
        }, "+=7");
    }
}
//# sourceMappingURL=anim.js.map