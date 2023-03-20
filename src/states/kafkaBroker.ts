import { IKafkaBrokerStore } from "@interfaces";
import { userService } from "@services";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useKafkaBrokerStore = create<IKafkaBrokerStore>()(
  devtools((set, get) => ({
    brokers: [],
    fetch: async function () {
      const brokers = await userService.getKafkaBrokers();
      set(() => ({ brokers }));
    },
    getById(brokerId) {
      const broker = get().brokers.find((item) => item.id === brokerId);
      if (!broker) return null;
      return broker;
    },
    getTopicsById(brokerId) {
      const brokers = get().brokers;
      const broker = brokers.find((item) => item.id === brokerId);
      if (!broker) return [];
      return broker.topics;
    }
  }))
);
