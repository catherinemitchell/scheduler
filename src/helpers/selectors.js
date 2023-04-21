export function getAppointmentsForDay(state, day) {
  
  const hasDays = Boolean(state.days.length)
  if (!hasDays) {
    return []
  }
  let foundDay;
  for (const dayObj of state.days) {
    // console.log(day)
    if (dayObj.name === day) {
      console.log("Found NAME!")
      foundDay = dayObj
    }
  } 
  if (!foundDay) {
    return []
  }
  console.log("Selected day after loop", foundDay)
  // console.log(Object.values(state.appointments))
  const result = foundDay.appointments.map((appointmentId) => {
    // console.log("Appointment ID", appointmentId)
   const foundAppointment = Object.values(state.appointments).find(({ id }) => id === appointmentId)
    console.log("FOUND APP", foundAppointment)
  return foundAppointment
  })
  console.log("Finished?", result)
  return result 
}