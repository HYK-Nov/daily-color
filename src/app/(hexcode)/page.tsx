import ColorBox from "@/components/hexcode/ColorBox";
import InputForm from "@/components/hexcode/InputForm";
import TryList from "@/components/hexcode/TryList";

export default function Home() {
  let colorCode = Math.floor(Math.random() * (16 ** 6 + 1)).toString(16);

  while (colorCode.length < 6) {
    colorCode = `0${colorCode}`;
  }

  return (
    <main className={"flex flex-col gap-5 items-center w-full py-10"}>
      {/*<ColorBox colorCode={colorCode} />*/}
      <InputForm colorCode={colorCode} />

      <TryList />
    </main>
  );
}
