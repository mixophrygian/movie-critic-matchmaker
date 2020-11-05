import { userChoices } from '../stores.js'

export function pick20RandomMovies() {
  // for testing
  //let out = shuffle([1])
  let out = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39])
  return out.slice(0, 20)
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


export function showResults() {
  // calculate matching and unmatching critics
  // navigate to a "results" page
}
