import { useState, useEffect } from "react";
import axios from "axios";

export function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  const setDay = day => setState(prev => ({ ...prev, day }));

  useEffect(() => {
    Promise.all([
      axios.get(`/api/days`),
      axios.get(`/api/appointments`),
      axios.get(`/api/interviewers`)
    ]).then(all => {
      const [days, appointments, interviewers] = all.map(res => res.data);
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);


  function getSpots(appointments, state) {
    //iterate over the days in the state
    //return the day
    const day = state.days.find((day) => day.name === state.day);
    //filtering through the appointments ids that came back from find.
    //because state object hasn't been updated yet, 
    //need to use the new apointments object created in bookInterview and canInterview
    const spots = day.appointments.filter((aptID) => {
      //checking if the given appointments interview is null
      return appointments[aptID].interview === null;
      //filter returns an array, in this case an array of null interviews. 
      //want to know how many elements are in that array, so use .length
    }).length;
    const newDays = state.days.map(day => {
      if (day.name === state.day) {
        return { ...day, spots: spots };
      }
      return day;
    });
    return newDays;
  };


  function bookInterview(id, interview) {

    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };

    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //getSpots from updated appointments
    const newDays = getSpots(appointments, state);
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => {
        setState(prevState => ({ ...prevState, days: newDays, appointments })); //updating state with the new appointments objects
      });
  };


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newDays = getSpots(appointments, state);

    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prevState => ({ ...prevState, days: newDays, appointments }));
      });
  };

  return { state, setDay, bookInterview, cancelInterview };

};