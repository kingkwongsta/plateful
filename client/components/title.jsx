"use client";
import userStore from "@/lib/userStore";

export default function Title() {
  const { setFoodRecipe } = userStore();

  return (
    <div className="flex flex-col gap-2 items-center justify-center text-center">
      <div className="grid gap-8">
        <h1
          onClick={() => setFoodRecipe("")}
          className="text-3xl font-bold tracking-tight"
        >
          Plateful
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Find the recipe to satisfy your cravings by sharing your preferences
        </p>
      </div>
    </div>
  );
}
