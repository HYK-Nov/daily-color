"use client";
import { useToastStore } from "@/stores/toastStore";
import Toast from "@/components/Toast";

export default function PopupWrapper() {
  const { toastList } = useToastStore();

  return (
    <div className={"fixed bottom-5 flex w-full flex-col items-center gap-2"}>
      {toastList.map(({ id, text }) => (
        <Toast key={id} id={id}>
          {text}
        </Toast>
      ))}
    </div>
  );
}
