"use client";
import { useEffect, useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import StartScreen from "../StartScreen/StartScreen";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
  });
  return isLoading ? <LoadingScreen /> : <StartScreen />;
}
