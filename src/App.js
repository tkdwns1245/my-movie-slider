import logo from './logo.svg';
import './App.css';
import SliderSection from './SliderSection';
import gsap from "gsap";
import ScrollTrigger from 'gsap/ScrollTrigger';
import { React,useRef,useLayoutEffect,useState } from 'react';
import Flip from 'gsap/Flip';
function App() {
  const boxRef = useRef();
  let lastClickedCard;
  const headerRef = useRef();
  const putBack = function(e) {
    let image = headerRef.current.querySelector("img");
  
    let state = Flip.getState(image);
  
    lastClickedCard.appendChild(image);
  
    Flip.from(state, {
      duration: 0.6,
      ease: "sine.out",
      absolute: true
    });
  
    lastClickedCard = null;
  }
  
  const flip = function(e) {
    let image = e.target.querySelector("img");
    let state = Flip.getState(image);
    headerRef.current.appendChild(image);
  
    Flip.from(state, {
      duration: 0.6,
      ease: "sine.out",
      absolute: true
    });
  
    lastClickedCard = e.target;
  }

  const cardOnClick =  (e) => {
    console.log(e);
    if (lastClickedCard) {
      putBack(e);
    }
    flip(e);
  };
  
  const headerOnClick = (e) => {
    if (!lastClickedCard) return;
    putBack(e);
  };
  useLayoutEffect(() => {
    gsap.registerPlugin(Flip);
    // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
    let ctx = gsap.context(() => {
      gsap.to(".arrow", { y: 5, ease: "power1.inOut", repeat: -1, yoyo: true });
    }, boxRef); // <- IMPORTANT! Scopes selector text
    
    return () => ctx.revert(); // cleanup
    
  }, []); // <- empty dependency Array so it doesn't re-run on every render

  return (
    <div className="App" ref={boxRef}>
      <div className="header" ref={headerRef} onClick={(e)=> headerOnClick(e)}>
      </div>
      <SliderSection cardOnClick={cardOnClick}>
      </SliderSection>
      <div className="scroll-down">Scroll down<div className="arrow"></div>
      </div>
    </div>
  );
  
}

export default App;
