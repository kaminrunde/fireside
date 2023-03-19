import * as React from "react";
import styled from "styled-components";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

type Props = {
  value: DropdownOption;
  options: DropdownOption[];
  onSelect: (currentIdx: DropdownOption) => void;
};

type DropdownOption = {
  key: string;
  label: string;
};

export default function Select(props: Props) {
  const [isOpen, setIsOpen] = React.useState(false);
  const wrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [wrapperRef]);

  return (
    <Wrapper ref={wrapperRef}>
      <Button className="btns" onClick={() => setIsOpen(!isOpen)}>
        {props.value.label} {isOpen ? <FiChevronUp /> : <FiChevronDown />}
      </Button>
      {isOpen && (
        <OptionsList>
          {props.options.map((option, i) => (
            <Option
              key={i}
              onClick={() => {
                props.onSelect(option);
                setIsOpen(false);
              }}
            >
              {option.label}
            </Option>
          ))}
        </OptionsList>
      )}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  position: relative;
  display: inline-block;
`;

const Button = styled.button`
  height: 40px;
  margin: 10px;
  font-size: 16px;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
`;

const OptionsList = styled.ul`
  position: absolute;
  background: #fff;
  border: 1px solid #ccc;
  list-style: none;
  margin: 0;
  padding: 0;
  z-index: 1;
`;

const Option = styled.li`
  padding: 8px 10px;
  cursor: pointer;
  white-space: nowrap;
  text-transform: none;

  &:hover {
    background-color: #f1f1f1;
  }
`;
