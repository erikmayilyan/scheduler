import React from "react";
import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import { useVisualMode } from "hooks/useVisualMode";
import "./styles.scss";
import Status from "./Status";

export default function Appointment(props) {
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETE = "DELETE";
  const CONFIRM = "CONFIRM";

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
      .then(() => {transition(SHOW)});
  }

  function cancel() {
    transition(DELETE);
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
          onDelete={cancel}
        />
      )}
      {mode === SAVING && <Status message="SAVING..." />}
      {mode === DELETE && <Status message="DELETING..." />}
    </article>
  )
}