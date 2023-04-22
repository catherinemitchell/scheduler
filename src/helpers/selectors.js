export function getAppointmentsForDay(state, day) {
  //- need an empty list to begin with
  // get the day object for this day
  //get the day object appointments
  //loop throught the appointments array
  //forEach apointment id, get the appointment that matches that id
  //add that appointment to our list 
  //return the list
  if (state.days.length === 0) {
    return [];
  }
  const dayObj = state.days.find(d => d.name === day);
  if (!dayObj) {
    return [];
  }
  let array = dayObj.appointments.map((id) => {
    return state.appointments[id];
  });
  return array;
}

//   const hasDays = Boolean(state.days.length)
//   if (!hasDays) {
//     return []
//   }
//   let foundDay;
//   for (const dayObj of state.days) {
//     if (dayObj.name === day) {
//       foundDay = dayObj
//     }
//   } 
//   if (!foundDay) {
//     return []
//   }

//   const result = foundDay.appointments.map((appointmentId) => {
//    const foundAppointment = Object.values(state.appointments).find(({ id }) => id === appointmentId)
//   return foundAppointment
//   })
//   return result 
// };

export function getInterview(state, originalInterview) {
  //return a new object containing the interview data when we pass it an object that conatins the interviewer
  //otherwise it should return null
  //return null if no interview is booked
  if (!originalInterview) {
    return null;
  }
  //return null if no interviewer object passed
  const interviewerObject = state.interviewers[originalInterview.interviewer];
  if (!interviewerObject) {
    return null;
  }
  return { ...originalInterview, interviewer: interviewerObject };
}



export function getInterviewersForDay(state, day) {
  //- need an empty list to begin with
  // get the day object for this day
  //get the day object interviewers
  //loop throught the interviewers array
  //forEach interviewers id, get the interviewers that matches that id
  //add that appointment to our list 
  //return the list
  if (state.days.length === 0) {
    return [];
  }
  const dayObj = state.days.find(d => d.name === day);
  if (!dayObj) {
    return [];
  }
  let array = dayObj.interviewers.map((id) => {
    return state.interviewers[id];
  });
  return array;
}

// const hasInterviewers = Boolean(state.days.length)
// if (!hasInterviewers) {
//   return []
// }
// let foundDay;
// for (const dayObj of state.days) {
//   if (dayObj.name === day) {
//     foundDay = dayObj
//   }
// } 
// if (!foundDay) {
//   return []
// }

// const result = foundDay.appointments.map((interviewersId) => {
//  const foundInterviewer = Object.values(state.appointments).find(({ id }) => id === interviewersId)
// return foundInterviewer
// })
// return result 
// };












