import { IUseSheet } from "@/interface";
import { create } from "zustand";

const useSheet = create<IUseSheet>()((set) => ({
  open: false,
  setOpen: () => set((state: IUseSheet) => ({ open: !state.open })),
}));

export default useSheet;
