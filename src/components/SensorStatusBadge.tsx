import { SensorStatus } from "@constants";
import { WifiIcon, StopIcon, PaperAirplaneIcon, SignalSlashIcon } from "@heroicons/react/24/solid";
import { Badge } from "flowbite-react";
import { useMemo } from "react";

export function SensorStatusBadge(props: { state: SensorState }) {
  const { color, icon } = useMemo(() => {
    if (props.state === "RUNNING")
      return {
        color: "success",
        icon: WifiIcon
      };
    if (props.state === "STOPPED") return { color: "gray", icon: StopIcon };
    if (props.state === "REQUESTED") return { color: "info", icon: PaperAirplaneIcon };
    return { color: "failure", icon: SignalSlashIcon };
  }, [props.state]);

  return (
    <Badge color={color} icon={icon} className='w-fit px-2 cursor-pointer'>
      {SensorStatus[props.state]}
    </Badge>
  );
}
