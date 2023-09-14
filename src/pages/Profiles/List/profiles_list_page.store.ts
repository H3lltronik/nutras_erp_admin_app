import { create } from "zustand";

type ProfilesListPageState = {
  loading: boolean;
  setLoading: (value: boolean) => void;
};

export const useProfilesListPageStore = create<ProfilesListPageState>(
  (set, get) => ({
    loading: false,
    setLoading: (value: boolean) => set({ loading: value }),
  })
);
