import { create } from "zustand";

type UsersListPageState = {
  nameSearch: string;
  setNameSearch: (value: string) => void;

  usernameSearch: string;
  setUsernameSearch: (value: string) => void;

  profileSearch: string;
  setProfileSearch: (value: string) => void;

  departmentSearch: string;
  setDepartmentSearch: (value: string) => void;

  loading: boolean;
  setLoading: (value: boolean) => void;

  draftMode: boolean | undefined;
  setDraftMode: (value: boolean | undefined) => void;
  getDraftMode: () => string | undefined;

  published: boolean | undefined;
  setPublished: (value: boolean | undefined) => void;
  getPublished: () => string | undefined;
};

export const useUsersListPageStore = create<UsersListPageState>((set, get) => ({
  nameSearch: "",
  setNameSearch: (value: string) => set({ nameSearch: value }),

  usernameSearch: "",
  setUsernameSearch: (value: string) => set({ usernameSearch: value }),

  profileSearch: "",
  setProfileSearch: (value: string) => set({ profileSearch: value }),

  departmentSearch: "",
  setDepartmentSearch: (value: string) => set({ departmentSearch: value }),

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
}));
