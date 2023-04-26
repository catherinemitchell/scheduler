export function getAppointmentsForDay(state, day) {

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
};

export function getInterview(state, originalInterview) {

  if (!originalInterview) {
    return null;
  }

  const interviewerObject = state.interviewers[originalInterview.interviewer];
  if (!interviewerObject) {
    return null;
  }
  return { ...originalInterview, interviewer: interviewerObject };
};


export function getInterviewersForDay(state, day) {

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
};














