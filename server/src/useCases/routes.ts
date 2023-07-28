import { Router } from "express";
import { tryCatch } from "../utils/tryCatch";
import cors from "cors";

import { createProductController } from "./createProduct/createProductController";
import { getProductController } from "./getSingleProduct/getProductController";
import { getAllProductsController } from "./getAllProducts/getAllProductsController";
import { deleteProductController } from "./deleteProduct/deleteProductController";

import { createExpenseController } from "./createExpense/createExpenseController";
import { getExpensesController } from "./getAllExpenses/getExpensesController";
import { getExpenseController } from "./getSingleExpense/getExpenseController";
import { deleteExpenseController } from "./deleteExpense/deleteExpenseController";

import { createSaleController } from "./createSale/createSaleController";
import { getSalesController } from "./getAllSales/getSalesController";
import { getSaleController } from "./getSingleSale/getSaleController";
import { deleteSaleController } from "./deleteSale/deleteSaleController";

import { createUserController } from "./createUser/createUserController";
import { authenticateUserController } from "./authenticateUser/authenticateUserController";
import { ensureAuthenticated } from '../middleware/ensureAuthenticated';
import { refreshTokenUserController } from "./refreshTokenUser/refreshTokenUserController";
import { createPaymentController } from "./createPayment/createPaymentController";

const corsOptions = {
  origin: '*'
}

// Product Controllers
const createProduct = new createProductController();
const getProduct = new getProductController();
const getAllProducts = new getAllProductsController();
const deleteProduct = new deleteProductController();

// Expenses Controllers
const createExpense = new createExpenseController();
const getExpenses = new getExpensesController();
const getExpense = new getExpenseController();
const deleteExpense = new deleteExpenseController();

//Sales Controllers
const createSale = new createSaleController();
const getSales = new getSalesController();
const getSale = new getSaleController();
const deleteSale = new deleteSaleController();

//Authentication Routes
const createUser = new createUserController();
const authenticateUser = new authenticateUserController();
const refreshToken = new refreshTokenUserController();

//Payment Routes
const createPayment = new createPaymentController();

const router = Router();

// Product routes
router.post('/product', tryCatch(createProduct.handle));
router.get('/products', tryCatch(getAllProducts.handle));
router.get('/product/:id', tryCatch(getProduct.handle));
router.post('/product/:id/delete', tryCatch(deleteProduct.handle));

//Expenses Routes
router.post('/expense', tryCatch(createExpense.create));
router.get('/expenses', ensureAuthenticated, tryCatch(getExpenses.get));
router.get('/expense/:id', tryCatch(getExpense.get));
router.delete('/expense/:id/delete', tryCatch(deleteExpense.delete));

//Sales Routes
router.post('/sale', tryCatch(createSale.create));
router.get('/sales', tryCatch(getSales.get));
router.get('/sale/:id', tryCatch(getSale.get));
router.delete('/sale/:id', tryCatch(deleteSale.delete));

//Authentication Routes
router.post('/register', tryCatch(createUser.create));
router.post('/login', tryCatch(authenticateUser.login));
router.post('/refresh-token/:id', tryCatch(refreshToken.refresh));


// Payment Routes
router.post('/payment/:sale_id', tryCatch(createPayment.handle));

export { router };