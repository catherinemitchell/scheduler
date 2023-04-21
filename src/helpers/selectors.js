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
}