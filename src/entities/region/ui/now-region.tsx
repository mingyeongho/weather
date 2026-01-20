import { Locate } from "lucide-react";
import { Blind } from "../../../shared/ui/blind";

const NowRegion = () => {
  return (
    <button
      aria-label="현재 위치로 설정"
      onClick={() => {
        window.history.pushState(null, "", "/");
        window.dispatchEvent(new PopStateEvent("popstate"));
      }}
    >
      <Locate strokeWidth={1} />
      <Blind>현재 위치로 설정</Blind>
    </button>
  );
};

export default NowRegion;
