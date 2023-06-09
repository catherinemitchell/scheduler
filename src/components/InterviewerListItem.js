import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

function InterviewerListItem (props) {
  const {name, avatar, selected} = props
  const interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li className={interviewersClass} 
    onClick={props.setInterviewer} >
  <img
    className="interviewers__item-image"
    src={avatar}
    alt={name}
  />
  {selected && name}
</li>
  );
}

export default InterviewerListItem;