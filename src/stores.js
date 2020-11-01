import { writable, readable, derived } from 'svelte/store';

export const allMovies = writable([])

// export const randomMovies = derived(allMovies, ($allMovies, set) => {
//     const randomIndexes = pick20RandomMovies()
//     const randomMoviesFromIndexes = randomIndexes.map(index => $allMovies[index])
//     set(randomMoviesFromIndexes)
//     return function destroy() {}
// })

