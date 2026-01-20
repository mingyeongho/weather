import { kakaoAxios } from "../../../shared/config/kakao-api";

type ResponseCodeToCoord = {
  meta: {
    total_count: number;
    pageable_count: number;
    is_end: boolean;
  };
  documents: {
    address_name: string;
    x: number;
    y: number;
  }[];
};

export type Region = {
  법정동코드: number;
  시도명: string;
  시군구명: string | null;
  읍면동명: string | null;
  리명: string | null;
};

let cachedRegions: Region[] | null = null;

export const getRegions = async () => {
  if (cachedRegions) return cachedRegions;

  const res = await fetch("/b_regions.json");
  cachedRegions = await res.json();
  return cachedRegions;
};

export const formatRegionName = (region: Region) => {
  return [region.시도명, region.시군구명, region.읍면동명, region.리명]
    .filter(Boolean)
    .join(" ");
};

const getCodeToCoord = async (code: string) => {
  const regions = await getRegions();
  const region = regions?.find((r) => String(r.법정동코드) === code);

  if (!region) {
    throw new Error("지역을 찾을 수 없습니다.");
  }

  const addressName = formatRegionName(region);

  const data = await kakaoAxios
    .get<ResponseCodeToCoord>("/search/address.json", {
      params: {
        query: addressName,
      },
    })
    .then((res) => res.data);

  if (data.documents.length > 0) {
    const { x, y } = data.documents[0];
    return { lat: y, lng: x, addressName };
  }

  throw new Error("좌표를 찾을 수 없습니다.");
};

export default getCodeToCoord;
