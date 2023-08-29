import { create } from 'zustand';

type ProductsListPageState = {
    search: string;
    loading: boolean;

    setSearch: (value: string) => void;
    setLoading: (value: boolean) => void;
  };
  
export const useProductsListPageStore = create<ProductsListPageState>((set) => ({
    search: '',
    setSearch: (value: string) => set({ search: value }),
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
}));