export function reducer(state, action) {
  switch (action.type) {
    case "activities":
      return {
        activities: {
          ...state?.activities,
          [action.payload.name]: action.payload.value,
        },
      };
    case "activities_submit":
      return {
        ...state,
        activities: { id: "", name: "", cost: "" },
      };
    case "travellers":
      return {
        travellers: {
          ...state?.travellers,
          [action.payload.name]: action.payload.value,
        },
      };
    case "travellers_submit":
      return {
        ...state,
        travellers: { id: "", name: "", phoneNumber: "" },
      };
    case "expenditure":
      return {
        ...state,
        expenditure: {
          ...state?.expenditure,
          [action.payload.name]: action.payload.value,
        },
      };
  }
}
