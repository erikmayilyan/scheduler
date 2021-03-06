import React, { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {

  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: [],
    interviewers: {},
  });
  console.log("this is the state: ", state);
  const setDay = (day) => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get("/api/days"),
      axios.get("/api/appointments"),
      axios.get("/api/interviewers"),
    ]).then((data) => {
      setState((prev) => ({
        ...prev,
        days: data[0].data,
        appointments: data[1].data,
        interviewers: data[2].data,
      }));
      console.log("THE DATA: ", data);
    });
  }, []);

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = [];
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].name === state.day) {
        const updateDay = {
          ...state.days[i],
          spots: state.days[i].spots - 1
        };
        newDays.push(updateDay);
      } else {
        newDays.push(state.days[i]);
      }
    }
    return axios.put(`/api/appointments/${id}`, appointment)
       .then(() => setState({ ...state, appointments, days: newDays }))
       .then(() => {
        try {
          const appointment = {
            ...state.appointments[id],
            spots: state.appointments[id].spots - 1,
          };
          const appointments = {
            ...state.appointments,
            [id]: appointment,
          };
        }catch(error){
          console.log(error);
        }
        setState({ ...state, appointments, days: newDays });
       })
 
  }

  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    const newDays = [];
    for (let i = 0; i < state.days.length; i++) {
      if (state.days[i].name === state.day) {
        const updateDay = {
          ...state.days[i],
          spots: state.days[i].spots + 1
        };
        newDays.push(updateDay);
      } else {
        newDays.push(state.days[i]);
      }
    }
    return axios.delete(`/api/appointments/${id}`, appointment)
       .then(() => setState({ ...state, appointments, days: newDays }))
       .then(() => {
        const appointment = {
          ...state.appointments[id],
          spots: state.appointments[id].spots + 1,
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };
        setState({ ...state, appointments, days: newDays });
       })
  }

  return { state, setDay, bookInterview, cancelInterview }

}