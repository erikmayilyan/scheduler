import React, {useState, useEffect} from "react";

// function selectUserByName(state, name) {
//   const filteredNames = state.users.filter(user => user.name === name);
//   return filteredNames;
// }

export function getAppointmentsForDay(state, day) {
 console.log("THIS IS THE STATE: ", state);
 const filteredNames = state.days.filter(d => d.name === day);
 if (!filteredNames.length) {
    return [];
 }
 const appID = filteredNames[0].appointments;
 //console.log(appID);
 const appArr = [];
 for (const id of appID) {
   appArr.push(state.appointments[id])
 }
 return appArr;
};


export function getInterview(state, interview) {
  if (!interview) {
    return null
  }
  const id = interview.interviewer;
  if (!state.interviewers[id]) {
    console.log("THERE IS THE NULL: ", null);
    return null;
  }
  let obj = {
     student: interview.student,
     interviewer: {
       id: state.interviewers[id].id,
       name: state.interviewers[id].name,
       avatar: state.interviewers[id].avatar
     }
  }
  console.log(state.interviewers[id].name);
  return obj
}

export function getInterviewersForDay(state, day) {
  const filteredNames = state.days.filter(d => d.name === day);
   if (!filteredNames.length) {
      return [];
   }
   const appID = filteredNames[0].interviewers;
   console.log(appID);
   const appArr = [];
   for (const id of appID) {
     appArr.push(state.interviewers[id])
   }
   return appArr;
}
