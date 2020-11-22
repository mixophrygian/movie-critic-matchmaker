import { writable, derived } from 'svelte/store';
import { pickNRandomMovies, HOW_MANY_MOVIES_TO_SHOW, getNRandomExcludingPrevious } from './_helpers/utils.ts'

export const allMovies = writable([])

export const secondTimeThrough = writable(false)

export const randomMovies = derived([allMovies, secondTimeThrough], ([$allMovies, $secondTimeThrough], set) => {
    let randomIndexes
    if(!$secondTimeThrough) {
        randomIndexes = pickNRandomMovies(HOW_MANY_MOVIES_TO_SHOW)
        previousRandomIndexes = randomIndexes
    } else {
        randomIndexes = getNRandomExcludingPrevious(HOW_MANY_MOVIES_TO_SHOW, previousRandomIndexes)
    }
    const randomMoviesFromIndexes = randomIndexes.map(index => $allMovies[index])
    set(randomMoviesFromIndexes)
})

let previousRandomIndexes = [] 

export const criticObjects = writable([])

export const userChoices = writable([])

export const userSkipped = writable([])

export const progressBars = writable({fresh: 0, rotten: 0})

// {movies: [{title: Evil Dead, broadRating: rotten}]}
export const completedChoices = writable(false)
