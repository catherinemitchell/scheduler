export function getAppointmentsForDay(state, day) {
  
  const hasDays = Boolean(state.days.length)
  if (!hasDays) {
    return []
  }
  let foundDay;
  for (const dayObj of state.days) {
    if (dayObj.name === day) {
      foundDay = dayObj
    }
  } 
  if (!foundDay) {
    return []
  }

  const result = foundDay.appointments.map((appointmentId) => {
   const foundAppointment = Object.values(state.appointments).find(({ id }) => id === appointmentId)
  return foundAppointment
  })
  return result 
};

export function getInterview(state, originalInterview) {
  //return a new object containing the interview data when we pass it an object that conatins the interviewer
  //otherwise it should return null

  //return null if no interview is booked
  if (!originalInterview) {
    return null
  }

  //return null if no interviewer object passed
  const interviewerObject = state.interviewers[originalInterview.interviewer]
  console.log(interviewerObject)
  if (!interviewerObject) {
    return null
  }

return {...originalInterview, interviewer: interviewerObject}

}












