<p align="center">
  <h3 align="center">☀️ 날씨</h3>
  <p align="center">OpenWeatherMap 데이터를 사용해서 날씨를 조회하고 관심지역을 등록할 수 있는 서비스입니다.</p>
</p>

---

## Overview

이 프로젝트는 OpenWeatherMap API를 통해 날씨를 조회하고 관심지역을 설정할 수 있는 서비스입니다.
<img width="1438" height="761" alt="Image" src="https://github.com/user-attachments/assets/3804a595-be65-41cb-bb48-b8414cc1fa6e" />

## 주요 기능

### 날씨 조회

lat, lng를 기준으로 날씨를 조회합니다.

- 현재 위치를 사용할 경우
  > Geolocation API를 사용해서 lat, lng를 구한 후 날씨 조회 API를 호출합니다.
- 지역 검색을 한 경우
  > pathname을 통해 법정동 코드를 얻어낸 후 Kakao API를 호출하여 지역의 lat, lng를 구한 후 날씨 조회 API를 호출합니다.

### 시간대 별 기온 조회

현재 시점부터 48시간 동안의 기온을 조회할 수 있습니다.

### 지역 검색

키보드 인터랙션을 지원하는 검색 기능입니다.

- macOS의 경우 Cmd+K, Windows의 경우 Ctrl+K를 눌러 검색 다이얼로그를 열 수 있습니다.

- 키보드 위, 아래 키와 엔터 키를 사용해 검색을 할 수 있습니다.

- b_regions.json 파일에 있는 법정동 코드와 주소 목록을 통해 조회한 후 법정동 코드로 pathname을 이동시킵니다.

### 관심지역 설정

검색한 지역을 관심지역으로 설정/해제할 수 있습니다.
또한 관심지역 목록에서 관심지역을 해제할 수 있습니다.

- Header에 있는 즐겨찾기 아이콘을 통해 관심지역을 설정/해제 할 수 있습니다.

- 관심지역 목록의 Edit 버튼을 통해 관심지역 별칭을 설정할 수 있습니다.

### 관심지역 별칭 설정

- 별칭을 설정하여 관심지역 목록에서 별칭이 노출되도록 합니다.

## 프로젝트 실행 방법

### 실행 전 준비물

1. Kakao API를 사용하기 위해 [Kakao developers](https://developers.kakao.com/)에서 Kakao API key를 발급해주세요. (REST API KEY가 필요합니다.)

2. OpenWeatherMap API를 사용하기 위해 OpenWeather API key를 발급해주세요.

3. OpenWeatherMap의 [Weather API](https://openweathermap.org/api) 페이지에서 One Call API 3.0을 Subscribe 해주세요.

### 프로젝트 셋업

1. 이 저장소를 clone 해주세요.

2. .env.development를 루트 디렉토리에 만들고 위에서 준비한 값들을 넣어주세요.

   > VITE_KAKAO_API_KEY=Kakao_API_Key
   >
   > VITE_DATA_API_KEY=OpenWeatherMap_API_Key

3. 종속성 설치를 위해 `pnpm install`을 실행해주세요.

4. `pnpm dev`를 실행해주세요.

## 기술 스택

- React 19
- TypeScript
- Vite
- Tailwindcss
- Zustant
- Tanstack-query
- react-error-boundary
- dayjs
- axios
- lucide-react
- sonner
