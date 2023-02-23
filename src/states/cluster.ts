import { StoreName } from "@constants";
import { IDeleteClusterModalStore, IClusterModalStore, IClusterStore } from "@interfaces";
import { ModalOpenMode } from "@types";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useClustersStore = create<IClusterStore>()(
  devtools(
    persist(
      (set) => ({
        clusters: [], // Init state
        fetch: () =>
          set(() => ({
            clusters: [
              {
                id: "1915940",
                name: "BK HPC Laboratory",
                numOfSensors: 7,
                numOfActiveSensors: 5,
                remarks: null
              },
              {
                id: "1456984",
                name: "TickLab cloud",
                numOfSensors: 4,
                numOfActiveSensors: 3,
                remarks: null
              },
              {
                id: "1433976",
                name: "UIT Cluster",
                numOfSensors: 6,
                numOfActiveSensors: 5,
                remarks: null
              }
            ]
          }))
      }),
      {
        name: StoreName.CLUSTERS
      }
    )
  )
);

export const useClusterModalStore = create<IClusterModalStore>()(
  devtools(
    persist(
      (set) => ({
        mode: "create", // Init state,
        isOpen: false,
        open: (mode: ModalOpenMode) => set(() => ({ mode, isOpen: true })),
        close: () => set((state) => ({ ...state, isOpen: false }))
      }),
      {
        name: StoreName.CLUSTER_MODAL
      }
    )
  )
);

export const useDeleteClusterModalStore = create<IDeleteClusterModalStore>()(
  devtools(
    persist(
      (set) => ({
        isOpen: false,
        open: () => set(() => ({ isOpen: true })),
        close: () => set(() => ({ isOpen: false }))
      }),
      {
        name: StoreName.DELETE_CLUSTER_MODAL
      }
    )
  )
);
