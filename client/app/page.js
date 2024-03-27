"use client";
import Title from "@/components/title";
import Dropdown from "@/components/dropdown";
import GenerateRecipe from "@/components/GenerateRecipe";
import RecipeCard from "@/components/RecipeCard";
import userStore from "@/lib/userStore";
import Transition from "@/lib/transition";

export default function Home() {
  const { foodRecipe, foodImage } = userStore();

  return (
    <main className="w-full px-12 py-12 md:py-24 space-y-[50px]">
      <Title />
      <Dropdown />
      <div className="flex flex-col items-center">
        {!foodRecipe && <GenerateRecipe />}
        <Transition>{foodRecipe && <RecipeCard />}</Transition>
      </div>
      {/* <button onClick={() => console.log(foodRecipe)}>get data</button>
      <button onClick={() => console.log(foodImage)}>get image</button> */}
    </main>
  );
}
