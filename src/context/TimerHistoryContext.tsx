import React, { createContext } from "react";

export type IntervalHistoryItem = {
  id: string;
  intervals: number[];
  overallTime: number;
  date: string;
};

export type StopwatchHistoryItem = {
  id: string;
  duration: number;
  date: string;
};

type TimerHistoryContextProps = {
  intervalsHistory: IntervalHistoryItem[];
  setIntervalsHistory: React.Dispatch<
    React.SetStateAction<IntervalHistoryItem[]>
  >;
  stopwatchHistory: StopwatchHistoryItem[];
  setStopwatchHistory: React.Dispatch<
    React.SetStateAction<StopwatchHistoryItem[]>
  >;
};

export const TimerHistoryContext =
  createContext<TimerHistoryContextProps | null>(null);

export const IntervalsHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [intervalsHistory, setIntervalsHistory] = React.useState<
    IntervalHistoryItem[]
  >([]);
  const [stopwatchHistory, setStopwatchHistory] = React.useState<
    StopwatchHistoryItem[]
  >([]);

  return (
    <TimerHistoryContext.Provider
      value={{
        intervalsHistory,
        setIntervalsHistory,
        stopwatchHistory,
        setStopwatchHistory,
      }}
    >
      {children}
    </TimerHistoryContext.Provider>
  );
};

export const useTimerHistory = () => {
  const context = React.useContext(TimerHistoryContext);
  if (!context) {
    throw new Error(
      "useTimerHistory must be used within an useTimerHistoryProvider",
    );
  }

  return context;
};
