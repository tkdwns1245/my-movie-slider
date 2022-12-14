import WheelCard from "./WheelCard";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Flip from "gsap/Flip";
import { useEffect,useRef,useLayoutEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

function SliderSection(props) {
    const imageList = [
        "https://assets.codepen.io/756881/amys-1.jpg",
        "https://assets.codepen.io/756881/amys-2.jpg",
        "https://assets.codepen.io/756881/amys-3.jpg",
        "https://assets.codepen.io/756881/amys-4.jpg",
        "https://assets.codepen.io/756881/amys-5.jpg",
        "https://assets.codepen.io/756881/amys-6.jpg",
        "https://assets.codepen.io/756881/amys-7.jpg",
        "https://assets.codepen.io/756881/amys-1.jpg",
        "https://assets.codepen.io/756881/amys-2.jpg",
        "https://assets.codepen.io/756881/amys-3.jpg",
        "https://assets.codepen.io/756881/amys-4.jpg",
        "https://assets.codepen.io/756881/amys-5.jpg",
        "https://assets.codepen.io/756881/amys-6.jpg",
        "https://assets.codepen.io/756881/amys-7.jpg",
        "https://assets.codepen.io/756881/amys-1.jpg",
        "https://assets.codepen.io/756881/amys-2.jpg",
        "https://assets.codepen.io/756881/amys-3.jpg",
        "https://assets.codepen.io/756881/amys-4.jpg",
        "https://assets.codepen.io/756881/amys-5.jpg",
        "https://assets.codepen.io/756881/amys-6.jpg",
        "https://assets.codepen.io/756881/amys-7.jpg",
        "https://assets.codepen.io/756881/amys-1.jpg",
    ]

    const revealRefs = useRef([]);
    const wheelRef = useRef();
    const sectionRef = useRef();
    const lastClickedCard = useState(null);
    revealRefs.current = [];
 
    const addToRefs = el => {
        if (!revealRefs.current.includes(el)) {
            revealRefs.current.push(el);
        }
    };
    useEffect(() => {
      const movieParams = {
        key:'01b8c9367db48a7e1abfd82921b4d640',
        targetDt:'20221125',
        itemPerPage: '20'
      }
      
      
      axios.get('http://www.kobis.or.kr/kobisopenapi/webservice/rest/boxoffice/searchDailyBoxOfficeList.json',{ params: movieParams })
      .then((Response)=>{
          return Response.data;
      }).then((response) =>{
        let dailyBoxOfficeList = response.boxOfficeResult.dailyBoxOfficeList;
        let searchParams;
        const naverHeader ={
          'X-Naver-Client-Id' : 'hjOsmn7IHqbI4ljQ1m8X',
          'X-Naver-Client-Secret' : 'kdx99NEa9k',
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
        }
        for(var i = 0; i < dailyBoxOfficeList.length; i++){
          searchParams = {query:dailyBoxOfficeList[i].movieNm}
          axios.get('/v1/search/movie.json',{
            params:searchParams,
            headers:naverHeader,
            withCredentials: true,
            credentials: 'same-origin',
          }).then((movieData)=> 
          {
            console.log(movieData.data)
          })
        } 
      }).catch((Error) => {
          console.log(Error);
      })
      gsap.registerPlugin(ScrollTrigger);
      // create our context. This function is invoked immediately and all GSAP animations and ScrollTriggers created during the execution of this function get recorded so we can revert() them later (cleanup)
      let ctx = gsap.context(() => {
        
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
      
      return () => ctx.revert(); // cleanup
      
    }, []); 
    return (
      <div className="slider-section" ref={sectionRef}>
        <div className="wheel" ref={wheelRef}>
          {imageList.map((cardImg,idx)=>
              <WheelCard cardImg={cardImg} key={idx} ref={addToRefs} cardOnClick={props.cardOnClick}/>
          )}
        </div>
      </div>
    );
  }
  
  export default SliderSection;
  