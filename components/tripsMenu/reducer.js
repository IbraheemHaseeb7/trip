export function reducer(state, action) {
  switch (action.type) {
    case "trip_menu":
      return {
        ...state,
        status: action.payload,
      };
    case "inner_menu":
      return {
        ...state,
        inner: action.payload,
      };
  }
}
