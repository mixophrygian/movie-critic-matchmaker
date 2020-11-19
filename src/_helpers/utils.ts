import { userChoices, userSkipped, progressBars } from '../stores.js'
export const HOW_MANY_MOVIES_TO_SHOW = 40
export const ONE_MOVIE_PERCENTAGE = 100 / HOW_MANY_MOVIES_TO_SHOW
const TOTAL_MOVIES = 98

export function pickNRandomMovies(N) {
  let arr = Array.from(Array(TOTAL_MOVIES).keys()).map(i => i);
  // for testing
  //let out = shuffle([1, 18, 23, 19])
  let out = shuffle(arr)
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


// For 40 movies, one rating adds 2.5%
// for skipped we split the difference on both
export function recordUserChoice(directionInt, title) {
  switch (directionInt) {
    case 2:
      userChoices.update(choices => [...choices, { title, broadRating: "rotten" }])
      progressBars.update(percents => {
        return { fresh: percents.fresh, rotten: percents.rotten + ONE_MOVIE_PERCENTAGE }
      });
      break;
    case 4:
      userChoices.update(choices => [...choices, { title, broadRating: "fresh" }])
      progressBars.update(percents => {
        return { fresh: percents.fresh + ONE_MOVIE_PERCENTAGE, rotten: percents.rotten }
      });
      break;
    case 8:
      progressBars.update(percents => {
        return { fresh: percents.fresh + ONE_MOVIE_PERCENTAGE / 2, rotten: percents.rotten + ONE_MOVIE_PERCENTAGE / 2 }
      });
      userSkipped.update(skipped => [...skipped, { title }])
      break;
    default:
  }
}

