const HOW_MANY_CRITICS = 2

// sample user input

// const myPicks = [
//   { title: "Interstellar", broadRating: "rotten" },
//   { title: "The Amazing Spider-Man 2", broadRating: "fresh" },
//   { title: "Star Wars: The Last Jedi", broadRating: "rotten" },
//   { title: "Ghostbusters", broadRating: "rotten" },
//   { title: "Man of Steel", broadRating: "fresh" },
//   { title: "Solo: A Star Wars Story", broadRating: "rotten" },
//   { title: "Jurassic World: Fallen Kingdom", broadRating: "rotten" },
//   { title: "Cloud Atlas", broadRating: "rotten" },
//   { title: "Joker", broadRating: "fresh" },
//   { title: "Ready Player One", broadRating: "fresh" },
//   { title: "The Wolverine", broadRating: "fresh" },
//   { title: "Captain Marvel", broadRating: "rotten" },
// ]

// const sampleCriticOutput = {
//   "Liam Lacey": {
//     moviesAgreed: [
//       { title: "Interstellar", broadRating: "rotten" },
//       { title: "The Amazing Spider-Man 2", broadRating: "fresh" },
//       { title: "Star Wars: The Last Jedi", broadRating: "rotten" },
//     ],
//     skippedReviews: [
//       { title: "Red", broadRating: "rotten" },
//       { title: "Ferdinand", broadRating: "fresh" },
//     ]
//   },
// }

function getSkippedRecommendations(data, critics, skipped) {
  const criticsNamesOnly = [critics[0][0], critics[1][0]] 
  const wholeCritic = data.filter(criticObject => 
    criticsNamesOnly[0] == criticObject.name || 
    criticsNamesOnly[1] == criticObject.name  
  ) 
  const withSkipped = wholeCritic.map(critic => {
    let skippedAvailable = []
    skipped.forEach(skippedMovie => {
      const matchedMovie = critic.movies.find(criticMovie => criticMovie.title == skippedMovie.title)
      if(matchedMovie) {
        skippedAvailable.push(matchedMovie)
      }
    })
    return {name: critic.name, skipped: skippedAvailable}
  })
  const out = critics.map((criticArray, index) => {
    return [...criticArray, {skippedReccomendations: withSkipped[index].skipped}]
  })
  return out 
}

export function findCriticsWhoAgree(criticData) {
  return function (userChoices, userSkipped) {
    const criticsWhoAgree = userChoices.reduce((output, movie) => {
      const agreed = criticData.filter((critic) => {
        const criticMovie = critic.movies.find(
          (criticMovie) => movie.title === criticMovie.title
        )
        if (criticMovie) {
          if (criticMovie.broadRating === movie.broadRating) {
            return true
          } else {
            return false
          }
        }
      })
      agreed.forEach((critic) => {
        if (output[critic.name]) {
          output[critic.name].moviesAgreed.push(movie)
        } else {
          output[critic.name] = { moviesAgreed: [movie] }
        }
      })
      return output
    }, {})


    const criticsSorted = Object.entries(criticsWhoAgree).sort(
      (a, b) => b[1].moviesAgreed.length - a[1].moviesAgreed.length
    )
    const topTwo = criticsSorted.slice(0, HOW_MANY_CRITICS)
    const withSkippedRecommendations = getSkippedRecommendations(criticData, topTwo, userSkipped)
    return withSkippedRecommendations 
  }
}

export function findCriticsWhoDisagree(criticData) {
  return function (userChoices, userSkipped) {
    const criticsWhoDisagree = userChoices.reduce((output, movie) => {
      const disagreed = criticData.filter((critic) => {
        const criticMovie = critic.movies.find(
          (criticMovie) => movie.title === criticMovie.title
        )
        if (criticMovie) {
          if (criticMovie.broadRating == movie.broadRating) {
            return false
          } else {
            return true
          }
        }
      })
      disagreed.forEach((critic) => {
        const criticMovie = critic.movies.find(
          (criticMovie) => movie.title === criticMovie.title
        )
        if (output[critic.name]) {
          output[critic.name].moviesDisagreed.push(criticMovie)
        } else {
          output[critic.name] = { moviesDisagreed: [criticMovie] }
        }
      })
      return output
    }, {})

    const criticsSorted = Object.entries(criticsWhoDisagree).sort(
      (a, b) => b[1].moviesDisagreed.length - a[1].moviesDisagreed.length
    )
    const topTwo = criticsSorted.slice(0, HOW_MANY_CRITICS)
    const withSkippedRecommendations = getSkippedRecommendations(criticData, topTwo, userSkipped)
    return withSkippedRecommendations
  }
}

