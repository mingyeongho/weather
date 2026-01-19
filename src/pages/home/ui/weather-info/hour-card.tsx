import { localeDayjs } from "../../../../shared/config/locale-dayjs";

type HourCardProps = {
  temp: number;
  icon: string;
  description: string;
  dt: number;
};

const formatHourLabel = (dt: number) => {
  const target = localeDayjs.unix(dt);
  const now = localeDayjs();

  if (target.isSame(now, "hour")) {
    return "지금";
  }

  if (target.hour() !== 0) {
    return target.format("H시");
  }

  const diff = target.startOf("day").diff(now.startOf("day"), "day");

  switch (diff) {
    case 1:
      return "내일";
    case 2:
      return "모레";
    case 3:
      return "글피";
    default:
      return target.format("M/D");
  }
};

const HourCard = ({ dt, icon, description, temp }: HourCardProps) => {
  return (
    <div className="flex flex-col items-center border border-black/20 rounded-lg px-3 py-2">
      <em className="not-italic font-semibold text-sm">
        {formatHourLabel(dt)}
      </em>
      <img src={`/${icon}.svg`} alt={description} className="size-12" />
      <strong>{temp.toFixed(1)}°</strong>
    </div>
  );
};

export default HourCard;
