import { Stopwatch } from "@/components/timer/Stopwatch";
import { useTimerHistory } from "@/context/TimerHistoryContext";

export default function Timer() {
  const {
    intervalsHistory,
    setIntervalsHistory,
    stopwatchHistory,
    setStopwatchHistory,
  } = useTimerHistory();

  return (
    // <IntervalTimer
    //   intervalsHistory={intervalsHistory}
    //   setIntervalsHistory={setIntervalsHistory}
    // />
    <Stopwatch setStopwatchHistory={setStopwatchHistory} />
  );
}
