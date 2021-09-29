import React from "react";
import "./InterviewerListItem.scss";
import InterviewerListItem from "./InterviewerListItem";

export default function InterviewerList(props) {
  const {interviewers, interviewer, setInterviewer} = props;

  const interviewerList = props.interviewers.map((interviewer) => {
    return <InterviewerListItem 
              id={interviewer.id} 
              name={interviewer.name} 
              avatar={interviewer.avatar} 
              selected={interviewer.id === props.interviewer} 
              setInterviewer={event => props.setInterviewer(interviewer.id)}
    />
  })

  return (
    <section className={interviewers}>
      <h4 className="interviewers__header text--light">Interviewer</h4>
      <ul className="interviewers__list">
        {interviewerList}
      </ul>
    </section>
  );
}