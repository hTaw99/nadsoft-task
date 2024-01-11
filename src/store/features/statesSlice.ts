import { TState } from "@/types/states";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
  selectedState: TState | undefined;
  selectedMultipleStates: TState[];
};

const initialState: InitialState = {
  selectedMultipleStates: [],
  selectedState: undefined,
};

const statesSlice = createSlice({
  name: "states",
  initialState,

  reducers: {
    setSelectedMultipleStates(state, action: PayloadAction<TState>) {
      const { payload } = action;
      const isStateFound = state.selectedMultipleStates.some(
        (state) => state.code === payload.code
      );

      if (isStateFound) {
        state.selectedMultipleStates = state.selectedMultipleStates.filter(
          (state) => state.code !== payload.code
        );
      } else {
        state.selectedMultipleStates.push(payload);
      }
    },
    setSelectedState(state, action: PayloadAction<TState>) {
      const { payload } = action;
      state.selectedState = payload;
    },
    deleteState(state, action: PayloadAction<string>) {
      const { payload } = action;
      state.selectedMultipleStates = state.selectedMultipleStates.filter(
        (state) => state.code !== payload
      );
    },
  },
});

export const { setSelectedState, setSelectedMultipleStates, deleteState } =
  statesSlice.actions;
export default statesSlice.reducer;
