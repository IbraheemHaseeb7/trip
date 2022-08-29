export function reducer(state, action) {
  switch (action.type) {
    case "typing":
      if (
        action.payload.name === "departure" ||
        action.payload.name === "arrival"
      ) {
        return {
          ...state,
          travelling: {
            ...state.travelling,
            [action.payload.name]: parseInt(action.payload.value),
          },
        };
      } else {
        return {
          ...state,
          [action.payload.name]: action.payload.value,
        };
      }

    case "activity":
      return {
        ...state,
        activities: [
          ...state.activities,
          {
            name: action.payload.value.name,
            cost: parseInt(action.payload.value.cost),
            id: action.payload.id,
          },
        ],
      };

    case "delete_activity":
      const array = state.activities.filter((value) => {
        return value.id !== action.payload;
      });

      return {
        ...state,
        activities: array,
      };

    case "traveller":
      return {
        ...state,
        travellers: [
          ...state.travellers,
          {
            name: action.payload.value.name,
            phoneNumber: parseInt(action.payload.value.phoneNumber),
            id: action.payload.id,
          },
        ],
      };
    case "delete_traveller":
      const array2 = state.travellers.filter((value) => {
        return value.id !== action.payload;
      });

      return {
        ...state,
        travellers: array2,
      };

    case "status":
      return { ...state, status: action.payload };

    case "submit":
      return {
        name: "",
        destination: "",
        date: "",
        travelling: {
          departure: 0,
          arrival: 0,
        },
        activities: [],
        travellers: [],
        status: "",
      };
  }
}
