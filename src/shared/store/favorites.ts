import { toast } from "sonner";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

const MAX = 6;

type Favorite = {
  lat: number;
  lng: number;
  code: string;
  addressName: string;
  alias: string;
};

type FavoritesStore = {
  favorites: Favorite[];
  add: (props: Omit<Favorite, "alias">) => boolean;
  remove: (code: string) => Favorite[];
  isFavorite: (code: string) => boolean;
};

export const useFavorites = create<FavoritesStore>()(
  persist(
    (set, get) => ({
      favorites: [],
      add: (props: Omit<Favorite, "alias">) => {
        const { favorites, isFavorite } = get();

        if (favorites.length >= MAX) {
          toast(`관심 목록은 ${MAX}개까지 등록할 수 있습니다.`, {
            position: "top-center",
          });
          return false;
        }

        if (isFavorite(props.code)) {
          return false;
        }
        set({
          favorites: [...favorites, { ...props, alias: props.addressName }],
        });
        return true;
      },
      remove: (code: string) => {
        const { favorites } = get();
        const newFavorites = favorites.filter(
          (favorite) => favorite.code !== code,
        );

        set({ favorites: newFavorites });
        return newFavorites;
      },
      isFavorite: (code: string) => {
        const { favorites } = get();

        return favorites.some((favorite) => favorite.code === code);
      },
    }),
    {
      name: "favorites",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
