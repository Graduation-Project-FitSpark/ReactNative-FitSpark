import React, { createContext, useState } from "react";

export const QuizContext = createContext();

export const QuizProvider = ({ children }) => {
  const [goal, setGoal] = useState("");
  const [bodyType, setBodyType] = useState("");
  const [problemArea, setProblemArea] = useState("");
  const [expectation, setExpectation] = useState("");
  const [allergies, setAllergies] = useState("");
  const [diet, setDiet] = useState("");
  const [sugarFrequency, setSugarFrequency] = useState("");
  const [waterIntake, setWaterIntake] = useState("");
  const [targetWeight, setTargetWeight] = useState("");
  const [additionalGoals, setAdditionalGoals] = useState("");
  const [pushUps, setPushUps] = useState("");
  const [pullUps, setPullUps] = useState("");
  const [workoutTime, setWorkoutTime] = useState("");
  const [mealPrepTime, setMealPrepTime] = useState("");
  const [physicalLimitations, setPhysicalLimitations] = useState("");
  const [supplements, setSupplements] = useState("");
  const [sleepPattern, setSleepPattern] = useState("");

  return (
    <QuizContext.Provider
      value={{
        goal,
        setGoal,
        bodyType,
        setBodyType,
        problemArea,
        setProblemArea,
        expectation,
        setExpectation,
        allergies,
        setAllergies,
        diet,
        setDiet,
        sugarFrequency,
        setSugarFrequency,
        waterIntake,
        setWaterIntake,
        targetWeight,
        setTargetWeight,
        additionalGoals,
        setAdditionalGoals,
        pushUps,
        setPushUps,
        pullUps,
        setPullUps,
        workoutTime,
        setWorkoutTime,
        mealPrepTime,
        setMealPrepTime,
        physicalLimitations,
        setPhysicalLimitations,
        supplements,
        setSupplements,
        sleepPattern,
        setSleepPattern,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};
