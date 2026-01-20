import { Plus } from "lucide-react";
import { useFavorites } from "../../../shared/store/favorites";
import FavoriteCard from "./favorite-card";
import useSearchDialog from "../../../shared/store/search-dialog";

const Favorites = () => {
  const { favorites } = useFavorites();
  const { open } = useSearchDialog();

  return (
    <div className="border border-black/20 rounded-lg">
      <div className="p-4">
        <strong>관심지역 목록</strong>
      </div>
      <hr className="border-black/20" />
      <div className="p-4 flex flex-col gap-2 items-center">
        {favorites.length > 0 ? (
          <ul className="w-full flex flex-col gap-2">
            {favorites.map((favorite) => {
              return <FavoriteCard {...favorite} key={favorite.code} />;
            })}
          </ul>
        ) : (
          <>
            <em>관심지역이 없습니다.</em>
            <em>지역을 검색한 후 추가해주세요.</em>
            <button
              aria-label="관심지역 추가하기"
              className="bg-blue-400 rounded-full p-1"
              onClick={open}
            >
              <Plus color="#fff" />
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Favorites;
