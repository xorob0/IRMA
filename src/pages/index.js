import React, { useEffect, useState, useCallback } from "react"
import useKey from "use-key-hook"

import Layout from "../components/Layout"
import Score from "../components/Score"
import Game from "../components/Game"

import { rock, paper, scissor, choices, getBeater } from "../constants/choices"
import { guessNext } from "../utils/guessNext"

import styled, { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  body {
	margin: 0px;
  background: #434343;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: space-around;
  align-items: flex-start;
	padding: 20px;
  }
`

const Title = styled.h1`
  font-family: Nova Flat;
  font-style: normal;
  font-weight: normal;
  font-size: 64px;
  line-height: 77px;
  margin: 0px;

  color: #dcdcdc;
`

function precise(x) {
  return Number.parseFloat(x).toPrecision(4)
}

const IndexPage = () => {
  const [hist, setHist] = useState([])
  const [playerChoice, setPlayerChoice] = useState(undefined)
  const [computerChoice, setComputerChoice] = useState(undefined)
  const [guessedChoice, setGuessedChoice] = useState(
    choices[Math.floor(Math.random() * choices.length)]
  )
  const [totalPlays, setTotalPlays] = useState(0)
  const [playerWins, setPlayerWins] = useState(0)
  const [computerWins, setComputerWins] = useState(0)
  const [playerWinsAfter, setPlayerWinsAfter] = useState(0)
  const [computerWinsAfter, setComputerWinsAfter] = useState(0)
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
      console.log(choice)
      if (choice) {
        setTotalPlays(plays => plays + 1)
        calculate([...hist, choice])
        setHist(hist => [...hist, choice])
        setPlayerChoice(choice)
        setComputerChoice(guessedChoice)
      }
    },
    [hist, setHist, setPlayerChoice]
  )

  const computerWin = () => {
    setComputerWins(win => win + 1)
    totalPlays > 100 && setComputerWinsAfter(win => win + 1)
  }

  const playerWin = () => {
    setPlayerWins(win => win + 1)
    totalPlays > 100 && setPlayerWinsAfter(win => win + 1)
  }

  useEffect(() => {
    playerChoice === computerChoice
      ? setDraw(draw => draw + 1)
      : getBeater(playerChoice) === computerChoice
      ? computerWin()
      : playerWin()
  }, [
    setComputerWins,
    setPlayerWins,
    setDraw,
    computerChoice,
    playerChoice,
    totalPlays,
  ])

  const calculate = useCallback(
    hist => setGuessedChoice(getBeater(guessNext(hist, choices))),
    [setGuessedChoice]
  )

  return (
    <>
      <GlobalStyle />
      <Layout>
        <Score
          image={require("../../static/images/icons8-person-96.png")}
          score={playerWins}
        />
        <Game
          playerChoice={playerChoice}
          computerChoice={computerChoice}
          play={play}
          totalPlays={totalPlays}
        >
          <Title>
            {computerWins
              ? precise((100 * computerWins) / (computerWins + playerWins))
              : 0}
            % Effectiveness
          </Title>
        </Game>
        <Score
          image={require("../../static/images/icons8-fortune-teller-96.png")}
          score={computerWins}
        />
      </Layout>
    </>
  )
}

export default IndexPage
