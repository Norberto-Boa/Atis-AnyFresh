import { ReactElement, ReactNode } from "react";
import { NextPage } from "next";
import { ParsedUrlQuery } from 'querystring';

export type NextPageWithLayout = NextPage & {
  getLayout: (page: ReactElement) => ReactNode
  navbarLogo?: string
}

export interface ProductData{
  id: string;
  name: string;
}

export interface expenseDashboard{
  id: string;
  quantity: number;
  price: number;
}

export interface Params extends ParsedUrlQuery{
  id: string
}

export interface expense{
  id: string,
  description: string,
  buyerName: string,
  price: number,
  quantity: number,
  date: Date,
}