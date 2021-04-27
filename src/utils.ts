export const randomRange = (min: number, max: number) => {
  return min + Math.floor(Math.random() * (max - min + 1));
};

export const getRollDiceMessage = (random: number, value: number) => {
  if (value === 100) {
    if (random <= 5)
      return `${random} Succès critique ! <:de:695949484097667092>\nhttps://tenor.com/view/jim-carrey-ace-ventura-thumbs-up-smile-smiling-gif-5194908`;

    if (random >= 95)
      return `${random} Échec critique ! <:issou:696128460740886590> `;

    if (random >= 90 && random < 95)
      return `${random} C'est pas un échec critique ! C'est pas un échec critique !`;
  }

  return random;
};
