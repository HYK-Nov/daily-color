import {
  TbCircleFilled,
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";

export default function StatusIcon({ status }: { status: string }) {
  return (
    <>
      {status === "up" ? (
        <TbTriangleFilled className={"text-rose-500"} />
      ) : status === "down" ? (
        <TbTriangleInvertedFilled className={"text-sky-500"} />
      ) : (
        <TbCircleFilled />
      )}
    </>
  );
}
