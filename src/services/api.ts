import axios, { AxiosResponse } from 'axios';

const api = axios.create({
  baseURL: 'https://8b7a-2804-7f5-b0c3-ad4d-3cca-25d9-8548-25f7.ngrok-free.app/',
});

export interface Category {
  id: number;
  name: string;
}

export interface Expense {
  _id: string;
  categoryName: string;
  establishmentName: string;
  amount: number;
  createDt: string;
}

export default function useApi() {
  const getAllCategories = (): Promise<AxiosResponse<Category[]>> => {
    return api.get<Category[]>(`api/categorias`);
  }
  
  const postExpense = (expense: any): Promise<AxiosResponse<void>> => {
    return api.post<void>(`api/gastos/registrar`, expense);
  }

  const getAllExpenses = (): Promise<AxiosResponse<Expense[]>> => {
    return api.get<Expense[]>(`api/gastos`);
  }

  const deleteExpenseById = (_id: string): Promise<AxiosResponse<void>> => {
    return api.delete<void>(`api/gastos/eliminar/${_id}`);
  }

  return {
    getAllCategories,
    postExpense,
    getAllExpenses,
    deleteExpenseById,
  }
}

