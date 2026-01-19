import { useSuspenseQuery } from "@tanstack/react-query";
import type { Coord } from "../../../../shared/types/region";
import { owmAxios } from "../../../../shared/config/owm-api";

type ResponseOnecall = {
  current: {
    dt: number; // unix
    temp: number; // 현재 기온
    feels_like: number; // 체감 기온
    weather: {
      icon: string;
      description: string;
    }[];
  };
  hourly: {
    dt: number;
    temp: number;
    weather: {
      icon: string;
      description: string;
    }[];
  }[];
  daily: {
    dt: number;
    temp: {
      min: number;
      max: number;
    };
  }[];
};

const useOnecall = ({ lat, lng }: Coord) => {
  const { data } = useSuspenseQuery<ResponseOnecall>({
    queryKey: ["onecall", { lat, lng }],
    queryFn: async () => {
      return await owmAxios
        .get("/3.0/onecall", {
          params: {
            lat,
            lon: lng,
            exclude: "minutely,alerts",
          },
        })
        .then((res) => res.data);
    },
  });

  const { current, daily, hourly } = data;
  const { weather, ...currentProps } = current;
  const { icon, description } = weather[0];

  return {
    current: {
      ...currentProps,
      min: daily[0].temp.min,
      max: daily[0].temp.max,
      icon,
      description,
    },
    hourly: hourly.map(({ weather, ...props }) => {
      const { icon, description } = weather[0];
      return {
        ...props,
        icon,
        description,
      };
    }),
  };
};

export default useOnecall;
