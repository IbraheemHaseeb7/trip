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
      return {};
  }
}
