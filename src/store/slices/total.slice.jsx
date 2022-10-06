import { createSlice } from '@reduxjs/toolkit';

export const totalSlice = createSlice({
    name: 'total',
    initialState: 0,
    reducers: {
        sumCart: () => {
            return 10
        }
    }
})

export const { sumCart } = totalSlice.actions;

export default totalSlice.reducer;
