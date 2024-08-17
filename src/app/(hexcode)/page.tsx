import ColorBox from "@/components/hexcode/ColorBox";
import InputForm from "@/components/hexcode/InputForm";

export default function Home() {
  let colorCode = Math.floor(Math.random() * (16 ** 6 + 1)).toString(16);

  while (colorCode.length < 6) {
    colorCode = `0${colorCode}`;
  }

  return (
    <main className={"flex flex-col gap-5 items-center w-full py-10"}>
      <ColorBox colorCode={colorCode} />
      <InputForm colorCode={colorCode} />

      {/* 트라이 목록 */}
      <table className={"table-auto divide-y w-full"}>
        <thead className={"text-left"}>
        <tr>
          <th>#</th>
          <th>코드</th>
          <th>R</th>
          <th>G</th>
          <th>B</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>1</td>
          <td>2</td>
          <td>3</td>
          <td>4</td>
          <td>5</td>
        </tr>
        </tbody>
      </table>
    </main>
  );
}
