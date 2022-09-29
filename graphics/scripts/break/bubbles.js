import gsap from '../../../node_modules/gsap/all.js';
const pwidth = 1920;
const pheight = 2700;
const numBubbles = 30;
const bubbleTemplate = '<div class="bubble"><svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circle-svg" cx="40" cy="40" r="40" fill="#6E9AA3" fill-opacity="0.25""/></svg></div>';
const bubblesWrapper = document.querySelector("#bubbles-wrapper");
bubblesWrapper.innerHTML = bubblesWrapper.innerHTML + bubbleTemplate.repeat(numBubbles);
const bubbles = document.querySelectorAll(".bubble");
gsap.to("#turb-freq", { duration: 15, attr: { baseFrequency: 0.004 }, repeat: -1, yoyo: true, ease: "Sine.easeInOut" });
gsap.to("#turb-displacement", { duration: 23, attr: { scale: 50 }, repeat: -1, yoyo: true, ease: "Sine.easeInOut" });
gsap.to("#noise-freq", { duration: 23, attr: { baseFrequency: 0.004 }, repeat: -1, yoyo: true, ease: "Sine.easeInOut" });
bubbles.forEach((bubble, num) => {
    bubble.id = "bubble-" + num;
    initBubble(bubble.id, num / 2);
});
function initBubble(id, overrideDelay = 0) {
    const bubble = document.querySelector("#" + id);
    bubble.style.left = `${getRandomNum(-50, pwidth + 50)}px`;
    const blur = getRandomInt(2, 19);
    bubble.style.filter = `blur(${blur}px)`;
    const duration = getRandomInt(9, 15);
    const delay = overrideDelay == 0 ? getRandomNum(0, 6) : overrideDelay;
    const scale = getRandomNum(.3, .9);
    const opacity = getRandomNum(.7, 1);
    const horMovement = getRandomInt(15, 140);
    const horDuration = getRandomInt(3, 5);
    const horTl = gsap.timeline({ repeat: ((duration + delay) / horDuration) });
    horTl.fromTo(bubble, { x: -horMovement }, { duration: horDuration, x: horMovement, ease: 'sine.inOut' });
    horTl.to(bubble, { duration: horDuration, x: -horMovement, ease: 'sine.inOut' });
    gsap.fromTo(bubble, { y: pheight + 100, scale: scale, opacity: opacity }, { y: -100, scale: scale, opacity: getRandomNum(.1, .4), duration: duration, delay: delay, ease: 'none', onComplete: () => {
            initBubble(id);
        } });
}
//min and max inclusive
function getRandomNum(min, max) {
    return Math.random() * (max - min) + min;
}
function getRandomInt(min, max) {
    return Math.floor(getRandomNum(min - 1, max) + 1);
}
//# sourceMappingURL=bubbles.js.map