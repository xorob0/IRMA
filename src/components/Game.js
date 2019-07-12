import React, { useState, useEffect } from "react"
import styled from "styled-components"
import { choices, rock, paper, scissor, getBeater } from "../constants/choices"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-grow: 2;
`

const GamesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: ${200 + 3 * 140}px;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
`

const Versus = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-grow: 2;
  background: ${({ color }) => color};
  margin: 10px;
  max-width: ${({ small }) => (small ? "400px" : "450px")};
  max-height: ${({ small }) => (small ? "120px" : "200px")};
  flex-shrink: 1;
`

const Choice = styled.img`
  width: ${({ small }) => (small ? "100px" : "160px")};
  height: ${({ small }) => (small ? "100px" : "160px")};
  padding: 10px;
`

const Text = styled.p`
  font-family: Nova Flat;
  font-style: normal;
  font-weight: normal;
  font-size: 32px;
  margin: 0px 10px;

  color: #dcdcdc;
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-grow: 2;
  margin: 10px;
`

const Button = styled.div`
  background: #f4f4f4;
  padding: 20px;
  margin: 20px;
  border-radius: 50%;
`

const images = {
  [rock]: require("../../public/images/icons8-rock-80.png"),
  [paper]: require("../../static/images/icons8-paper-plane-80.png"),
  [scissor]: require("../../static/images/icons8-scissors-80.png"),
}

export default ({
  play,
  playerChoice,
  computerChoice,
  children,
  totalPlays,
}) => {
  const [lastGames, setLastGames] = useState([])

  useEffect(() => {
    setLastGames(lastGames => {
      const allLast = [...lastGames, { playerChoice, computerChoice }]
      return allLast.length > 4
        ? allLast.slice(Math.max(allLast.length - 4, 1))
        : allLast
    })
  }, [setLastGames, playerChoice, computerChoice, totalPlays])

  return (
    <Wrapper>
      {children}
      <GamesWrapper>
        {lastGames.slice().map(
          (game, index) =>
            !!game.playerChoice &&
            !!game.computerChoice && (
              <Versus
                small={index < lastGames.length - 1}
                color={
                  getBeater(game.playerChoice) === game.computerChoice
                    ? "#E91E63"
                    : game.playerChoice === game.computerChoice
                    ? "#C2C2C2"
                    : "#4FC3F7"
                }
              >
                <Choice
                  src={images[game.playerChoice]}
                  small={index < lastGames.length - 1}
                />
                <Text small={index < lastGames.length - 1}>VS</Text>
                <Choice
                  src={images[game.computerChoice]}
                  small={index < lastGames.length - 1}
                />
              </Versus>
            )
        )}
      </GamesWrapper>
      <ButtonsWrapper>
        {choices.map(choice => (
          <Button onClick={() => play(choice)}>
            <img src={images[choice]} />
          </Button>
        ))}
      </ButtonsWrapper>
    </Wrapper>
  )
}
