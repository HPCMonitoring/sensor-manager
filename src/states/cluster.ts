import { mockClusters } from "@constants";
import { IClusterModalStore, IClusterStore } from "@interfaces";
import { ModalOpenMode } from "@types";
import { createSimpleModalStore } from "@utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useClustersStore = create<IClusterStore>()(
  devtools((set) => ({
    clusters: [], // Init state
    fetch: () => set(() => ({ clusters: mockClusters }))
  }))
);

export const useClusterModalStore = create<IClusterModalStore>()(
  devtools((set) => ({
    mode: "create", // Init state,
    isOpen: false,
    open: (mode: ModalOpenMode) => set(() => ({ mode, isOpen: true })),
    close: () => set((state) => ({ ...state, isOpen: false }))
  }))
);

export const useDeleteClusterModalStore = createSimpleModalStore();
