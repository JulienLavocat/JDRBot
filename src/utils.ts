export const randomRange = (min: number, max: number) => {
	return min + Math.floor(Math.random() * (max - min + 1));
};

const SUCCESS_EMOJI = "<:de:695949484097667092>";
const FAIL_EMOJI = "<:issou:696128460740886590>";

const SUCCESS_GIFS = [
	"https://tenor.com/view/jim-carrey-ace-ventura-thumbs-up-smile-smiling-gif-5194908",
	"https://tenor.com/view/yes-baby-goal-funny-face-gif-13347383",
];

const FAIL_GIF = [
	"https://tenor.com/view/gandalf-old-man-naked-take-robe-off-funny-gif-17224126",
];

const NEAR_SUCCESS_GIF = [
	"https://tenor.com/view/so-close-nick-young-for-three-in-and-out-lol-gif-16815386",
	"https://tenor.com/view/so-close-basketball-thomas-morris-gif-18086098",
];

const NEAR_FAIL_GIF = [
	"https://tenor.com/view/sweating-nervous-paranoid-gif-4974019",
];

export const getRollDiceMessage = (random: number, value: number) => {
	random = 10;
	if (value === 100) {
		if (random <= 5)
			return `${random} Succès critique ! ${SUCCESS_EMOJI}\n${getSuccessGif()}`;

		if (random <= 10 && random > 5)
			return `${random}\n${getNearSuccessGif()}`;

		if (random >= 95)
			return `${random} Échec critique ! ${FAIL_EMOJI}\n${getFailGif()}`;

		if (random >= 90 && random < 95)
			return `${random} C'est pas un échec critique ! C'est pas un échec critique !\n${getNearFailGif()}`;
	}

	return random;
};

export function getSuccessGif() {
	return SUCCESS_GIFS[Math.floor(Math.random() * SUCCESS_GIFS.length)];
}

export function getFailGif() {
	return FAIL_GIF[Math.floor(Math.random() * FAIL_GIF.length)];
}

export function getNearSuccessGif() {
	return NEAR_SUCCESS_GIF[
		Math.floor(Math.random() * NEAR_SUCCESS_GIF.length)
	];
}

export function getNearFailGif() {
	return NEAR_FAIL_GIF[Math.floor(Math.random() * NEAR_FAIL_GIF.length)];
}
