import * as R from "ramda"

const getAllGrams = n => {
  if (typeof n !== "number" || isNaN(n) || n < 1 || n === Infinity) {
    throw new Error("`" + n + "` is not a valid argument")
  }

  return value => {
    let nGrams = []
    let index

    if (value === null || value === undefined) {
      return nGrams
    }

    value = value.slice ? value : String(value)
    index = value.length - n + 1

    if (index < 1) {
      return nGrams
    }

    while (index--) {
      nGrams[index] = value.slice(index, index + n)
    }

    return nGrams
  }
}

export const guessNext = (hist, choices, n = 5) => {
  const allGrams = getAllGrams(n)([...hist])

  return choices
    .reduce((stats, choice) => {
      const [_, ...testGram] = [...allGrams[allGrams.length - 1], choice]

      return [
        ...stats,
        {
          choice,
          score: allGrams.filter(gram => R.equals(gram, testGram)).length,
        },
      ]
    }, [])
    .reduce(
      (bestMatch, stat) => {
        return stat.score === bestMatch.score
          ? {
              score: stat.score,
              choice: choices[Math.floor(Math.random() * choices.length)],
            }
          : stat.score > bestMatch.score
          ? stat
          : bestMatch
      },
      { score: 0, choice: choices[Math.floor(Math.random() * choices.length)] }
    ).choice
}
