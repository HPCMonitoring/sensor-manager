import { IKafkaBrokerStore } from "@interfaces";
import { userService } from "@services";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useKafkaBrokerStore = create<IKafkaBrokerStore>()(
  devtools((set) => ({
    brokers: [],
    fetch: async function () {
      const brokers = await userService.getKafkaBrokers();
      set(() => ({ brokers }));
      console.log(brokers);
    }
  }))
);
