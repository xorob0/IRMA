import React, { useEffect, useState, useCallback } from "react"
const paper = "📝"
const rock = "🗿"
const scissor = "✂️"
const choices = [rock, paper, scissor]

const IndexPage = () => {
  const [playerChoice, setPlayerChoice] = useState(undefined)
  const [computerChoice, setComputerChoice] = useState(undefined)

  const play = useCallback(
    choice => {
      setPlayerChoice(choice)
      calculate()
    },
    [setPlayerChoice]
  )

  const calculate = useCallback(
    () => setComputerChoice(choices[Math.floor(Math.random() * 3)]),
    [setComputerChoice]
  )

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
