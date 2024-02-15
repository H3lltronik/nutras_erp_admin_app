import { create } from "zustand";

type ProductsListPageState = {
  nameSearch: string;
  setNameSearch: (value: string) => void;

  codeSearch: string;
  setCodeSearch: (value: string) => void;

  providerSearch: string;
  setProviderSearch: (value: string) => void;

  kosher: boolean | undefined;
  setKosher: (value: boolean | undefined) => void;
  getKosher: () => string | undefined;
  
  allergen: boolean | undefined;
  setAllergen: (value: boolean | undefined) => void;
  getAllergen: () => string | undefined;

  productTypes: string[];
  setProductTypes: (value: string[]) => void;
  getProductTypes: () => string | undefined;

  loading: boolean;
  setLoading: (value: boolean) => void;

  draftMode: boolean | undefined;
  setDraftMode: (value: boolean | undefined) => void;
  getDraftMode: () => string | undefined;

  published: boolean | undefined;
  setPublished: (value: boolean | undefined) => void;
  getPublished: () => string | undefined;
};

export const useProductsListPageStore = create<ProductsListPageState>(
  (set, get) => ({
    nameSearch: "",
    setNameSearch: (value: string) => set({ nameSearch: value }),

    codeSearch: "",
    setCodeSearch: (value: string) => set({ codeSearch: value }),

    providerSearch: "",
    setProviderSearch: (value: string) => set({ providerSearch: value }),

    kosher: undefined,
    setKosher: (value: boolean | undefined) => set({ kosher: value }),
    getKosher: () => {
      const kosher = get().kosher;
      if (kosher === undefined) return undefined;
      return kosher ? "true" : "false";
    },

    allergen: undefined,
    setAllergen: (value: boolean | undefined) => set({ allergen: value }),
    getAllergen: () => {
      const allergen = get().allergen;
      if (allergen === undefined) return undefined;
      return allergen ? "true" : "false";
    },

    productTypes: [],
    setProductTypes: (value: string[]) => set({ productTypes: value }),
    getProductTypes: () => {
      const productTypes = get().productTypes;
      if (productTypes.length === 0) return undefined;
      return JSON.stringify(productTypes ?? []);
    },

    draftMode: undefined,
    setDraftMode: (value: boolean | undefined) => set({ draftMode: value }),
    getDraftMode: () => {
      const draftMode = get().draftMode;
      if (draftMode === undefined) return undefined;
      return draftMode ? "true" : "false";
    },

    published: undefined,
    setPublished: (value: boolean | undefined) => set({ published: value }),
    getPublished: () => {
      const published = get().published;
      if (published === undefined) return undefined;
      return published ? "true" : "false";
    },

    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
  })
);
