import { createSlice, nanoid } from "@reduxjs/toolkit";

const carsSlice = createSlice({
  name: "cars",
  initialState: {
    searchTerm: "",
    cars: [],
  },
  reducers: {
    changeSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
    //Assumption:
    //action.payload==={name:"ab",cost:140}
    addCar(state, action) {
      state.cars.push({
        name: action.payload.name,
        cost: action.payload.cost,
        id: nanoid(),
      });
    },
    //Assumption:
    //action.payload===id of the car we want to delete
    removeCar(state, action) {
      const updated = state.cars.filter((car) => {
        return car.id !== action.payload;
      });
      state.cars = updated;
    },
  },
});

export const { changeSearchTerm, addCar, removeCar } = carsSlice.actions;
export const carsReducer = carsSlice.reducer;
