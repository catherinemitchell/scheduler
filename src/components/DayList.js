import React from "react";
import DayListItem from "./DayListItem";

function DayList(props) {
  
  const daysArray = props.days.map((day) => {
    const selected = day.name === props.value ? true : false;
    
    return < DayListItem key={day.id} name={day.name} spots={day.spots} selected={selected} setDay={props.onChange}/>
  })

  return (
    <ul>
      {daysArray}
    </ul>
  );
}

export default DayList;