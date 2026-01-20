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
          toast(`관심 목록은 ${MAX}개까지 등록할 수 있습니다.`);
          return false;
        }

        if (isFavorite(props.code)) {
          toast(`이미 관심 목록에 등록되어있습니다. (${props.addressName})`);
          return false;
        }

        toast(`관심 목록에 등록되었습니다. (${props.addressName})`);
        set({
          favorites: [...favorites, { ...props, alias: props.addressName }],
        });
        return true;
      },
      remove: (code: string) => {
        const { favorites } = get();
        const target = favorites.find((favorite) => favorite.code === code);
        const newFavorites = favorites.filter(
          (favorite) => favorite.code !== code,
        );

        toast(`관심 목록에서 제거되었습니다. (${target?.alias})`);
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
