"use client";
import { useToastStore } from "@/stores/toastStore";
import Toast from "@/components/Toast";

export default function PopupWrapper() {
  const { toastList } = useToastStore();

  return (
    <div className={"fixed bottom-5 left-1/2 flex w-full flex-col gap-2"}>
      {toastList.map(({ id, text }) => (
        <Toast key={id} id={id}>
          {text}
        </Toast>
      ))}
    </div>
  );
}
