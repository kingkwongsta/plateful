"use client";

import { useState } from "react";

import DropdownItem from "./dropdownitem";

import userStore from "@/lib/userStore";

export default function Dropdown() {
  const {
    userCuisine,
    setUserCuisine,
    userCourse,
    setUserCourse,
    userAllergies,
    setUserAllergies,
  } = userStore();

  const cuisineOptions = ["French", "Italian", "Japanese", "Indian", "Mexican"];

  const courseOptions = ["Appetizer", "Main Course", "Dessert"];

  const allergiesOptions = [
    "Gluten",
    "Dairy",
    "Nuts",
    "Shellfish",
    "Soy",
    "Eggs",
    "None",
  ];

  return (
    <div className="container px-4 md:px-6 flex flex-col gap-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-row gap-10 justify-center">
          <DropdownItem
            buttonName={"Cuisine"}
            dropDownValues={cuisineOptions}
            preference={userCuisine}
            setPreference={setUserCuisine}
          />
          <DropdownItem
            buttonName={"Course"}
            dropDownValues={courseOptions}
            preference={userCourse}
            setPreference={setUserCourse}
          />
          <DropdownItem
            buttonName={"Allergies"}
            dropDownValues={allergiesOptions}
            preference={userAllergies}
            setPreference={setUserAllergies}
          />
        </div>
      </div>
    </div>
  );
}
