import logo from './logo.svg';
import './App.css';
import SliderSection from './SliderSection';
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { React,useRef,useLayoutEffect } from 'react';
function App() {
  const boxRef = useRef();
  gsap.registerPlugin(ScrollTrigger);
  useLayoutEffect(() => {
  
    // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    let ctx = gsap.context(() => {
      gsap.to(".arrow", { y: 5, ease: "power1.inOut", repeat: -1, yoyo: true });
    }, boxRef); // <- IMPORTANT! Scopes selector text
    
    return () => ctx.revert(); // cleanup
    
  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div className="App" ref={boxRef}>
      <div className="header">
      </div>
      <SliderSection>
      </SliderSection>
      <div className="scroll-down">Scroll down<div className="arrow"></div>
      </div>
    </div>
  );
  
}

export default App;
