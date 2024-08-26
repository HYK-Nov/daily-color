"use client";
import { TTryData } from "@/types/try";
import {
  TbCircleFilled,
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";

export default function TryListItem({
  id,
  curHex,
  red,
  green,
  blue,
}: TTryData) {
  return (
    <tr key={id}>
      <td className={"p-2"}>{id}</td>
      <td className={"p-2"}>
        <div className={"flex items-center gap-3"}>
          <div
            className={"h-8 w-8 rounded-sm"}
            style={{ backgroundColor: curHex }}
          />
          <p>{curHex}</p>
        </div>
      </td>
      <td>
        {red === "up" ? (
          <TbTriangleFilled />
        ) : red === "down" ? (
          <TbTriangleInvertedFilled />
        ) : (
          <TbCircleFilled />
        )}
      </td>
      <td>
        {green === "up" ? (
          <TbTriangleFilled />
        ) : green === "down" ? (
          <TbTriangleInvertedFilled />
        ) : (
          <TbCircleFilled />
        )}
      </td>
      <td>
        {blue === "up" ? (
          <TbTriangleFilled />
        ) : blue === "down" ? (
          <TbTriangleInvertedFilled />
        ) : (
          <TbCircleFilled />
        )}
      </td>
    </tr>
  );
}
