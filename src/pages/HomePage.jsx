import Navbar from "../components/Navbar.jsx";
import Hero from "../components/Hero";
import Stats from "../components/Stats";
import Coverage from "../components/Coverage";
import Footer from "../components/Footer";
import "../styles/HomePage.css";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Stats />
      <Coverage />
      <Footer />
    </>
  );
};

export default Home;