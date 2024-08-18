"use client";
import { useHexStore } from "@/stores/hexStore";
import TryListItem from "@/components/hexcode/TryListItem";

export default function TryList() {
  const { tryList } = useHexStore();

  return (
    <>
      {/* 트라이 목록 */}
      <table className={"w-full table-auto divide-y"}>
        <thead className={"text-left"}>
          <tr>
            <th className={"p-2"}>#</th>
            <th className={"p-2"}>코드</th>
            <th className={"p-2"}>R</th>
            <th className={"p-2"}>G</th>
            <th className={"p-2"}>B</th>
          </tr>
        </thead>
        <tbody className={"divide-y"}>
          {tryList.map((item) => (
            <TryListItem key={item.id} {...item} />
          ))}
        </tbody>
      </table>
    </>
  );
}
