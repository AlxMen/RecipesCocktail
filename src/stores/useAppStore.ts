import { create } from "zustand";
import { devtools } from "zustand/middleware";
import { RecipesSliceTypes, createRecipesSlice } from "./recipeSlice";
import { FavoriteSliceType, createFavoritesSlite } from "./favoritesSlice";
import { NotificationSliceType, createNotificationSlite } from "./notificationSlice";

export const useAppStore = create<
  RecipesSliceTypes & FavoriteSliceType & NotificationSliceType
>()(
  devtools((...a) => ({
    ...createRecipesSlice(...a),
    ...createFavoritesSlite(...a),
    ...createNotificationSlite(...a),
  }))
);

