import WheelCard from "./WheelCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import { useEffect,useRef,useLayoutEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function SliderSection(props) {
    const [imageList,setImageList] = useState([]);

    const revealRefs = useRef();
    const wheelRef = useRef();
    const sectionRef = useRef();
    const [isImageLoading,setIsImageLoading] = useState(true);
    revealRefs.current = [];
 
    const addToRefs = el => {
        if (!revealRefs.current.includes(el)) {
            revealRefs.current = [...revealRefs.current,el];
        }
    };
    useEffect(() => {
      async function fetchData () {
        var response = await axios.get('http://localhost:4000/')
        let tmpImageList = [];
          setIsImageLoading(true);
          for(let i =0; i < response.data.length; i++){
            tmpImageList.push(response.data[i].image);
          }
          console.log("tmpImageList",tmpImageList);
          setImageList([...tmpImageList,...tmpImageList]);
          gsap.registerPlugin(ScrollTrigger);
          
      setIsImageLoading(false);

      }
      fetchData();
        
    }, [revealRefs]); 
    useLayoutEffect(()=>{
      if(revealRefs.current.length !== 0){
        // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
        let ctx = gsap.context(() => {
            console.log("revealRefs : " + revealRefs.current);
            console.log("wheelRef : ", + wheelRef.current)
            let radius = wheelRef.current.offsetWidth / 2;
            let center = wheelRef.current.offsetWidth / 2;
            let total = revealRefs.current.length;
            let slice = (2 * Math.PI) / total;
  
            revealRefs.current.forEach((item, i) => { 
              let angle = i * slice;
  
              let x = center + radius * Math.sin(angle);
              let y = center - radius * Math.cos(angle);
  
              gsap.set(item, {
                rotation: angle + "_rad",
                xPercent: -50,
                yPercent: -50,
                x: x,
                y: y
              });
            });
  
            
            gsap.to(".wheel", {
              rotate: () => -360,
              ease: "none",
              duration: revealRefs.current.length,
              scrollTrigger: {
                start: 0,
                end: "max",
                scrub: 1,
                snap: 1 / revealRefs.current.length,
                invalidateOnRefresh: true
              }
            });
  
          }, sectionRef); // <- IMPORTANT! Scopes selector text
        }
    },[revealRefs.current])
    return (
      
      <div className="slider-section" ref={sectionRef}>
        <div className="wheel" ref={wheelRef}>
          {
            !isImageLoading && imageList.map((cardImg,idx)=>{
              // console.log("cardImg",cardImg);
              return <WheelCard cardImg={cardImg} key={idx} ref={addToRefs} cardOnClick={props.cardOnClick}/>
            }
          )}
        </div>
      </div>
    );
  }
  
  export default SliderSection;
  