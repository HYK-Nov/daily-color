"use client";
import { useHexStore } from "@/stores/hexStore";

export default function TryList() {
  const { tryList } = useHexStore();

  return (
    <>
      {/* 트라이 목록 */}
      <table className={"table-auto divide-y w-full"}>
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
            <tr key={item.id} className={"even:bg-slate-50"}>
              <td className={"p-2"}>{item.id}</td>
              <td className={"p-2"}>
                <div className={"flex items-center gap-3"}>
                  <div
                    className={"w-8 h-8 rounded-sm"}
                    style={{ backgroundColor: item.hex }}
                  />
                  <p>{item.hex}</p>
                </div>
              </td>
              <td></td>
              <td></td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}
