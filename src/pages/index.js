import React, { useEffect, useState, useCallback } from "react"
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

const guessNext = (hist, n = 5) => {
  console.log("hist", hist)
  const allGrams = getAllGrams(n)([...hist])
  console.log(allgrams)

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
        console.log("stat", stat)
        return stat.score > bestMatch.score ? stat : bestMatch
      },
      { score: -1 }
    )
}

const paper = "📝"
const rock = "🗿"
const scissor = "✂️"
const choices = [rock, paper, scissor]

const IndexPage = () => {
  const [hist, setHist] = useState([])
  const [playerChoice, setPlayerChoice] = useState(undefined)
  const [computerChoice, setComputerChoice] = useState(undefined)
  const [guessedChoice, setGuessedChoice] = useState(undefined)

  const play = useCallback(
    choice => {
      console.log("hist1", hist)
      setHist(hist => [...hist, choice])
      setPlayerChoice(choice)
      setComputerChoice(guessedChoice)
      calculate(hist)
    },
    [hist, setHist, setPlayerChoice]
  )

  const calculate = useCallback(hist => setGuessedChoice(guessNext(hist)), [
    setGuessedChoice,
  ])

  return (
    <div>
      <button onClick={() => play(paper)}>📝</button>
      <button onClick={() => play(rock)}>✂️</button>
      <button onClick={() => play(scissor)}>🗿</button>
      <p>
        {playerChoice} vs {computerChoice}
      </p>
    </div>
  )
}

export default IndexPage
