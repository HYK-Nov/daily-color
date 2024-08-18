import InputForm from "@/components/hexcode/InputForm";
import TryList from "@/components/hexcode/TryList";
import TryResult from "@/components/hexcode/TryResult";

export default function Home() {
  return (
    <main className={"flex w-full flex-col items-center gap-5 py-10"}>
      {/* 정답 시, 등장 */}
      <TryResult />
      {/* 입력 폼 */}
      <InputForm />
      <TryList />
    </main>
  );
}
