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
      if (action.payload.name === "date") {
        const year = action.payload.value.substring(0, 4);
        const month = action.payload.value.substring(5, 7);
        const day = action.payload.value.substring(8);
        const MONTHS = {
          "01": "January",
          "02": "Febuary",
          "03": "March",
          "04": "April",
          "05": "May",
          "06": "June",
          "07": "July",
          "08": "August",
          "09": "September",
          10: "October",
          11: "November",
          12: "December",
        };
        return {
          ...state,
          expenditure: {
            ...state.expenditure,
            date: `${day} ${MONTHS[month]}, ${year}`,
          },
        };
      }
      return {
        ...state,
        expenditure: {
          ...state?.expenditure,
          [action.payload.name]: action.payload.value,
        },
      };
    case "image_link":
      return {
        ...state,
        expenditure: {
          ...state?.expenditure,
          src: { link: action.payload.link, id: action.payload.id },
        },
      };
  }
}
