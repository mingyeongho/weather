import { Locate, Search, Star } from "lucide-react";

const Header = () => {
  return (
    <header className="border-b border-black/20 fixed top-0 left-0 right-0 bg-white">
      <div className="max-w-5xl mx-auto flex justify-between items-center h-12.5 px-4 lg:px-0">
        <div id="left" className="flex items-center gap-2">
          <div className="flex gap-1 items-center">
            <button aria-label="관심지역 설정">
              <Star
                strokeWidth={1}
                color="#D0D1D3"
                fill="#D0D1D3"
                className="size-5.5"
              />
            </button>
            <strong className="text-2xl">일산동구 장항동</strong>
          </div>
          <button aria-label="현재 위치로 설정">
            <Locate strokeWidth={1} />
          </button>
        </div>
        <div id="right">
          <button aria-label="지역 검색">
            <Search strokeWidth={1} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
