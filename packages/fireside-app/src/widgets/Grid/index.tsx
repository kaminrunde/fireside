import Grid from "./Grid";
import React from "react";
import styled from "styled-components";

type Props = {
  mediaSize: string;
};

type State = {
  error: null | string;
};

export default class GridWrapper extends React.Component<Props, State> {
  state = { error: null };
  componentDidCatch(e: any) {
    console.log(e);
    this.setState({ error: e });
  }
  render() {
    if (this.state.error) {
      return (
        <Wrapper>
          <p>an error happened</p>
          <button onClick={() => this.setState({ error: null })}>reload</button>
        </Wrapper>
      );
    }
    return <Grid {...this.props} />;
  }
}

const Wrapper = styled.div`
  text-align: center;
  > p {
    font-size: 30px;
  }
  > button {
    padding: 10px;
    font-size: 30px;
  }
`;
