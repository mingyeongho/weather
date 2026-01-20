import { Search } from "lucide-react";
import { Blind } from "../../../shared/ui/blind";
import useSearchDialog from "../../../shared/store/search-dialog";

const SearchButton = () => {
  const { open } = useSearchDialog();

  return (
    <button
      type="button"
      role="search"
      aria-label="검색버튼"
      className="inline-flex items-center gap-1 rounded-full bg-gray-950/2 px-2 py-1 inset-ring inset-ring-gray-950/8"
      onClick={open}
    >
      <Search size={16} color="#6a7282" />
      <kbd className="hidden text-xs/4 text-gray-500 [.os-macos_&amp;]:block">
        ⌘K
      </kbd>
      <kbd className="hidden text-xs/4 text-gray-500 not-[.os-macos_&amp;]:block">
        Ctrl&nbsp;K
      </kbd>
      <Blind>검색버튼</Blind>
    </button>
  );
};

export default SearchButton;
