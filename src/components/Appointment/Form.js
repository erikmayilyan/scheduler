import React, { useState } from 'react'
import InterviewerList from "../InterviewerList";
import Button from "../Button";

export default function Form(props) {
  const [name, setName] = useState(props.name || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  function reset() {
    setName("");
    setInterviewer(null);
  }

  function cancel() {
    reset();
    props.onCancel();
  }

  function test(id) {
   console.log(id);
  }

  return (
  <main className="appointment__card appointment__card--create">
    <section className="appointment__card-left">
      <form autoComplete="off">
        <input
          className="appointment__create-input text--semi-bold"
          name="name"
          value={name}
          type="text"
          placeholder="Enter Student Name"
          /*
            This must be a controlled component
          */
          onChange={(event) => setName(event.target.value)}
        />
      </form>
      <InterviewerList interviewers={props.interviewers} value={interviewer} setInterviewer={setInterviewer} />
    </section>
    <section className="appointment__card-right">
      <section className="appointment__actions">
        <Button danger onClick={cancel}>Cancel</Button>
        <Button confirm onClick={() => {props.save(name, interviewer)}}>Save</Button>
      </section>
    </section>
  </main>
  )
}