import { Star } from "lucide-react";
import Stat from "../../../entities/weather/ui/stat";
import useOnecall from "../../../pages/home/api/use-onecall";
import { useFavorites } from "../../../shared/store/favorites";

type FavoriteCardProps = {
  code: string;
  alias: string;
  lat: number;
  lng: number;
};

const FavoriteCard = ({ code, alias, lat, lng }: FavoriteCardProps) => {
  const {
    current: { description, icon, min, max, temp },
  } = useOnecall({ lat, lng });
  const { remove } = useFavorites();

  const onClickFavorite = () => {
    remove(code);
  };

  return (
    <li className="flex flex-col">
      <div className="flex justify-between items-center">
        <strong>{alias}</strong>
        <button aria-label="관심지역 설정" onClick={onClickFavorite}>
          <Star
            strokeWidth={1}
            color="#2E7BF1"
            fill="#2E7BF1"
            className="size-5"
          />
        </button>
      </div>
      <div className="flex justify-between">
        <div className="flex gap-1 items-center">
          <img src={`${icon}.svg`} alt={description} className="size-10" />
          <strong className="text-lg">{temp.toFixed(1)}</strong>
        </div>
        <div className="flex items-center gap-1.5">
          <Stat>
            <Stat.Label>최저</Stat.Label>
            <Stat.Value>{min.toFixed(1)}°</Stat.Value>
          </Stat>
          <Stat>
            <Stat.Label>최고</Stat.Label>
            <Stat.Value>{max.toFixed(1)}°</Stat.Value>
          </Stat>
        </div>
      </div>
    </li>
  );
};

export default FavoriteCard;
