import { create } from "zustand";

type SearchDialogType = {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
};

const useSearchDialog = create<SearchDialogType>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  toggle: () => set((prev) => ({ isOpen: !prev.isOpen })),
}));

export default useSearchDialog;
