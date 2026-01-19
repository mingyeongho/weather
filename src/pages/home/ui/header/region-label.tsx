import { Star } from "lucide-react";
import { Blind } from "../../../../shared/ui/blind";
import type { Coord } from "../../../../shared/types/region";
import useCoordToRegion from "../../api/use-coord-to-region";

const RegionLabel = ({ lat, lng }: Coord) => {
  const { code, addressName } = useCoordToRegion({ lat, lng });

  return (
    <div
      className="flex gap-1 items-center"
      data-region-code={code}
      data-region-name={addressName}
    >
      <button aria-label="관심지역 설정">
        <Star
          strokeWidth={1}
          color="#D0D1D3"
          fill="#D0D1D3"
          className="size-5.5"
        />
        <Blind>관심지역 설정</Blind>
      </button>
      <strong className="text-2xl">{addressName}</strong>
    </div>
  );
};

export default RegionLabel;
