import { useSelector, useDispatch } from "react-redux";
import { removeCar } from "../store";

function CarList() {
  const dispatch = useDispatch();
  //const cars = useSelector((state) => {
  //our big state obj has 2keys: "cars" & "form"
  //our cars state is a obj with 2 sub keys :"cars" & "searchTerm"
  //hence stste.cars.cars
  //to change it we can either change name of cars key in store
  //or cars state name in carsSlice.
  //here keeping same name to remember this weird double key thing
  //  return state.cars.cars;
  // });

  const { cars, name } = useSelector(({ form, cars: { cars, searchTerm } }) => {
    //Adding filter logic here directly so we get desired list only
    //best place to calculate derived stat is inside use Selector funcs.
    const filteredCars = cars.filter((car) =>
      car.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      cars: filteredCars,
      name: form.name,
    };
  });

  const handleCarDelete = (car) => {
    dispatch(removeCar(car.id));
  };

  const renderedCars = cars.map((car) => {
    //DECIDE IF THIS CAR SHOULD BE BOLD
    const bold = name && car.name.toLowerCase().includes(name.toLowerCase());

    return (
      <div key={car.id} className={`panel ${bold && "bold"}`}>
        <p>
          {car.name} - ${car.cost}
        </p>
        <button
          className="button is-danger"
          onClick={() => handleCarDelete(car)}
        >
          Delete
        </button>
      </div>
    );
  });

  return (
    <div className="car-list">
      {renderedCars}
      <hr />
    </div>
  );
}

export default CarList;
