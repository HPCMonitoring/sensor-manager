import { mockSensors, StoreName } from "@constants";
import { ISensorStore, ISimpleModal } from "@interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export const useSensorsStore = create<ISensorStore>()(
  devtools(
    persist(
      (set) => ({
        sensors: [], // Init state
        fetch: () => set(() => ({ sensors: mockSensors }))
      }),
      {
        name: StoreName.SENSORS
      }
    )
  )
);

export const useConfigSensorModalStore = create<ISimpleModal>()(
  devtools(
    persist(
      (set) => ({
        isOpen: true, // Init state
        open: () => set(() => ({ isOpen: true })),
        close: () => set(() => ({ isOpen: false }))
      }),
      {
        name: StoreName.DELETE_CLUSTER_MODAL
      }
    )
  )
);

export const useRemoveSensorModalStore = create<ISimpleModal>()(
  devtools(
    persist(
      (set) => ({
        isOpen: true, // Init state
        open: () => set(() => ({ isOpen: true })),
        close: () => set(() => ({ isOpen: false }))
      }),
      {
        name: StoreName.DELETE_CLUSTER_MODAL
      }
    )
  )
);
