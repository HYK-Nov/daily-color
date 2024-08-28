"use client";
import { TTryData } from "@/types/try";
import {
  TbCircleFilled,
  TbTriangleFilled,
  TbTriangleInvertedFilled,
} from "react-icons/tb";

export default function TryListItem({ id, hex, red, green, blue }: TTryData) {
  let tryRed, tryGreen, tryBlue;

  if (hex) {
    tryRed = parseInt(hex.slice(0, 2), 16);
    tryGreen = parseInt(hex.slice(2, 4), 16);
    tryBlue = parseInt(hex.slice(4, 6), 16);
  }

  return (
    <>
      {hex && (
        <tr key={id} className={"cursor-pointer"}>
          <td className={"p-2"}>{id}</td>
          <td className={"p-2"}>
            <div className={"flex items-center gap-3"}>
              <div
                className={"h-8 w-8 rounded-sm"}
                style={{ backgroundColor: `#${hex}` }}
              />
              <div
                className={
                  "grid w-full auto-rows-auto grid-cols-1 items-center sm:grid-cols-[30%_100%]"
                }
              >
                <p className={""}>#{hex.toUpperCase()}</p>
                <p className={"text-xs sm:text-base"}>
                  ({tryRed}, {tryGreen}, {tryBlue})
                </p>
              </div>
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
      )}
    </>
  );
}
