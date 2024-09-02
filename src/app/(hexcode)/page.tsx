import HexPage from "@/components/pages/hex-page";
import TryResult from "@/components/hexcode/TryResult";
import InputForm from "@/components/hexcode/InputForm";
import TryList from "@/components/hexcode/TryList";

const getHexCode = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hex-code`).then(
    (res) => res.json(),
  );
};

export default async function Home() {
  const hexData = await getHexCode();

  return (
    <>
      <HexPage data={hexData} />
      <main className={"flex w-full flex-col items-center gap-5 pb-10 pt-3"}>
        {/* 정답 시, 등장 */}
        <TryResult />
        {/* 입력 폼 */}
        <InputForm />
        {/*<InputForm />*/}
        <TryList />
      </main>
    </>
  );
}
