import React, { useEffect, useState, useCallback } from "react"
import * as R from "ramda"
import useKey from "use-key-hook"

const paper = "📝"
const rock = "🗿"
const scissor = "✂️"
const choices = [rock, paper, scissor]

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

const getBeater = choice =>
  choice === rock ? paper : choice === paper ? scissor : rock

const IndexPage = () => {
  const [hist, setHist] = useState([])
  const [playerChoice, setPlayerChoice] = useState(undefined)
  const [computerChoice, setComputerChoice] = useState(undefined)
  const [guessedChoice, setGuessedChoice] = useState(undefined)
  const [totalPlays, setTotalPlays] = useState(0)
  const [playerWins, setPlayerWins] = useState(0)
  const [computerWin, setComputerWin] = useState(0)
  const [draw, setDraw] = useState(0)
  const [keyPressed, setKeyPressed] = useState(undefined)

  useKey(
    pressedKey => {
      setKeyPressed(pressedKey)
    },
    {
      detectKeys: ["j", "k", "l"],
      keyevent: "keydown",
    }
  )

  useKey(
    () => {
      setKeyPressed(undefined)
    },
    {
      detectKeys: ["j", "k", "l"],
      keyevent: "keyup",
    }
  )

  useEffect(() => {
    keyPressed === 106
      ? play(rock)
      : keyPressed === 107
      ? play(paper)
      : keyPressed === 108 && play(scissor)
  }, [keyPressed])

  const play = useCallback(
    choice => {
      setTotalPlays(plays => plays + 1)
      calculate([...hist, choice])
      setHist(hist => [...hist, choice])
      setPlayerChoice(choice)
      setComputerChoice(guessedChoice)
    },
    [hist, setHist, setPlayerChoice]
  )

  useEffect(() => {
    playerChoice === computerChoice
      ? setDraw(draw => draw + 1)
      : getBeater(playerChoice) === computerChoice
      ? setComputerWin(wins => wins + 1)
      : setPlayerWins(wins => wins + 1)
  }, [
    setComputerWin,
    setPlayerWins,
    setDraw,
    computerChoice,
    playerChoice,
    totalPlays,
  ])

  const calculate = useCallback(
    hist => setGuessedChoice(getBeater(guessNext(hist))),
    [setGuessedChoice]
  )

  return (
    <div>
      <p> Player : {playerWins}</p>
      <p> Computer : {computerWin}</p>
      <p> Draws : {draw}</p>
      <p>Computer Ratio : {(100 * computerWin) / (computerWin + playerWins)}</p>
      <button onClick={() => play(paper)}>{paper}</button>
      <button onClick={() => play(rock)}>{rock}</button>
      <button onClick={() => play(scissor)}>{scissor}</button>
      <p>
        {playerChoice} vs {computerChoice}
      </p>
    </div>
  )
}

export default IndexPage
