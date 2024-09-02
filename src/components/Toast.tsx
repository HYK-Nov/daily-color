"use client";
import { TbCircleCheckFilled, TbX } from "react-icons/tb";
import { useToastStore } from "@/stores/toastStore";
import { useEffect, useState } from "react";
import { cn } from "@/utils/cn";

type TToast = {
  children: React.ReactNode;
  id: string;
  type?: "success" | "warning" | "info";
} & React.ComponentProps<"div">;

export default function Toast({
  children,
  id,
  type = "success",
  className,
  ...rest
}: TToast) {
  const { deleteToastList } = useToastStore();
  const [loaded, setLoaded] = useState(true);

  const handleOnClick = () => {
    deleteToastList(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(false);
      setTimeout(() => deleteToastList(id), 300); // fadeOut 시간 후에 토스트 사라짐
    }, 2000); // 토스트가 보이는 시간

    return () => clearTimeout(timer);
  }, []);
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-3 rounded-lg border bg-green-100 p-3",
        { "animate-fadeIn": loaded },
        { "animate-fadeOut": !loaded },
        { "border-green-600 text-green-700": type === "success" },
        className,
      )}
      {...rest}
    >
      <TbCircleCheckFilled className={"text-lg"} />
      <div className={"text-sm"}>{children}</div>
      <button onClick={handleOnClick}>
        <TbX className={"text-sm"} />
      </button>
    </div>
  );
}
