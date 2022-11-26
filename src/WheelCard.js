import React, { forwardRef,useRef } from "react";

function WheelCard(props,ref) {
    return (
      <div className="wheel__card" ref={ref} onClick={(e) => props.cardOnClick(e) }>
        <img src={props.cardImg}/>
      </div>
    );
  }
  
  export default forwardRef(WheelCard);
  