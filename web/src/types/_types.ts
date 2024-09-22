import type { ReactElement, ReactNode } from "react";
import type { NextPage } from "next";
// biome-ignore lint/style/useNodejsImportProtocol: <explanation>
import type { ParsedUrlQuery } from "querystring";
import type { AxiosError } from "axios";

export type NextPageWithLayout = NextPage & {
	getLayout: (page: ReactElement) => ReactNode;
	navbarLogo?: string;
};

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export interface ResponseError<T = any> extends AxiosError<T> {
	response: AxiosError<T>["response"] & {
		data: {
			message: string;
			// Add other properties as needed
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			[key: string]: any;
		};
	};
}

export interface ProductData {
	id: string;
	name: string;
}

export interface expenseDashboard {
	id: string;
	quantity: number;
	price: number;
}

export interface Params extends ParsedUrlQuery {
	id: string;
}

export interface expense {
	id: string;
	description: string;
	buyerName: string;
	price: number;
	quantity: number;
	date: Date;
}
