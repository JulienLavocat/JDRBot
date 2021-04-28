export const randomRange = (min: number, max: number) => {
	return min + Math.floor(Math.random() * (max - min + 1));
};

const SUCCESS_EMOJI = "<:de:695949484097667092>";
const FAIL_EMOJI = "<:issou:696128460740886590>";

const SUCCESS_GIFS = [
	"https://tenor.com/view/jim-carrey-ace-ventura-thumbs-up-smile-smiling-gif-5194908",
	"https://tenor.com/view/yes-baby-goal-funny-face-gif-13347383",
];

export const getRollDiceMessage = (random: number, value: number) => {
	if (value === 100) {
		if (random <= 5)
			return `${random} Succès critique ! ${SUCCESS_EMOJI}\n${getSuccessGif()}`;

		if (random >= 95) return `${random} Échec critique ! ${FAIL_EMOJI}`;

		if (random >= 90 && random < 95)
			return `${random} C'est pas un échec critique ! C'est pas un échec critique !`;
	}

	return random;
};

export function getSuccessGif() {
	return SUCCESS_GIFS[Math.floor(Math.random() * SUCCESS_GIFS.length)];
}
