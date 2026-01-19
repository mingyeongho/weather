import { useCoord } from "../../../../app/providers/coord-provider";
import Stat from "../../../../entities/weather/ui/stat";
import { localeDayjs } from "../../../../shared/config/locale-dayjs";
import { Blind } from "../../../../shared/ui/blind";
import useOnecall from "../../api/use-onecall";
import HourCard from "./hour-card";

const WeatherInfo = () => {
  const coord = useCoord();
  const {
    current: { dt, temp, feels_like, min, max, icon, description },
    hourly,
  } = useOnecall({ ...coord });

  return (
    <div className="flex flex-col items-center gap-10">
      <section aria-label="현재 날씨 정보">
        <div className="flex items-center">
          <Blind>{localeDayjs.unix(dt).format("YYYYMMDD")} 현재 기온</Blind>
          <img
            src={`/${icon}.svg`}
            alt={description}
            className="size-50 -mr-20"
          />
          <strong aria-label="현재 기온" className="text-8xl">
            {temp.toFixed(1)}°
          </strong>
        </div>
        <div className="flex flex-col items-center">
          <em className="not-italic font-semibold text-lg">맑음</em>
          <div className="flex gap-1.5">
            <Stat>
              <Stat.Label>체감온도</Stat.Label>
              <Stat.Value>{feels_like.toFixed(1)}°</Stat.Value>
            </Stat>
            <Stat>
              <Stat.Label>최저</Stat.Label>
              <Stat.Value>{min.toFixed(1)}°</Stat.Value>
            </Stat>
            <Stat>
              <Stat.Label>최고</Stat.Label>
              <Stat.Value>{max.toFixed(1)}°</Stat.Value>
            </Stat>
          </div>
        </div>
      </section>
      <section aria-label="시간대 별 날씨 정보" className="max-w-full">
        <Blind>시간대 별 날씨 정보</Blind>
        <ul className="flex gap-2 overflow-x-scroll border border-black/20 rounded-lg p-4">
          {hourly.map((hour) => {
            return <HourCard key={hour.dt} {...hour} />;
          })}
        </ul>
      </section>
    </div>
  );
};

export default WeatherInfo;
