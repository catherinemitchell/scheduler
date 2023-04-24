import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";
import Form from "./Form.js";
import Status from "./Status.js";
import { useVisualMode } from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };

    transition(SAVING)
    // console.log("id", props.id, "interview", interview)
    props.bookInterview(props.id, interview).then(() => transition(SHOW))
  }
  

  return (
    <article className="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
      )}
       {mode === CREATE && (
       <Form 
       interviewers={props.interviewers}
       onCancel={() => {back()}}
       onSave={save}
       />
       )}
       {mode === SAVING && <Status message={"SAVING"} />}
    </article>
  );
}

