import "../break/bubbles.js";
import gsap from '../../../node_modules/gsap/all.js';

const bracketData = nodecg.Replicant('bracketData', 'ipl-overlay-controls');

const renderer = new TourneyviewRenderer.BracketRenderer({
    animator: new TourneyviewRenderer.D3BracketAnimator(),
    swissOpts: {
        cellHeight: 75,
        columnGap: 16,
        rowGap: 2,
        onCellCreation(selection) {
            selection.selectAll('.match-cell__bottom-team-name').each(function() {
                const separator = document.createElement('div');
                separator.classList.add('separator');
                this.parentNode.insertBefore(separator, this);
            })
        }
    },
    roundRobinOpts: {
        maxScale: 1.75,
        columnGap: 6
    },
    eliminationOpts: {
        onCellCreation(selection) {
            selection.selectAll('.match-cell__bottom-team-name').each(function() {
                const separator = document.createElement('div');
                separator.classList.add('separator');
                this.parentNode.insertBefore(separator, this);
            })
        }
    }
});

const bracketContainer = document.getElementById('bracket-container');
bracketContainer.appendChild(renderer.element);
const bracketTitleText = document.getElementById('bracket-title-text');

document.addEventListener('DOMContentLoaded', async () => {
    await document.fonts.load('400 32px Dosis');

    bracketData.on('change', newValue => {
        if (newValue != null) {
            void renderer.setData(newValue);

            const bracketTitle = buildBracketTitle(newValue);
            if (bracketTitleText.getAttribute('text') !== bracketTitle) {
                gsap.to(bracketTitleText, {
                    opacity: 0,
                    duration: 0.35,
                    onComplete: () => {
                        bracketTitleText.setAttribute('text', bracketTitle);
                        gsap.to(bracketTitleText, { opacity: 1, duration: 0.35 });
                    }
                });
            }
        }
    });
});

function buildBracketTitle(bracketData) {
    const title = bracketData.matchGroups.length === 1 && bracketData.matchGroups[0].name !== bracketData.name
        ? bracketData.matchGroups[0].name
        : bracketData.name;

    if (bracketData.roundNumber != null) {
        return `${title} - Round ${bracketData.roundNumber}`;
    } else {
        return title;
    }
}
