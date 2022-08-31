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
    case "admin_portal":
      return {
        ...state,
        type: action.payload,
      };
    case "admin_form":
      return {
        ...state,
        formType: action.payload,
      };
    case "open":
      return {
        ...state,
        open: !state.open,
      };
    case "get_data":
      return {
        ...state,
        data: action.payload,
      };
  }
}
