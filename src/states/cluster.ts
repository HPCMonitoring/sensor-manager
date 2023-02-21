import { StoreName } from "@constants";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Clusters {
  clusters: { id: string; name: string }[];
  fetch: () => void;
}

export const useClustersStore = create<Clusters>()(
  devtools(
    persist(
      (set) => ({
        clusters: [], // Init state
        fetch: () =>
          set(() => ({
            clusters: [
              { id: "1915940", name: "BK HPC Laboratory" },
              { id: "1456984", name: "TickLab cloud" },
              { id: "1111111", name: "UIT Cluster" }
            ]
          }))
      }),
      {
        name: StoreName.CLUSTERS
      }
    )
  )
);
