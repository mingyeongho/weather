import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Search, X } from "lucide-react";
import useSearchDialog from "../../../shared/store/search-dialog";

const PAGE_SIZE = 20;

type Region = {
  법정동코드: number;
  시도명: string;
  시군구명: string | null;
  읍면동명: string | null;
  리명: string | null;
};

let cachedRegions: Region[] | null = null;

const getRegions = async () => {
  if (cachedRegions) return cachedRegions;

  const res = await fetch("/b_regions.json");
  cachedRegions = await res.json();
  return cachedRegions;
};

const formatRegionName = (region: Region) => {
  return [region.시도명, region.시군구명, region.읍면동명, region.리명]
    .filter(Boolean)
    .join(" ");
};

const SearchDialog = () => {
  const { isOpen, close, toggle } = useSearchDialog();
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [query, setQuery] = useState("");
  const [regions, setRegions] = useState<Region[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [displayCount, setDisplayCount] = useState(PAGE_SIZE);

  const allFilteredRegions = useMemo(() => {
    if (!query.trim()) return [];
    return regions.filter((region) => formatRegionName(region).includes(query));
  }, [query, regions]);

  const filteredRegions = useMemo(() => {
    return allFilteredRegions.slice(0, displayCount);
  }, [allFilteredRegions, displayCount]);

  const hasMore = displayCount < allFilteredRegions.length;

  const handleScroll = useCallback(() => {
    const container = scrollRef.current;
    if (!container || !hasMore) return;

    const { scrollTop, scrollHeight, clientHeight } = container;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      setDisplayCount((prev) => prev + PAGE_SIZE);
    }
  }, [hasMore]);

  const handleSelect = (region: Region) => {
    window.history.pushState(null, "", `/${region.법정동코드}`);
    window.dispatchEvent(new PopStateEvent("popstate"));
    close();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.nativeEvent.isComposing) return;
    if (filteredRegions.length === 0) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) =>
          Math.min(prev + 1, filteredRegions.length - 1),
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => Math.max(prev - 1, 0));
        break;
      case "Enter":
        e.preventDefault();
        if (selectedIndex >= 0) {
          handleSelect(filteredRegions[selectedIndex]);
        }
        break;
    }
  };

  useEffect(() => {
    getRegions().then((data) => data && setRegions(data));
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [toggle]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
      inputRef.current?.focus();
    } else {
      dialog.close();
    }

    dialog.onclose = () => {
      setQuery("");
      close();
    };
  }, [isOpen, close]);

  useEffect(() => {
    if (selectedIndex < 0 || !listRef.current) return;

    const selectedItem = listRef.current.children[selectedIndex] as HTMLElement;
    selectedItem?.scrollIntoView({ block: "nearest" });
  }, [selectedIndex]);

  return (
    <dialog
      ref={dialogRef}
      onClick={close}
      className="backdrop:bg-black/50 bg-transparent p-0 m-0 max-w-none max-h-none w-full h-full"
    >
      <div className="flex items-start justify-center pt-[20vh] h-full">
        <div
          className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-center gap-3 p-4 border-b">
            <Search className="size-5 text-gray-400" strokeWidth={1.5} />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setSelectedIndex(-1);
                setDisplayCount(PAGE_SIZE);
              }}
              onKeyDown={handleKeyDown}
              placeholder="지역 검색..."
              className="flex-1 outline-none text-lg"
            />
            <button
              onClick={close}
              className="p-1 hover:bg-gray-100 rounded"
              aria-label="닫기"
            >
              <X className="size-5 text-gray-400" strokeWidth={1.5} />
            </button>
          </div>
          <div
            ref={scrollRef}
            onScroll={handleScroll}
            className="max-h-64 overflow-y-auto"
          >
            {filteredRegions.length > 0 ? (
              <ul ref={listRef}>
                {filteredRegions.map((region, index) => (
                  <li key={region.법정동코드}>
                    <button
                      onClick={() => handleSelect(region)}
                      className={`w-full px-4 py-3 text-left ${
                        index === selectedIndex
                          ? "bg-gray-100"
                          : "hover:bg-gray-100"
                      }`}
                    >
                      {formatRegionName(region)}
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <div className="p-4 text-center text-gray-500 text-sm">
                {query ? "검색 결과가 없습니다" : "검색어를 입력하세요"}
              </div>
            )}
          </div>
        </div>
      </div>
    </dialog>
  );
};

export default SearchDialog;
