import { Plus } from "lucide-react";

const Favorites = () => {
  return (
    <div className="border border-black/20 rounded-lg">
      <div className="p-4">
        <strong>관심지역 목록</strong>
      </div>
      <hr className="border-black/20" />
      <div className="p-4 flex flex-col gap-2 items-center">
        <em>관심지역이 없습니다.</em>
        <button
          aria-label="관심지역 추가하기"
          className="bg-blue-400 rounded-full p-1"
        >
          <Plus color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default Favorites;
