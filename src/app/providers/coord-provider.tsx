import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Coord } from "../../shared/types/region";

type Status = "success" | "loading" | "error";

const CoordContext = createContext<{
  coord: Coord | null;
  status: Status;
}>({
  coord: null,
  status: "loading",
});

export const useCoord = () => {
  const values = useContext(CoordContext);

  if (values.status === "error") {
    throw new Error("좌표가 없습니다.");
  }

  return values.coord;
};

/**
 *
 * @returns pathname을 통해 lat, lng를 얻는 provider
 */
const CoordProvider = ({ children }: PropsWithChildren) => {
  const [coord, setCoord] = useState<Coord | null>(null);
  const [status, setStatus] = useState<Status>("loading");

  useEffect(() => {
    const pathname = window.location.pathname.split("/")[1];

    try {
      // pathname을 통해 code의 lat, lng를 구하는 로직
      if (pathname) {
        console.log(pathname);
        setStatus("error");
      } else {
        if (typeof navigator === "undefined" || !navigator.geolocation) {
          throw new Error("위치 정보를 가져올 수 없습니다.");
        }

        navigator.geolocation.getCurrentPosition(
          ({ coords: { latitude, longitude } }) => {
            setStatus("success");
            setCoord({ lat: latitude, lng: longitude });
          },
          () => {
            setStatus("error");
          },
        );
      }
    } catch (e) {
      setStatus("error");
      console.error(e);
    }
  }, []);

  return (
    <CoordContext.Provider value={{ coord, status }}>
      {children}
    </CoordContext.Provider>
  );
};

export default CoordProvider;
