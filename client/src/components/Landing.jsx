import React from 'react'
import SignUp from './SignUp'
import LogoText from "./LogoText"
import styled from 'styled-components'


const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`
const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 66vw
`


export default function Landing() {
  return (
    <Container>
      <InnerContainer>
        <LogoText />
      </InnerContainer>
      <SignUp/>
    </Container>
  )
}
