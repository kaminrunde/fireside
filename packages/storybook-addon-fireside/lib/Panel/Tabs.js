import * as React from "react";
import styled from "styled-components";
export default function Tabs(props) {
    if (props.tabs.tabs.length === 1)
        return null;
    return (React.createElement(Wrapper, null, props.tabs.tabs.map((tab) => (React.createElement(Tab, { key: tab, active: (tab === props.tabs.activeTab).toString(), children: tab, onClick: () => props.tabs.setActiveTab(tab) })))));
}
const Wrapper = styled.div `
  display: flex;
  border-bottom: 1px solid lightgrey;
`;
const Tab = styled.button `
  padding: 10px;
  border: none;
  background: none;
  border-bottom: 2px solid transparent;
  cursor: pointer;
  color: #333;
  ${(props) => props.active === "true" &&
    `
    color: #1da7fd;
    border-bottom: 2px solid #1da7fd;;
    font-weight: bold;
  `}
`;
