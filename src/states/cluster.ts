import { StoreName } from "@constants";
import { ICluster } from "src/interfaces";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

interface Clusters {
  clusters: ICluster[];
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
