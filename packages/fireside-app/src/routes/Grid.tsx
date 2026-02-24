import * as React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Grid from "widgets/Grid";

export default function GridRoute() {
  const { mediaSize = "" } = useParams<{ mediaSize: string }>();
  return (
    <Wrapper>
      <Grid mediaSize={mediaSize} />
    </Wrapper>
  );
}

const Wrapper = styled.div``;
