"use client";
import { TTryData } from "@/types/try";
import { getRGBValues } from "@/utils/getRGBValues";
import StatusIcon from "@/components/hexcode/StatusIcon";
import { copyToClipboard } from "@/utils/copyToClipboard";
import React from "react";
import { useToastStore } from "@/stores/toastStore";

export default function TryListItem({ id, hex, red, green, blue }: TTryData) {
  const RGB = getRGBValues(hex);
  const { pushToastList } = useToastStore();

  const handleClick = () => {
    copyToClipboard(hex.toUpperCase());
    pushToastList("복사되었습니다!");
  };

  return (
    <>
      {hex && (
        <tr key={id} className={"cursor-pointer"}>
          <td className={"flex items-center justify-between p-2"}>
            <p>{id}</p>
            <div
              className={"h-7 w-7 rounded-sm"}
              style={{ backgroundColor: `#${hex}` }}
            />
          </td>
          <td className={"p-2"}>
            <div className={"flex items-center gap-3"}>
              <div
                className={
                  "grid w-full auto-rows-auto grid-cols-1 items-center sm:grid-cols-[30%_100%]"
                }
              >
                <p onClick={handleClick}>#{hex.toUpperCase()}</p>
                <p className={"text-xs sm:text-base"}>
                  ({RGB.red}, {RGB.green}, {RGB.blue})
                </p>
              </div>
            </div>
          </td>
          <td>
            <StatusIcon status={red} />
          </td>
          <td>
            <StatusIcon status={green} />
          </td>
          <td>
            <StatusIcon status={blue} />
          </td>
        </tr>
      )}
    </>
  );
}
