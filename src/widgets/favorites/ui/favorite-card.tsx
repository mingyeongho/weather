import { SquarePen, Star, Check } from "lucide-react";
import useOnecall from "../../../pages/home/api/use-onecall";
import { useFavorites } from "../../../shared/store/favorites";
import { Blind } from "../../../shared/ui/blind";
import { useState } from "react";

type FavoriteCardProps = {
  code: string;
  alias: string;
  lat: number;
  lng: number;
  addressName: string;
};

const FavoriteCard = ({
  code,
  alias,
  lat,
  lng,
  addressName,
}: FavoriteCardProps) => {
  const {
    current: { description, icon, min, max, temp },
  } = useOnecall({ lat, lng });
  const { remove, update } = useFavorites();
  const [editmode, setEditmode] = useState(false);
  const [editAlias, setEditAlias] = useState(alias);

  const onClickFavorite = () => {
    remove(code);
  };

  const onClickEdit = () => {
    setEditmode(true);
  };

  const onClickSave = () => {
    update({ code, alias: editAlias ? editAlias : addressName });
    setEditmode(false);
  };

  return (
    <li className="flex justify-between">
      <a href={`/${code}`} className="flex-1">
        <div className="flex justify-between items-center">
          {editmode ? (
            <form onSubmit={onClickSave}>
              <input
                type="text"
                value={editAlias}
                onChange={(e) => setEditAlias(e.target.value)}
                onClick={(e) => e.preventDefault()}
                className="border rounded px-1"
                placeholder={addressName}
                autoFocus
              />
            </form>
          ) : (
            <strong>{alias}</strong>
          )}
        </div>
        <div className="flex">
          <div className="flex gap-1 items-center">
            <img src={`${icon}.svg`} alt={description} className="size-10" />
            <strong className="text-lg">{temp.toFixed(1)}</strong>
          </div>
          <div className="flex items-center gap-1">
            <Blind>최저</Blind>
            <strong className="text-sm text-blue-500">{min.toFixed(1)}°</strong>
            <Blind>최고</Blind>
            <strong className="text-sm text-red-500">{max.toFixed(1)}°</strong>
          </div>
        </div>
      </a>
      <div className="flex items-start">
        <button aria-label="관심지역 설정" onClick={onClickFavorite}>
          <Star
            strokeWidth={1}
            color="#2E7BF1"
            fill="#2E7BF1"
            className="size-5"
          />
        </button>
        {editmode ? (
          <button aria-label="별칭 저장" onClick={onClickSave}>
            <Check strokeWidth={1} className="size-5" />
            <Blind>별칭 저장</Blind>
          </button>
        ) : (
          <button aria-label="별칭 설정" onClick={onClickEdit}>
            <SquarePen strokeWidth={1} className="size-5" />
            <Blind>별칭 설정</Blind>
          </button>
        )}
      </div>
    </li>
  );
};

export default FavoriteCard;
