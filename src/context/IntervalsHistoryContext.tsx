import React, { createContext } from "react";

export type IntervalHistoryItem = {
  id: string;
  intervals: number[];
  overallTime: number;
  date: string;
};

type IntervalsHistoryContextProps = {
  intervalsHistory: IntervalHistoryItem[];
  setIntervalsHistory: React.Dispatch<
    React.SetStateAction<IntervalHistoryItem[]>
  >;
};

export const IntervalsHistoryContext =
  createContext<IntervalsHistoryContextProps | null>(null);

export const IntervalsHistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [intervalsHistory, setIntervalsHistory] = React.useState<
    IntervalHistoryItem[]
  >([]);

  return (
    <IntervalsHistoryContext.Provider
      value={{ intervalsHistory, setIntervalsHistory }}
    >
      {children}
    </IntervalsHistoryContext.Provider>
  );
};

export const useIntervalsHistory = () => {
  const context = React.useContext(IntervalsHistoryContext);
  if (!context) {
    throw new Error(
      "useIntervalsHistory must be used within an IntervalsHistoryProvider",
    );
  }

  return context;
};
