import { goto } from '@sapper/app';

export function pick20RandomMovies() {
  let out = shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19])
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

export function handleTouchStart(evt) {
  xDown = evt.touches[0].clientX
  yDown = evt.touches[0].clientY
}

let xDown
let yDown

function inRatingSection() {
  return window.location.pathname.substr(0, 5) === "/rate"
}

export function handleTouchMove(evt) {
  console.log(inRatingSection())
  if (!inRatingSection()) return
  if (!xDown || !yDown) {
    return
  }

  var xUp = evt.changedTouches[0].clientX
  var yUp = evt.changedTouches[0].clientY

  var xDiff = xDown - xUp
  var yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* left swipe */
      console.log("left swipe")
      goto("./rate/what-is-sapper")
    } else {
      console.log("right swipe")
      window.history.back()
      /* right swipe */
    }
  } else {
    if (yDiff > 0) {
      console.log("up swipe")
      /* up swipe */
    } else {
      console.log("down swipe")
      /* down swipe */
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}

export function recordUserChoice(directionInt) {
  switch (directionInt) {
    case 2:
      console.log('swiped left')
      break;
    case 4:
      console.log('swiped right')
      break;
    case 8:
      console.log('swiped up')
      break;
    default:
      console.log('swiped some other way', directionInt)
  }
}

export function showResults() {
  // calculate matching and unmatching critics
  // navigate to a "results" page
  console.log('show results')
}