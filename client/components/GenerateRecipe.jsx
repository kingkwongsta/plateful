"use client";
import { Button } from "@/components/ui/button";
import userStore from "@/lib/userStore";
import { useState } from "react";
import LoadingIcon from "./LoadingIcon";

export default function GenerateRecipe() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    setFoodRecipe,
    userCuisine,
    userCourse,
    userAllergies,
    setFoodImage,
  } = userStore();

  const fetchData = async () => {
    const queryString = new URLSearchParams({
      cuisine: userCuisine,
      course: userCourse,
      allergies: userAllergies,
    });

    const baseUrl =
      process.env.NODE_ENV === "production"
        ? `https://food-recipe-backend.vercel.app/recipe?${queryString}`
        : `/recipe?${queryString}`;

    const url = `${baseUrl}?${queryString}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data) {
      const imageResponse = await createImage(data, userCourse);
      const imageURL = `data:image/jpeg;base64,${imageResponse[0].imageData}`;
      setFoodRecipe(data);
      setFoodImage(imageURL);
    }

    setIsLoading(false);
  };

  return (
    <>
      <form action={fetchData}>
        <Button
          type="submit"
          className={`${isLoading ? "hidden" : ""}`}
          onClick={() => setIsLoading(true)}
        >
          Generate Recipe
        </Button>
      </form>
      {isLoading && <LoadingIcon />}
    </>
  );
}
