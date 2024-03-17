import { create } from "zustand";

const userStore = create((set) => ({
  userCuisine: "French",
  userCourse: "Main Course",
  userAllergies: "None",
  foodRecipe: "",
  foodImage: "",
  questionIndex: 0,
  setUserCuisine: (cuisine) =>
    set((state) => ({ ...state, userCuisine: cuisine })),
  setUserCourse: (course) => set((state) => ({ ...state, userCourse: course })),
  setUserAllergies: (allergies) =>
    set((state) => ({ ...state, userAllergies: allergies })),
  setFoodRecipe: (recipe) => set((state) => ({ ...state, foodRecipe: recipe })),
  setFoodImage: (image) => set((state) => ({ ...state, foodImage: image })),
  setQuestionIndex: (amount) =>
    set((state) => ({ ...state, questionIndex: state.questionIndex + amount })),
}));

export default userStore;
