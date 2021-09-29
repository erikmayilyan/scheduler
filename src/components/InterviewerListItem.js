import React from "react";
import "./InterviewerListItem.scss";

export default function InterviewerListItem(props) {
  const {id, name, avatar, selected, setInterviewer} = props;

  const listClass = selected ? "interviewers__item--selected" : "interviewers__item";

  return (
  <li className={listClass} onClick={setInterviewer}>
    <img
      className="interviewers__item-image"
      src={avatar}
      alt={name}
    />
    {selected ? name : ""}
  </li>);
}