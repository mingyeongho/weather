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
    const pathname = window.location.pathname.split("/")[1];

    try {
      // pathname을 통해 code의 lat, lng를 구하는 로직
      if (pathname) {
        console.log(pathname);
        setIsLoading(false);
      } else {
        if (typeof navigator === "undefined" || !navigator.geolocation) {
          setIsLoading(false);
          throw new Error("위치 정보를 가져올 수 없습니다.");
        }

        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setCoord({ lat: latitude, lng: longitude });
            setIsLoading(false);
          },
          () => {
            setIsLoading(false);
          },
        );
      }
    } catch (e) {
      setIsLoading(false);
      console.error(e);
    }
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
