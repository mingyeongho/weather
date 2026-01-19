import Favorites from "./ui/favorites";
import Header from "./ui/header";
import WeatherInfo from "./ui/weather-info";

const Home = () => {
  return (
    <>
      <Header />
      <div className="mt-32.5 max-w-5xl mx-auto px-4 flex flex-col gap-10 lg:px-0 lg:flex-row">
        <main className="lg:max-w-175 w-full">
          <WeatherInfo />
        </main>
        <aside className="flex-1">
          <Favorites />
        </aside>
      </div>
    </>
  );
};

export default Home;
