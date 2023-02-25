import { mockSensors } from "@constants";
import { ISensorStore } from "@interfaces";
import { createSimpleModalStore } from "@utils";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useSensorsStore = create<ISensorStore>()(
  devtools((set) => ({
    sensors: [], // Init state
    fetch: () => set(() => ({ sensors: mockSensors }))
  }))
);

export const useConfigSensorModalStore = createSimpleModalStore();
export const useRemoveSensorModalStore = createSimpleModalStore();