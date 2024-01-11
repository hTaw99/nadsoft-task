import { getStates } from "@/api/states";
import { useAppDispatch } from "@/hooks/rtkHooks";
import { useQuery } from "@/hooks/useQuery";
import {
  setSelectedMultipleStates,
  setSelectedState,
} from "@/store/features/statesSlice";
import { Skeleton } from "@/styles/Skeleton.style";
import styled from "styled-components";

const ComponentContainer = styled.li`
  position: absolute;
  background-color: white;
  border: 1px solid rgba(0, 0, 0, 0.2);
  padding: 1rem;
  border-radius: 4px;
  margin-top: 8px;
  overflow-y: scroll;
  max-height: 300px;
  right: 0;
`;

const ListContainer = styled.li`
  display: flex;
  gap: 8px;
  flex-direction: column;
`;

const SingleLi = styled.li`
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 4px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;
const SkeletonListContainer = styled.li`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`;

// const SkeletonSingleLi = styled.li`
//   background-color: rgba(0, 0, 0, 0.1);
//   width: 100px;
//   border-radius: 4px;
//   height: 16px;
// `;

export default function List({
  multiple,
  setIsListOpen,
}: {
  multiple: boolean;
  setIsListOpen: (val: boolean) => void;
}) {
  const { data: states, isLoading } = useQuery({
    queryFn: getStates,
    queryKey: ["states"],
  });

  const dispatch = useAppDispatch();

  return (
    <ComponentContainer>
      {isLoading ? (
        <SkeletonListContainer>
          {[1, 1, 1, 1, 1, 1, 1, 1, 1, 1]?.map((_, i) => (
            <Skeleton key={i} />
          ))}
        </SkeletonListContainer>
      ) : (
        <ListContainer>
          {states?.map((state) => (
            <SingleLi
              key={state.code}
              onClick={() => {
                if (multiple) {
                  dispatch(setSelectedMultipleStates(state));
                } else {
                  dispatch(setSelectedState(state));
                }
                setIsListOpen(false);
              }}
            >
              {state.name}
            </SingleLi>
          ))}
        </ListContainer>
      )}
    </ComponentContainer>
  );
}
