import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Coverage from "../components/Coverage";
import "../styles/HomePage.css";

const Home = () => {
  return (
    <>
      <Hero />
      <Stats />
      <Coverage />
    </>
  );
};

export default Home;