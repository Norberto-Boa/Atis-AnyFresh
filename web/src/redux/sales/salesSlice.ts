import { createSlice } from "@reduxjs/toolkit";
import { fetchSales, fetchSingleSale } from "./salesActions";
import { salesResponse } from "@/@types/userTypes";

interface initialStateData{
  loading: boolean;
  sales: salesResponse[] | []
  error: string | null;
}

const initialState = {
  loading: false,
  sales: [],
  error: null
} as initialStateData

const salesSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: {
    //fetch sales
    [fetchSales.pending.toString()]: (state) => {
      state.loading = true
      state.error = null
    },
    [fetchSales.fulfilled.toString()]: (state, { payload }) => { 
      state.loading = false
      state.sales = payload
    },
    [fetchSales.rejected.toString()]: (state, { payload }) => { 
      state.loading = false;
      state.error = payload;
    },

    //fetchSingleSale
    [fetchSingleSale.pending.toString()]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [fetchSingleSale.fulfilled.toString()]: (state, { payload }) => {
      state.loading = false;
      state.sales = payload;
    },
    [fetchSingleSale.rejected.toString()]: (state, {payload}) => {
      state.loading = false;
      state.error = payload;
    },
  }
});

export default salesSlice.reducer;
