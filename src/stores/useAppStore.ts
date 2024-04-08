import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipesSliceTypes, createRecipesSlice } from "./recipeSlice";

export const useAppStore = create<RecipesSliceTypes>()(devtools((...a) => ({
  ...createRecipesSlice(...a),
})));