import { Star } from "lucide-react";
import { Blind } from "../../../../shared/ui/blind";
import type { Coord } from "../../../../shared/types/region";
import useCoordToRegion from "../../api/use-coord-to-region";
import { useFavorites } from "../../../../shared/store/favorites";

type RegionLabelProps = Coord & {
  addressName?: string;
};

const RegionLabel = ({ lat, lng, addressName }: RegionLabelProps) => {
  const { code, addressName: newAddressname } = useCoordToRegion({ lat, lng });
  const { isFavorite, add, remove } = useFavorites();

  const favoriteColor = isFavorite(code) ? "#2E7BF1" : "#D0D1D3";

  const onClickFavorite = () => {
    if (isFavorite(code)) {
      remove(code);
    } else {
      add({ lat, lng, code, addressName: addressName ?? newAddressname });
    }
  };

  return (
    <div
      className="flex gap-1 items-center"
      data-region-code={code}
      data-region-name={addressName ?? newAddressname}
    >
      <button aria-label="관심지역 설정" onClick={onClickFavorite}>
        <Star
          strokeWidth={1}
          color={favoriteColor}
          fill={favoriteColor}
          className="size-5.5"
        />
        <Blind>관심지역 설정</Blind>
      </button>
      <strong className="text-2xl">{addressName ?? newAddressname}</strong>
    </div>
  );
};

export default RegionLabel;
