import { create } from "zustand";

type BatchesListPageState = {
  nameSearch: string;
  setNameSearch: (value: string) => void;

  codeSearch: string;
  setCodeSearch: (value: string) => void;

  providerSearch: string;
  setProviderSearch: (value: string) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  draftMode: boolean | undefined;
  setDraftMode: (value: boolean | undefined) => void;
  getDraftMode: () => string | undefined;

  published: boolean | undefined;
  setPublished: (value: boolean | undefined) => void;
  getPublished: () => string | undefined;
};

export const useBatchesListPageStore = create<BatchesListPageState>(
  (set, get) => ({
    nameSearch: "",
    setNameSearch: (value: string) => set({ nameSearch: value }),

    codeSearch: "",
    setCodeSearch: (value: string) => set({ codeSearch: value }),

    providerSearch: "",
    setProviderSearch: (value: string) => set({ providerSearch: value }),

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
