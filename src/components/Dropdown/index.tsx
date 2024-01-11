import { useState } from "react";
import styled from "styled-components";
import List from "./List";
import { IoMdClose } from "react-icons/io";
import { IoChevronDown } from "react-icons/io5";
import { useAppDispatch, useAppSelector } from "@/hooks/rtkHooks";
import { deleteState } from "@/store/features/statesSlice";
import { Placeholder } from "@/styles/Placeholder.style";
import Title from "@/styles/Title.style";

const InputConatainer = styled.div`
  padding: 0.5rem 1rem;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 1px solid rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const DropdownContainer = styled.div<{ $mb?: number }>`
  position: relative;
  width: 50%;
  margin-bottom: ${(props) => `${props.$mb}rem`};
`;

export default function Dropdown({
  multiple = false,
  title = "",
}: {
  multiple?: boolean;
  title?: string;
}) {
  const [isListOpen, setisListOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { selectedState, selectedMultipleStates } = useAppSelector(
    (state) => state.states
  );

  let render;

  if (multiple) {
    if (selectedMultipleStates.length === 0) {
      render = <Placeholder>Select states for compare</Placeholder>;
    } else {
      render = (
        <ul
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            // justifyContent: "center",
            alignItems: "center",
          }}
        >
          {selectedMultipleStates.map((state) => (
            <li
              key={state.code}
              style={{
                padding: "0.2rem 0.5rem",
                backgroundColor: "#edede9",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <span>{state.name}</span>
              <button
                onClick={(e) => {
                  dispatch(deleteState(state.code));
                  e.stopPropagation();
                }}
                style={{
                  outline: "none",
                  border: "none",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <IoMdClose />
              </button>
            </li>
          ))}
        </ul>
      );
    }
  } else {
    render = (
      <span style={{ color: "rgba(0,0,0,1)" }}>
        {selectedState ? selectedState.name : "All states"}
      </span>
    );
  }

  return (
    <DropdownContainer>
      {/* ---------------- Title ---------------- */}
      {title && (
        <Title $mb={0.5} $varient="small">
          {title}
        </Title>
      )}

      {/* ---------------- Input ---------------- */}
      <InputConatainer onClick={() => setisListOpen(!isListOpen)}>
        {render}
        <IoChevronDown />
      </InputConatainer>

      {/* ---------------- List ---------------- */}
      {isListOpen && <List multiple={multiple} setIsListOpen={setisListOpen} />}
    </DropdownContainer>
  );
}
