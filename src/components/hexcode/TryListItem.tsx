"use client";
import { TTryData } from "@/types/try";
import { useHexStore } from "@/stores/hexStore";
import {
  TbCircleFilled,
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";

export default function TryListItem({ id, hex }: TTryData) {
  const { colorCode } = useHexStore();
  const answerData = {
    red: parseInt(colorCode.slice(1, 3), 16),
    green: parseInt(colorCode.slice(3, 5), 16),
    blue: parseInt(colorCode.slice(5, 7), 16),
  };
  const tryData = {
    red: parseInt(hex.slice(1, 3), 16),
    green: parseInt(hex.slice(3, 5), 16),
    blue: parseInt(hex.slice(5, 7), 16),
  };

  return (
    <tr key={id}>
      <td className={"p-2"}>{id}</td>
      <td className={"p-2"}>
        <div className={"flex items-center gap-3"}>
          <div
            className={"h-8 w-8 rounded-sm"}
            style={{ backgroundColor: hex }}
          />
          <p>{hex}</p>
        </div>
      </td>
      <td>
        {answerData.red > tryData.red ? (
          <TbTriangleFilled />
        ) : answerData.red < tryData.red ? (
          <TbTriangleInvertedFilled />
        ) : (
          <TbCircleFilled />
        )}
      </td>
      <td>
        {answerData.blue > tryData.blue ? (
          <TbTriangleFilled />
        ) : answerData.blue < tryData.blue ? (
          <TbTriangleInvertedFilled />
        ) : (
          <TbCircleFilled />
        )}
      </td>
      <td>
        {answerData.green > tryData.green ? (
          <TbTriangleFilled />
        ) : answerData.green < tryData.green ? (
          <TbTriangleInvertedFilled />
        ) : (
          <TbCircleFilled />
        )}
      </td>
    </tr>
  );
}
