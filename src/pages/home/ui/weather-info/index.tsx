import { Blind } from "../../../../shared/ui/blind";
import HourCard from "./hour-card";
import Stat from "./stat";

const WeatherInfo = () => {
  return (
    <div className="flex flex-col items-center gap-10">
      <section aria-label="현재 날씨 정보">
        <div className="flex items-center">
          <Blind>현재 기온</Blind>
          <img src="/01d.svg" alt="맑음" className="size-50 -mr-20" />
          <strong aria-label="현재 기온" className="text-8xl">
            -10°
          </strong>
        </div>
        <div className="flex flex-col items-center">
          <em className="not-italic font-semibold text-lg">맑음</em>
          <div className="flex gap-1.5">
            <Stat>
              <Stat.Label>체감온도</Stat.Label>
              <Stat.Value>-20°</Stat.Value>
            </Stat>
            <Stat>
              <Stat.Label>최저</Stat.Label>
              <Stat.Value>-20°</Stat.Value>
            </Stat>
            <Stat>
              <Stat.Label>최고</Stat.Label>
              <Stat.Value>20°</Stat.Value>
            </Stat>
          </div>
        </div>
      </section>
      <section aria-label="시간대 별 날씨 정보" className="max-w-full">
        <Blind>시간대 별 날씨 정보</Blind>
        <ul className="flex gap-2 overflow-x-scroll border border-black/20 rounded-lg p-4">
          {new Array(36).fill(0).map((_, idx) => (
            <li key={idx} className="shrink-0">
              <HourCard />
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default WeatherInfo;
