import { create } from "zustand";

type ProvidersListPageState = {
  loading: boolean;
  setLoading: (value: boolean) => void;

  nameSearch: string;
  setNameSearch: (value: string) => void;

  codeSearch: string;
  setCodeSearch: (value: string) => void;

  rfcSearch: string;
  setRFCSearch: (value: string) => void;

  draftMode: boolean | undefined;
  setDraftMode: (value: boolean | undefined) => void;
  getDraftMode: () => string | undefined;

  published: boolean | undefined;
  setPublished: (value: boolean | undefined) => void;
  getPublished: () => string | undefined;
};

export const useProvidersListPageStore = create<ProvidersListPageState>(
  (set, get) => ({
    draftMode: undefined,
    setDraftMode: (value: boolean | undefined) => set({ draftMode: value }),
    getDraftMode: () => {
      const draftMode = get().draftMode;
      if (draftMode === undefined) return undefined;
      return draftMode ? "true" : "false";
    },

    nameSearch: "",
    setNameSearch: (value: string) => set({ nameSearch: value }),

    codeSearch: "",
    setCodeSearch: (value: string) => set({ codeSearch: value }),

    rfcSearch: "",
    setRFCSearch: (value: string) => set({ rfcSearch: value }),

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
