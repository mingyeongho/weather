import { Locate, Search } from "lucide-react";
import { Blind } from "../../../../shared/ui/blind";
import { useCoord } from "../../../../app/providers/coord-provider";
import RegionLabel from "./region-label";

const Header = () => {
  const coord = useCoord();

  return (
    <header className="border-b border-black/20 fixed top-0 left-0 right-0 bg-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center h-12.5 px-4 lg:px-0">
        <div id="left" className="flex items-center gap-2">
          <RegionLabel {...coord} />
          <button aria-label="현재 위치로 설정">
            <Locate strokeWidth={1} />
            <Blind>현재 위치로 설정</Blind>
          </button>
        </div>
        <div id="right">
          <button aria-label="지역 검색">
            <Search strokeWidth={1} />
            <Blind>지역 검색</Blind>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
