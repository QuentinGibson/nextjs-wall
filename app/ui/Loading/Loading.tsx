"use client";
import { useState } from "react";
import LoadingScreen from "../LoadingScreen/LoadingScreen";
import StartScreen from "../StartScreen/StartScreen";

export default function Loading() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(100);
  return isLoading ? <LoadingScreen progress={progress} /> : <StartScreen />;
}
