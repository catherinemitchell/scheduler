import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  
  const daysArray = props.days.map((day) => {
   
    const selected = day.name === props.day ? true : false;
    
    return < DayListItem key={day.id} name={day.name} spots={day.spots} selected={selected} setDay={props.setDay}/>
  })

  return (
    <ul>
      {daysArray}
    </ul>
  );
}

export default DayList;