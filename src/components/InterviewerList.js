import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "components/InterviewerList.scss";

function InterviewerList(props) {

  const interviewersArray = props.interviewers.map((interviewer) => {
    const selected = interviewer.id === props.interviewer ? true : false;

    return < InterviewerListItem id={interviewer.id} key={interviewer.id} name={interviewer.name} avatar={interviewer.avatar} selected={selected} setInterviewer={props.setInterviewer}/>
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list"> {interviewersArray}</ul>
    </section>
  );
}

export default InterviewerList;