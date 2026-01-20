import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Coord } from "../../shared/types/region";
import NotFound from "../../pages/not-found/ui";
import Loading from "../../pages/loading/ui";
import getCodeToCoord from "../../entities/region/model/get-code-to-coord";

const CoordContext = createContext<Coord | null>(null);

export const useCoord = () => {
  const values = useContext(CoordContext);

  if (!values) {
    throw new Error("좌표값이 없습니다.");
  }

  return values;
};

/**
 *
 * @returns pathname을 통해 lat, lng를 얻는 provider
 */
const CoordProvider = ({ children }: PropsWithChildren) => {
  const [coord, setCoord] = useState<Coord | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleLocationChange = async () => {
      const regionCode = window.location.pathname.split("/")[1];
      setIsLoading(true);

      try {
        if (regionCode) {
          const newCoord = await getCodeToCoord(regionCode);
          setCoord(newCoord);
        } else {
          if (typeof navigator === "undefined" || !navigator.geolocation) {
            throw new Error("현재 위치 정보를 불러올 수 없습니다.");
          }

          navigator.geolocation.getCurrentPosition(
            ({ coords: { latitude, longitude } }) => {
              setCoord({ lat: latitude, lng: longitude });
              setIsLoading(false);
            },
            () => setIsLoading(false),
          );
          return;
        }
      } catch (e) {
        console.error(e);
      }

      setIsLoading(false);
    };

    handleLocationChange();

    window.addEventListener("popstate", handleLocationChange);
    return () => window.removeEventListener("popstate", handleLocationChange);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  if (!coord) {
    return <NotFound />;
  }

  return (
    <CoordContext.Provider value={coord}>{children}</CoordContext.Provider>
  );
};

export default CoordProvider;
