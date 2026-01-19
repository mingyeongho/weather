import Favorites from "./ui/favorites";
import Header from "./ui/header";
import WeatherInfo from "./ui/weather-info";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mt-12.5">
        <main>
          <WeatherInfo />
        </main>
        <aside>
          <Favorites />
        </aside>
      </div>
    </>
  );
};

export default Home;
