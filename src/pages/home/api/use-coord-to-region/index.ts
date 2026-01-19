import { useSuspenseQuery } from "@tanstack/react-query";
import type { Coord } from "../../../../shared/types/region";
import { kakaoAxios } from "../../../../shared/config/kakao-api";

type ResponseCoordToRegion = {
  meta: {
    total_count: number;
  };
  documents: {
    region_type: "H" | "B";
    address_name: string;
    region_1depth_name: string;
    region_2depth_name: string;
    region_3depth_name: string;
    region_4depth_name: string;
    code: string;
    x: number;
    y: number;
  }[];
};

const useCoordToRegion = ({ lat, lng }: Coord) => {
  const { data } = useSuspenseQuery<ResponseCoordToRegion>({
    queryKey: ["coordToRegion", { lat, lng }],
    queryFn: async () => {
      return await kakaoAxios
        .get("/geo/coord2regioncode.json", {
          params: {
            x: lng,
            y: lat,
          },
        })
        .then((res) => res.data);
    },
  });

  // 법정동 지역 정보
  const bRegion = data.documents.find(
    (document) => document.region_type === "B",
  );

  if (!bRegion) {
    throw new Error("법정동 지역 정보가 없습니다.");
  }

  const { region_2depth_name, region_3depth_name, region_4depth_name, code } =
    bRegion;

  return {
    addressName: [region_2depth_name, region_3depth_name, region_4depth_name]
      .filter(Boolean)
      .join(" "),
    code,
  };
};

export default useCoordToRegion;
