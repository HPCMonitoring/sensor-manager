import {
  IConfigSensorModalStore,
  IConfigSensorSendingModalStore,
  IDeleteSensorModalStore,
  ISensorStore
} from "@interfaces";
import { sensorService } from "@services";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useSensorsStore = create<ISensorStore>()(
  devtools((set) => ({
    sensors: [], // Init state
    fetch: async (clusterId: string) => {
      const sensors = await sensorService.getByClusterId(clusterId);
      set(() => ({ sensors }));
    }
  }))
);

export const useConfigSensorModalStore = create<IConfigSensorModalStore>()(
  devtools((set) => ({
    sensorId: null,
    isOpen: false,
    open(sensorId) {
      set(() => ({ sensorId, isOpen: true }));
    },
    close() {
      set(() => ({ sensorId: null, isOpen: false }));
    }
  }))
);

export const useDeleteSensorModalStore = create<IDeleteSensorModalStore>()(
  devtools((set) => ({
    sensorId: null,
    isOpen: false,
    open(sensorId) {
      set(() => ({ sensorId, isOpen: true }));
    },
    close() {
      set(() => ({ sensorId: null, isOpen: false }));
    }
  }))
);

export const useConfigSensorSendingModalStore = create<IConfigSensorSendingModalStore>()(
  devtools((set) => ({
    sensor: null,
    isOpen: false,
    open: (sensor) => {
      set(() => ({ isOpen: true, sensor }));
    },
    close: () => {
      set(() => ({ isOpen: false, sensor: null }));
    }
  }))
);
