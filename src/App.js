import { useState } from "react";
import logo from "./logo.svg";
import "./logo.css";

function App() {
  const [meal, setMealData] = useState([]);
  const [ingredients, setIngredients] = useState([]);

  const getRandomMeal = () => {
    setMealData([]);
    setIngredients([]);
    fetch("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((res) => res.json())
      .then((res) => createMeal(res.meals[0]));
  };

  const createMeal = (data) => {
    console.log(data);
    let finished = false;
    let ingredientsArray = [];
    for (let i = 1; i <= 20; i++) {
      if (data[`strIngredient${i}`]) {
        ingredientsArray.push(
          `${data[`strMeasure${i}`]} ${data[`strIngredient${i}`]}`
        );
      } else {
        finished = true;
        break;
      }
    }
    if (finished) {
      setMealData(data);
      setIngredients(ingredientsArray);
    }
  };
  return (
    <div className="w-full max-w-6xl h-auto mx-auto p-6">
      <img src={logo} className="logo mx-auto" alt="logo" />
      <h1 className="font-light w-full text-center text-2xl sm:text-3xl dark:text-white text-gray-800">
        Feeling hungry?
      </h1>
      <h2 className="font-light max-w-2xl mx-auto w-full text-xl dark:text-white text-gray-500 text-center py-4">
        Get a random meal by clicking below
      </h2>
      <div className="flex justify-center items-center">
        <button
          onClick={() => getRandomMeal()}
          className="py-2 px-4 bg-green-600 hover:bg-green-700 focus:ring-green-500 focus:ring-offset-green-200 text-white transition ease-in duration-200 text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 "
        >
          Get Meal 🍔
        </button>
      </div>
      {meal && (
        <div>
          <div className="flex justify-center items-center">
            <img
              src={meal.strMealThumb}
              alt=""
              className="object-cover rounded-lg w-1/4 h-auto"
            />
            <div className="ml-2">
              <h4 className="text-2xl font-bold dark:text-white m-2">
                {meal.strMeal}
              </h4>
              <p className="text-md dark:text-white m-2">
                {meal.strInstructions}
              </p>
              {meal.strCategory && (
                <span className="text-md font-bold dark:text-white m-2">
                  Category: {meal.strCategory}
                </span>
              )}
              {meal.strArea && (
                <span className="text-md font-bold dark:text-white m-2">
                  Area: {meal.strArea}
                </span>
              )}
              {meal.strTags && (
                <span className="text-md font-bold dark:text-white m-2">
                  Tags: {meal.strTags.split(",").join(", ")}
                </span>
              )}
            </div>
          </div>
          {ingredients.length > 0 && (
            <>
              <h5 className="text-2xl font-bold dark:text-white">
                Ingredients
              </h5>
              <div className="flex justify-start items-center space-y-2 mx-auto">
                <ul>
                  {ingredients.map((ingredient, index) => (
                    <li
                      key={index}
                      className="text-base text-gray-700 dark:text-white"
                    >
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </div>
            </>
          )}

          {meal.strYoutube && (
            <>
              <h5 className="text-xl font-bold dark:text-white">
                Recipe Video
              </h5>
              <div className="flex justify-start items-center mt-3">
                <iframe
                  width="640"
                  height="360"
                  title={meal.strMeal}
                  src={`https://www.youtube.com/embed/${meal.strYoutube.slice(
                    -11
                  )}`}
                ></iframe>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default App;
