import { writable, derived } from 'svelte/store';
import { pick20RandomMovies } from './_helpers/utils.ts'

export const allMovies = writable([])

export const randomMovies = derived(allMovies, ($allMovies, set) => {
    const randomIndexes = pick20RandomMovies()
    const randomMoviesFromIndexes = randomIndexes.map(index => $allMovies[index])
    set(randomMoviesFromIndexes)
})

export const criticObjects = writable([])

export const userChoices = writable([])


// {movies: [{title: Evil Dead, broadRating: rotten}]}
export const completedChoices = writable(false)
