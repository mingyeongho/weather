import axios from "axios";

export const kakaoAxios = axios.create({
  baseURL: `https://dapi.kakao.com/v2/local`,
  headers: {
    Authorization: `KakaoAK ${import.meta.env.VITE_KAKAO_API_KEY}`,
  },
});
