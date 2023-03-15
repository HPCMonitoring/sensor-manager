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
    getTopicsByBrokerId(brokerId) {
      const brokers = get().brokers;
      const broker = brokers.find((item) => item.id === brokerId);
      if (!broker) return [];
      console.log(broker.topics);
      return broker.topics;
    }
  }))
);
