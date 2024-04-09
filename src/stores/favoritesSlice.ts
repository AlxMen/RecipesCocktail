import { StateCreator } from "zustand";
import { Recipe } from "../types";
import { RecipesSliceTypes, createRecipesSlice } from "./recipeSlice";
import { NotificationSliceType, createNotificationSlite } from "./notificationSlice";


export type FavoriteSliceType = {
  favorites: Recipe[];
  handleClickFavorite: (recipe: Recipe) => void;
  favoriteExists: (id: Recipe["idDrink"]) => boolean;
  loadFromStorage: () => void;
};

export const createFavoritesSlite: StateCreator<FavoriteSliceType & RecipesSliceTypes & NotificationSliceType, [], [], FavoriteSliceType> = (set, get, api) => ({
  favorites: [],
  handleClickFavorite: (recipe) => {
    if (get().favoriteExists(recipe.idDrink)) {
      
      set((state) => ({
        favorites: state.favorites.filter( favorite => favorite.idDrink !== recipe.idDrink)
      }))
      createNotificationSlite(set, get, api).showNotification({
        text: 'Se elimino de favoritos',
        error: false
      })
    } else {
      set((state) => ({
        favorites: [ ...state.favorites, recipe]
      }))
      createNotificationSlite(set, get, api).showNotification({
        text: "Se agrego a favoritos",
        error: false,
      });
    }
    createRecipesSlice(set, get, api).closeModal()
    localStorage.setItem('favorites', JSON.stringify(get().favorites))
  },
  favoriteExists: (id) => {
    return get().favorites.some(
      (favorite) => favorite.idDrink === id
    );
  },
  loadFromStorage: () => {
    const storedFavorites = localStorage.getItem('favorites')
    if (storedFavorites) {
      set({
        favorites: JSON.parse(storedFavorites)
      })
    }
  }
})