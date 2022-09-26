import { nowPlaying } from '../helpers/replicants.js';
import gsap from '../../../node_modules/gsap/all.js';

const mainMusic = document.getElementById("main-music-title");
const barMusic = document.getElementById("bar-music-title");

nowPlaying.on('change', newValue => {
    const tl = gsap.timeline();

    tl.to([mainMusic, barMusic], {
        opacity: 0,
        duration: .25,
        ease: "power2.out",
        onComplete: function(){
            mainMusic.setAttribute("text", `${newValue.artist} - <b>${newValue.song}</b>`);
            barMusic.setAttribute("text", `${newValue.artist} - ${newValue.song}`);
        }
    })
    .to([mainMusic, barMusic], {
        opacity: 1,
        duration: .25,
        ease: "power2.in"
    });
});