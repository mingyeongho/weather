import { useCoord } from "../../../../app/providers/coord-provider";
import RegionLabel from "./region-label";
import SearchButton from "../../../../entities/search/ui/search-button";
import NowRegion from "../../../../entities/region/ui/now-region";

const Header = () => {
  const coord = useCoord();

  return (
    <header className="border-b border-black/20 fixed top-0 left-0 right-0 bg-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center h-12.5 px-4 lg:px-0">
        <div id="left" className="flex items-center gap-2">
          <RegionLabel {...coord} />
          <NowRegion />
        </div>
        <div id="right">
          <SearchButton />
        </div>
      </div>
    </header>
  );
};

export default Header;
