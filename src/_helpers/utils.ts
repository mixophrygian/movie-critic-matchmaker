import { userChoices } from '../stores.js'

export function pick20RandomMovies() {
  // for testing
  let out = shuffle([1])
  //let out = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
  return out
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
      console.log('swiped left', title)
      userChoices.update(choices => [...choices, { title, broadRating: "rotten" }])
      break;
    case 4:
      console.log('swiped right', title)
      userChoices.update(choices => [...choices, { title, broadRating: "fresh" }])
      break;
    case 8:
      console.log('swiped up', title)
      break;
    default:
      console.log('swiped some other way', directionInt, title)
  }
}


export function showResults() {
  // calculate matching and unmatching critics
  // navigate to a "results" page
  console.log('show results')
}
