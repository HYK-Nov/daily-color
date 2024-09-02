"use client";
import { TbCircleCheckFilled, TbX } from "react-icons/tb";
import { useToastStore } from "@/stores/toastStore";
import { useEffect, useState } from "react";

type TAlert = {
  children: React.ReactNode;
  id: string;
} & React.ComponentProps<"div">;

export default function Alert({ children, id, ...rest }: TAlert) {
  const successStyle = "text-green-700 border-green-600";
  const { deleteToastList } = useToastStore();
  const [loaded, setLoaded] = useState(true);

  const handleOnClick = () => {
    deleteToastList(id);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoaded(false);
      setTimeout(() => deleteToastList(id), 300); // fadeOut 시간 후에 onClose 호출
    }, 2000); // 토스트가 보이는 시간

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center gap-3 rounded-lg border bg-green-100 p-3 ${successStyle} w-fit -translate-x-1/2 ${loaded ? "animate-fadeIn" : "animate-fadeOut"}`}
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
