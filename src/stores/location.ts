import { create } from "zustand";
import { Area } from "@/lib/data/Areas";

interface LocationStore {
  selectedArea: Area | null;
  setSelectedArea: (area: Area | null) => void;
}

const useLocationStore = create<LocationStore>((set) => ({
  selectedArea: null,
  setSelectedArea: (area: Area | null) => set({ selectedArea: area }),
}));

export default useLocationStore;
