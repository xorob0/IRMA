import React from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  align-content: center;
  flex-shrink: 1;
`

const Score = styled.p`
  font-family: Nova Flat;
  font-style: normal;
  font-weight: normal;
  font-size: 64px;
  line-height: 77px;

  color: #dcdcdc;
`

const Avatar = styled.img`
  width: 192px;
  height: 192px;
`

export default ({ image, score }) => (
  <Wrapper>
    <Avatar src={image} />
    <Score>{score}</Score>
  </Wrapper>
)
