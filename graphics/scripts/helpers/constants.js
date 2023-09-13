import { assetPaths } from './replicants.js';
export const APP_WIDTH = 1920;
export const APP_HEIGHT = 1080;
export const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls';
export function getStageImagePath(stageName) {
    var _a;
    return (_a = assetPaths.value.stageImages[stageName]) !== null && _a !== void 0 ? _a : './assets/unknown-stage.png';
}
export const modeNameToSvgPath = {
    "Turf War": "unknown.svg",
    "Splat Zones": "splat-zones.svg",
    "Tower Control": "tower-control.svg",
    "Rainmaker": "rainmaker.svg",
    "Clam Blitz": "clam-blitz.svg",
    "Unknown Mode": "unknown.svg",
    "Counterpick": "unknown.svg"
};
//# sourceMappingURL=constants.js.map