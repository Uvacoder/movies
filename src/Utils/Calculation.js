function randomInt(min, max) {
	return min + Math.floor((max - min) * Math.random());
}

function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

export default {
  randomInt,
  shuffleArray,
}