import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import Confirm from "./Confirm";
import "./styles.scss";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";

  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer
    };
    console.log("INTERVIEW: ", interview);
    console.log("PROPS ID: ", props.id);
    transition(SAVING);
    props.bookInterview(props.id, interview)
      .then(() => {transition(SHOW)});
  }

  function cancel() {
    props.cancelInterview(props.id)
      .then(() => {transition(EMPTY)})
      .catch((err) => console.log(err));
  }

  return (
    <article className="appointment">
      <Header time={props.time}/>
      {/* {props.interview && <Show student={props.interview.student} interviewer={props.interview.interviewer} />}
      {!props.interview && <Empty />} */}
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={back} save={save} />}
      {mode === SHOW && (
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === SAVING && <Status message="SAVING..." />}
      {mode === EDIT && <Form name={props.interview.student} interviewers={props.interviewers} onCancel={back} save={save} interviewer={props.interview.interviewer}/>}
      {mode === DELETE && <Status message="DELETING..." />}
      {mode === CONFIRM && <Confirm message="ARE YOU SURE THAT YOU WANT TO DELETE THE APPOINTMENT?" onCancel={back} onConfirm={cancel} />}
    </article>
  )
}