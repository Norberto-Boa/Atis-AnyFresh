import { salesResponse } from "@/@types/userTypes";
import { api } from "@/services/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import Router  from "next/router";

const fetchSales = createAsyncThunk('sales/fetchSales', async () => {
  try {
    const data = api.get('/sales').then(res => { return res.data as salesResponse;});

    return data;
  } catch (error) {
    return error
  }
});


const fetchSingleSale = createAsyncThunk('sale/fetchSingleSale', () => {
  
  try {
    const data = api.get(`http://localhost:3333/sale/${Router.query['sale_id']}`)
      .then((res) => {
        return res.data
      });
    
    return data
  } catch (error) {
    return error
  }
  
})

export { fetchSales, fetchSingleSale };
