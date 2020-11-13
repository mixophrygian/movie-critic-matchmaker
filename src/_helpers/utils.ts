import { userChoices } from '../stores.js'
export const HOW_MANY_MOVIES_TO_SHOW = 40
const TOTAL_MOVIES = 98

export function pickNRandomMovies(N) {
  let arr = Array.from(Array(TOTAL_MOVIES).keys()).map(i => i);
  // for testing
  let out = shuffle([1, 18, 23])
  //let out = shuffle(arr)
  return out.slice(0, N + 1)
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function recordUserChoice(directionInt, title) {
  switch (directionInt) {
    case 2:
      userChoices.update(choices => [...choices, { title, broadRating: "rotten" }])
      break;
    case 4:
      userChoices.update(choices => [...choices, { title, broadRating: "fresh" }])
      break;
    case 8:
      break;
    default:
  }
}

