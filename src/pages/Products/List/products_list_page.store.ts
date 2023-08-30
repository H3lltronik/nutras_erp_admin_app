import { create } from 'zustand';

type ProductsListPageState = {
    search: string;
    setSearch: (value: string) => void;

    loading: boolean;
    setLoading: (value: boolean) => void;

    draftMode: boolean | undefined;
    setDraftMode: (value: boolean) => void;
    getDraftMode: () => string | undefined;
  };
  
export const useProductsListPageStore = create<ProductsListPageState>((set, get) => ({
    search: '',
    setSearch: (value: string) => set({ search: value }),
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
    draftMode: undefined,
    setDraftMode: (value: boolean) => set({ draftMode: value }),
    getDraftMode: () => {
        const draftMode = get().draftMode;
        if (draftMode === undefined) return undefined;
        return draftMode ? 'true' : 'false';
    }
}));