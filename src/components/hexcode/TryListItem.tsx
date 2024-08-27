"use client";
import { TTryData } from "@/types/try";
import {
  TbCircleFilled,
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";

export default function TryListItem({ id, hex, red, green, blue }: TTryData) {
  const [tryRed, tryGreen, tryBlue] = [
    parseInt(hex.slice(0, 2), 16),
    parseInt(hex.slice(2, 4), 16),
    parseInt(hex.slice(4, 6), 16),
  ];

  return (
    <tr key={id} className={"cursor-pointer"}>
      <td className={"p-2"}>{id}</td>
      <td className={"p-2"}>
        <div className={"flex items-center gap-3"}>
          <div
            className={"h-8 w-8 rounded-sm"}
            style={{ backgroundColor: `#${hex}` }}
          />
          <p>#{hex.toUpperCase()}</p>
          <p>
            ({tryRed}, {tryGreen}, {tryBlue})
          </p>
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
