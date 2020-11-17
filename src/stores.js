import { writable, derived } from 'svelte/store';
import { pickNRandomMovies, HOW_MANY_MOVIES_TO_SHOW } from './_helpers/utils.ts'

export const allMovies = writable([])

export const randomMovies = derived(allMovies, ($allMovies, set) => {
    const randomIndexes = pickNRandomMovies(HOW_MANY_MOVIES_TO_SHOW)
    const randomMoviesFromIndexes = randomIndexes.map(index => $allMovies[index])
    set(randomMoviesFromIndexes)
})

export const criticObjects = writable([])

export const userChoices = writable([])

export const progressBars = writable({fresh: 0, rotten: 0})

// {movies: [{title: Evil Dead, broadRating: rotten}]}
export const completedChoices = writable(false)
