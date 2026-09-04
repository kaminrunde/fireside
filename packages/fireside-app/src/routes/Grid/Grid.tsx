import * as React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";
import Grid from "widgets/Grid";
import InactiveMediaSize from "./InactiveMediaSize";
import { useActiveMediaSizes } from "modules/settings";

export default function GridRoute() {
  const { mediaSize = "" } = useParams<{ mediaSize: string }>();
  const ms = useActiveMediaSizes();

  return (
    <Wrapper>
      {ms.data[mediaSize] ? (
        <Grid mediaSize={mediaSize} />
      ) : (
        <InactiveMediaSize mediaSize={mediaSize} />
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div``;
