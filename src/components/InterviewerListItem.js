import React from "react";
import "components/InterviewerListItem.scss";
import classNames from "classnames";

function InterviewerListItem (props) {
  const {id, name, avatar, selected} = props
  const interviewersClass = classNames("interviewers__item", {
    "interviewers__item--selected": selected
  })

  return (
    <li className={interviewersClass} 
    onClick={() => props.setInterviewer(id)} >
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