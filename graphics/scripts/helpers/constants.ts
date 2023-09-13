import { assetPaths } from './replicants.js';

export const APP_WIDTH = 1920;
export const APP_HEIGHT = 1080;
export const DASHBOARD_BUNDLE_NAME = 'ipl-overlay-controls';

export function getStageImagePath(stageName: string): string {
	return assetPaths.value.stageImages[stageName] ?? './assets/unknown-stage.png';
}

export const modeNameToSvgPath: Record<string, string> = {
	"Turf War":"unknown.svg",
	"Splat Zones":"splat-zones.svg",
	"Tower Control":"tower-control.svg",
	"Rainmaker":"rainmaker.svg",
	"Clam Blitz":"clam-blitz.svg",
	
	"Unknown Mode":"unknown.svg",
	"Counterpick":"unknown.svg"
}