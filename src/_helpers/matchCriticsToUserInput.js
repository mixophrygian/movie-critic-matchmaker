
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


  // TODO this sometimes causes a crash - withSkipped[index] can be undefined? Investigate

  const out = critics.map((critic, index) => {
    //console.log('with Skipped index', withSkipped[index])
    const skipped = withSkipped[index] ? withSkipped[index].skipped : []
    return [...critic, {skippedReccomendations: skipped}]
  })

  return out 
}


function sortCriticsByPercentageMatched(relevantCritics){
 const oldTopCritics = Object.entries(relevantCritics).sort(
         (a, b) => {
           const aMoviesAgreed = a[1].moviesAgreed ? a[1].moviesAgreed.length : 0
           const bMoviesAgreed = b[1].moviesAgreed ? b[1].moviesAgreed.length : 0
           const bMoviesDisagreed = b[1].moviesDisagreed ? b[1].moviesDisagreed.length : 0
           const aMoviesDisagreed = a[1].moviesDisagreed ? a[1].moviesDisagreed.length : 0
           return (bMoviesAgreed - bMoviesDisagreed) - (aMoviesAgreed - aMoviesDisagreed)
          }).map(critic => {
          const agreedLength = critic[1].moviesAgreed ? critic[1].moviesAgreed.length : 0
          const disagreedLength = critic[1].moviesDisagreed ? critic[1].moviesDisagreed.length : 0
          const percentageMatch = Math.floor((agreedLength / (agreedLength + disagreedLength)) * 100)
          return [...critic, {percentageMatch: percentageMatch}]
          }).sort(
            (a,b) => {
              return b[2].percentageMatch - a[2].percentageMatch
            }
          )
      return oldTopCritics
 }


export function selectTopAndBottomCritics(criticData) {
    return function (userChoices, userSkipped) {
      const relevantCritics = userChoices.reduce((output, movie) => {
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

        agreed.forEach((critic) => {
          if (output[critic.name]) {
            if(output[critic.name].moviesAgreed) {
              output[critic.name].moviesAgreed.push(movie)
            } else {
              output[critic.name].moviesAgreed = [movie]
            }
          } else {
            output[critic.name] = { moviesAgreed: [movie] }
          }
        })

        disagreed.forEach((critic) => {
          if (output[critic.name]) {
            if(output[critic.name].moviesDisagreed){
              output[critic.name].moviesDisagreed.push(movie)
            } else {
              output[critic.name].moviesDisagreed = [movie]
            }
          }
        })

        return output
      }, {})

  
      const criticsByVolume = Object.entries(relevantCritics).sort(
        (a, b) => {
          const bAgreed = b[1].moviesAgreed && b[1].moviesAgreed.length > 0 ? b[1].moviesAgreed.length : 0
          const aAgreed = a[1].moviesAgreed && a[1].moviesAgreed.length > 0 ? a[1].moviesAgreed.length : 0
          return bAgreed - aAgreed
        }
      ) 

      //const criticsByVolume =  Object.entries(relevantCritics).sort((a,b) => b[1].moviesAgreed.length - a[1].moviesAgreed.length)

      const criticsDisagreedByVolume = Object.entries(relevantCritics).sort(
        (a, b) => {
          const bDisagreed = b[1].moviesDisagreed ? b[1].moviesDisagreed.length : 0
          const aDisagreed = a[1].moviesDisagreed ? a[1].moviesDisagreed.length :0
          return bDisagreed - aDisagreed 
        }
      )

      const criticsByPercentage = sortCriticsByPercentageMatched(relevantCritics)

      const topTwo = [criticsByPercentage[0], criticsByPercentage.find(c => c[0] === criticsByVolume[0][0])]
      const bottomTwo = [criticsByPercentage.slice(criticsByPercentage.length - 1)[0], criticsByPercentage.find(c => c[0] === criticsDisagreedByVolume[0][0])]
      //console.log(topTwo, bottomTwo)
      const topWithSkippedRecommendations = getSkippedRecommendations(criticData, topTwo, userSkipped)
      const bottomWithSkippedRecommendations = getSkippedRecommendations(criticData, bottomTwo, userSkipped)
      
      return { agreed: topWithSkippedRecommendations, disagreed: bottomWithSkippedRecommendations}
    }
}
