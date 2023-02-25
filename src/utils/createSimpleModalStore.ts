import { ISimpleModal } from "@interfaces";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export function createSimpleModalStore() {
  return create<ISimpleModal>()(
    devtools((set) => ({
      isOpen: false, // Init state
      open: () => set(() => ({ isOpen: true })),
      close: () => set(() => ({ isOpen: false }))
    }))
  );
}
