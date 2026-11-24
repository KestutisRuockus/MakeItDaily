import { IntervalTimer } from "@/components/timer/IntervalTimer";
import { useIntervalsHistory } from "@/context/IntervalsHistoryContext";

export default function Timer() {
  const { intervalsHistory, setIntervalsHistory } = useIntervalsHistory();

  return (
    <IntervalTimer
      intervalsHistory={intervalsHistory}
      setIntervalsHistory={setIntervalsHistory}
    />
  );
}
