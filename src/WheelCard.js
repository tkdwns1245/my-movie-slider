import React, { forwardRef } from "react";

function WheelCard(cardImg,ref) {
    return (
      <div className="wheel__card" ref={ref}>
        <img src={cardImg.cardImg}/>
      </div>
    );
  }
  
  export default forwardRef(WheelCard);
  