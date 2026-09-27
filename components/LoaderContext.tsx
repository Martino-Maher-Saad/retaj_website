"use client";

import React, { createContext, useContext, useState, useCallback } from "react";

interface LoaderContextType {
  isReady: boolean;
  isCurtainGone: boolean;
  setReady: () => void;
  setCurtainGone: () => void;
}

const LoaderContext = createContext<LoaderContextType>({
  isReady: false,
  isCurtainGone: false,
  setReady: () => {},
  setCurtainGone: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);
  const [isCurtainGone, setIsCurtainGone] = useState(false);

  const setReady = useCallback(() => setIsReady(true), []);
  const setCurtainGone = useCallback(() => setIsCurtainGone(true), []);

  return (
    <LoaderContext.Provider
      value={{
        isReady,
        isCurtainGone,
        setReady,
        setCurtainGone,
      }}
    >
      {children}
    </LoaderContext.Provider>
  );
}

export function useLoader() {
  return useContext(LoaderContext);
}
