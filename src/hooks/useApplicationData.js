import { useState, useEffect } from "react";
import axios from "axios";

//appointment id is known when an interview is confirmed or canceled by the server
//number of spots is inside each day object
//number of spots is the number of appointments that are null
//should update the spots when we book or cancel an interview - but have to update the state
//with the new number of spots when the update is confirmed on the server side.  
//so it should be done in the bookInterview and cancelInterview functions and applied in the .then part of the AJAX request
//if the number of spots is null then a spot is free
//

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
      console.log(days);
      console.log(appointments);
      console.log(interviewers);
      console.log(all);
      setState(prev => ({ ...prev, days, appointments, interviewers }));
    });
  }, []);

   //iterate over the days
    //figure out which day this appointment is for
    //go into the appointments for that day
    //figure out which ones have an interview of null
    //set spots to the length of null interviews
    //put code in another function to keep it dry so can use it in cancelInterview
    function getSpots(appointments) {
      //iterate over the days in the state
      //return the day
      const day = state.days.find((day) => {
        if (day.name === state.day)
        return day
      });
      //filtering through the appointments ids that came back from find.
      //because state object hasn't been updated yet, 
      //need to use the new apointments object created in bookInterview and canInterview
      const spots = day.appointments.filter((aptID) => {
        //checking if the given appointments interview is null
       return appointments[aptID].interview === null
       //filter returns an array, in this case an array of null interviews. 
       //want to know how many elements are in that array, so use .length
      }).length
      return spots 
    }



  function bookInterview(id, interview) {
    console.log("bookInterview called with id:", id, "and interview:", interview);
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    console.log("appointment with new interview:", appointment);
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    //getSpots from updated appointments
    const newSpots = getSpots(appointments)
    const newDays = state.days.map(day => {   
      if (day.name === state.day) {
      return { ...day, spots: newSpots };
      }
      return day;
      });
      console.log("updated appointments:", appointments);
      console.log("updated days:", newDays);
    return axios.put(`/api/appointments/${id}`, { interview })
      .then(() => { 
        setState(prevState => ({ ...prevState, days: newDays, appointments })); //updating state with the new appointments objects
        console.log("*****", state)
      })
      .catch(error => {
        console.log("error updating appointment:", error);
      });
  }


  function cancelInterview(id) {
    const appointment = {
      ...state.appointments[id],
      interview: null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    const newSpots = getSpots(appointments)
    const newDays = state.days.map(day => {
      if (day.name === state.day) {
      return { ...day, spots: newSpots };
      }
      return day;
      });
    return axios.delete(`/api/appointments/${id}`)
      .then(() => {
        setState(prevState => ({ ...prevState, days: newDays, appointments }));
      });
  }

return {state, setDay, bookInterview, cancelInterview}

}