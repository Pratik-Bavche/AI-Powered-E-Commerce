import React, { useState, useEffect } from "react";
import Nav from "../components/Nav";
import Background from "../components/Background";
import Hero from "../components/Hero";
import Product from "./Product";
import OurPolicy from "../components/OurPolicy";
import NewLetterBox from "../components/NewLetterBox";
import Footer from "../components/Footer";

const Home = () => {
  const heroData = [
    { text1: "30% OFF Limited Offer", text2: "Style that" },
    { text1: "Discover the Best of Bold Fashion", text2: "Limited Time Only!" },
    { text1: "Explore Our Best Collection", text2: "Shop Now!" },
    { text1: "Choose your Perfect Fashion Fit", text2: "Now on Sale!" },
  ];

  const [heroCount, setHeroCount] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroCount((prev) => (prev === 3 ? 0 : prev + 1));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="overflow-x-hidden relative top-[70px]">
      <div className="w-[100vw] lg:h-[100vh] md:h-[50vh] sm:h-[30vh] relative">
        <Background heroCount={heroCount} />
        <div className="absolute inset-0 flex">
          <Hero
            heroCount={heroCount}
            setHeroCount={setHeroCount}
            heroData={heroData[heroCount]}
          />
        </div>
        <Nav />
      </div>
      <Product />
      <OurPolicy />
      <NewLetterBox />
      <Footer />
    </div>
  );
};

export default Home;
