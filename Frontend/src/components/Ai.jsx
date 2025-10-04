import React, { useContext, useEffect, useState } from 'react';
import ss from "../assets/speak.png";
import { shopDataContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';
import Toast from './Toast';

const Ai = () => {
  let { showSearch, setShowSearch } = useContext(shopDataContext);
  let navigate = useNavigate();
  let [activeAi, setActiveAi] = useState(false);

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();

    useEffect(() => {
    if (!recognition) {
      setToastMsg("Speech Recognition not supported in this browser!");
    }
  }, [recognition]);


  function speak(message) {
    let a = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(a);
  }

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();

    if (transcript.includes("search") && transcript.includes("open") && !showSearch) {
      speak("opening search");
      setShowSearch(true);
      navigate("/collection");
    } else if (transcript.includes("search") && transcript.includes("close") && showSearch) {
      speak("closing search");
      setShowSearch(false);
    } else if (
      transcript.includes("collection") ||
      transcript.includes("collections") ||
      transcript.includes("product") ||
      transcript.includes("products")
    ) {
      speak("opening collection page");
      navigate("/collection");
    } else if (transcript.includes("about") || transcript.includes("aboutpage")) {
      speak("opening about page");
      navigate("/about");
      setShowSearch(false);
    } else if (transcript.includes("home") || transcript.includes("homepage")) {
      speak("opening home page");
      navigate("/");
    } else if (
      transcript.includes("cart") ||
      transcript.includes("kaat") ||
      transcript.includes("caat")
    ) {
      speak("opening your cart");
      navigate("/cart");
      setShowSearch(false);
    } else if (transcript.includes("contact")) {
      speak("opening contact page");
      navigate("/contact");
      setShowSearch(false);
    } else if (
      transcript.includes("order") ||
      transcript.includes("myorders") ||
      transcript.includes("orders") ||
      transcript.includes("my order")
    ) {
      speak("opening your orders");
      navigate("/order");
      setShowSearch(false);
    } else {
      console.log("Try again!");
    }
  };

  const startRecognition = () => {
    setActiveAi(true);
    recognition.start();
  };

  recognition.onend = () => {
    setActiveAi(false);
  };

  return (
    <div
      className="fixed lg:bottom-[20px] md:bottom-[40px] bottom-[80px] left-[2%]"
      onClick={startRecognition}
      setActiveAi
    >
      <img
        src={ss}
        alt="AI Mic"
        className={`w-[100px] cursor-pointer rounded-full
          ${activeAi ? "translate-x-[10%] translate-y-[-10%] scale-125" : "translate-x-0 translate-y-0 scale-100"}
          transition-transform
        `}
        style={{
          filter: activeAi
            ? "drop-shadow(0px 0px 30px #00d2fc)"
            : "drop-shadow(0px 0px 20px black)",
        }}
      />
    </div>
  );
};

export default Ai;
