import { BoardType, PedalType } from '@/types/Pedal';
import { PayloadAction, createSlice, current } from '@reduxjs/toolkit';

type BoardState = BoardType;

const initialState = {
  id: undefined,
  userId: undefined,
  name: '',
  pedals: [],
} as BoardState;

export const board = createSlice({
  name: 'board',
  initialState,
  reducers: {
    reset: (_state, _action) => {
      return initialState;
    },
    setBoard: (_state, action: PayloadAction<BoardType>) => {
      return action.payload;
    },
    setBoardName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setPedals: (state, action: PayloadAction<Array<PedalType>>) => {
      state.pedals = action.payload;
    },
    addPedal: (state, action: PayloadAction<PedalType>) => {
      if (state.pedals) {
        state.pedals.push(action.payload);
      }
    },
    removePedal: (state, action: PayloadAction<number>) => {
      if (state.pedals?.length) {
        const newPedals = state.pedals.filter(
          (_pedal, index) => index !== action.payload
        );
        state.pedals = newPedals;
      }
    },
    setPotValue: (
      state,
      action: PayloadAction<{
        pedalIndex: number;
        potIndex: number;
        newValue: number;
      }>
    ) => {
      const { pedalIndex, potIndex, newValue } = action.payload;

      const pedal = state.pedals?.find((_pedal, i) => i === pedalIndex);
      if (pedal) {
        const pot = pedal.pots?.find((_pot, j) => j === potIndex);
        if (pot) {
          pot.value = newValue;
        }
      }
    },
    insertPedalAtIndex: (state, action: PayloadAction<number>) => {
      // TODO Fix
      // const newPedals = state.pedals.splice(action.payload, 0, action.payload);
      // state.pedals = newPedals;
    },
    setActivePedal: (
      state,
      action: PayloadAction<{ pedalIndex: number; newValue: boolean }>
    ) => {
      const { pedalIndex, newValue } = action.payload;
      if (state.pedals?.length) {
        const pedal = state.pedals.find((pedal, i) => i === pedalIndex);
        if (pedal) {
          pedal.isActive = newValue;
        }
      }
    },
    toggleActivePedal: (state, action: PayloadAction<number>) => {
      if (state.pedals?.length) {
        // state.pedals.splice(action.payload, 0 );
        const newPedals = state.pedals?.map((pedal, i) => {
          if (i === action.payload) {
            return { ...pedal, isActive: !pedal.isActive };
          } else {
            return pedal;
          }
        });
        state.pedals = newPedals;
      }
    },
  },
});

export const {
  reset,
  setBoard,
  setBoardName,
  addPedal,
  removePedal,
  setPedals,
  toggleActivePedal,
  setActivePedal,
  setPotValue,
} = board.actions;
export default board.reducer;
