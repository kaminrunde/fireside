import * as React from "react";
import styled from "styled-components";
import ComponentList from "widgets/ComponentList";
import { useLoadingStatus } from "modules/connector";
import ClockLoader from "react-spinners/ClockLoader";

export default function IndexRoute() {
  const loadingStatus = useLoadingStatus();
  return (
    <Wrapper>
      {loadingStatus.data && (
        <div className="loading">
          {/* @ts-expect-error react-spinners types not yet compatible with React 19 types */}
          <ClockLoader color="#8bc34a" loading size={50} />

          <span className="label">Collecting data...</span>
        </div>
      )}
      {loadingStatus.data || <ComponentList />}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  > .loading {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    > .label {
      margin-top: 20px;
      font-family: "Open Sans", sans-serif;
      color: #555;
    }
  }
`;
