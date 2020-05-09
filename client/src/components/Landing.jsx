import React from "react";
import SignUp from "./SignUp";
import Login from "./Login";
import LogoText from "./LogoText";
import styled from "styled-components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const Container = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
`;

const InnerContainer = styled.div`
  display: flex;
  align-items: center;
  height: 100vh;
  width: 66vw;
`;

export default function Landing() {
  return (
    <Container>
      <InnerContainer>
        <LogoText />
      </InnerContainer>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={SignUp}/>
        </Switch>
      </Router>
    </Container>
  );
}
