import { Search } from "lucide-react";
import { Blind } from "../../../shared/ui/blind";
import Favorites from "../../../widgets/favorites/ui";

const NotFound = () => {
  return (
    <>
      <header className="border-b border-black/20 fixed top-0 left-0 right-0 bg-white">
        <div className="max-w-5xl mx-auto flex justify-end items-center h-12.5 px-4 lg:px-0">
          <button aria-label="지역 검색">
            <Search strokeWidth={1} />
            <Blind>지역 검색</Blind>
          </button>
        </div>
      </header>
      <div className="mt-32.5 max-w-5xl mx-auto px-4 flex flex-col gap-10 lg:px-0 lg:flex-row">
        <main className="lg:max-w-175 w-full">
          <div className="w-full h-full flex justify-center items-center">
            <strong className="text-3xl">해당 장소의 정보가 없습니다.</strong>
          </div>
        </main>
        <aside className="flex-1">
          <Favorites />
        </aside>
      </div>
    </>
  );
};

export default NotFound;
