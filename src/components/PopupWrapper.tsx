"use client";
import { useToastStore } from "@/stores/toastStore";
import Alert from "@/components/Alert";

export default function PopupWrapper() {
  const { toastList } = useToastStore();

  return (
    <div className={"fixed bottom-5 left-1/2 flex w-full flex-col gap-2"}>
      {toastList.map(({ id, text }) => (
        <Alert key={id} id={id}>
          {text}
        </Alert>
      ))}
    </div>
  );
}
