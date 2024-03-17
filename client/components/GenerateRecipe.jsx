"use client";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import LoadingIcon from "./LoadingIcon";
import userStore from "@/lib/userStore";
import { createImage } from "@/app/actions";

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
        ? `https://food-recipe-backend.vercel.app/recipe`
        : `http://127.0.0.1:8000/food`;

    const url = `${baseUrl}?${queryString}`;
    const res = await fetch(url);
    const data = await res.json();

    if (data) {
      console.log("in the image api call");
      const imageResponse = await createImage(data);
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
