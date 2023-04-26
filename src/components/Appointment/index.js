import React, { Fragment } from "react";
import "./styles.scss";
import Header from "./Header.js";
import Empty from "./Empty.js";
import Show from "./Show.js";
import Form from "./Form.js";
import Confirm from "./Confirm";
import Status from "./Status.js";
import Error from "./Error.js";
import { useVisualMode } from "hooks/useVisualMode";



const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const DELETING = "DELETING";
const CONFIRM = "CONFIRM";
const EDIT = "EDIT";
const ERROR_SAVE = "ERROR_SAVE";
const ERROR_DELETE = "ERROR_DELETE";

export default function Appointment(props) {

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );

  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERROR_SAVE, true));
  }


  function deleteBooking() {
    transition(DELETING, true);
    props.cancelInterview(props.id)
      .then(() => transition(EMPTY))
      .catch(err => {
        console.log("err", err.message)
        transition(ERROR_DELETE, true)}
    );
  }


  return (
    <article className="appointment" data-testid="appointment">
      <Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={props.interviewers}
          onCancel={() => { back(); }}
          onSave={save}
        />
      )}
      {mode === EDIT && (
        <Form
          interviewers={props.interviewers}
          student={props.interview.student}
          interviewer={props.interview.interviewer.id}
          onCancel={() => { back(); }}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"SAVING"} />}
      {mode === ERROR_SAVE && <Error message={"Error Save"} onClose={back}/>}
      {mode === ERROR_DELETE && <Error message={"Error Deleting"} onClose={back}/>}
      {mode === DELETING && <Status message={"DELETING"} />}
      {mode === CONFIRM && <Confirm message={"Delete?"}
        onCancel={back}
        onConfirm={deleteBooking}
      />}
    </article>
  );
}

