import React, { useState } from "react";

function Slider(props){
    function arrowDirection(){
        if(props.tabOpen) return  <ChevronLeftRoundedIcon />
        else return <ChevronRightRoundedIcon />
    }
    function toggleTabOpen(){
        const tab = props.tabOpen;
        props.toggleTabOpen();
    }

    return (
        <div className="slider">
            
        </div>
    );    
}

export default Slider;