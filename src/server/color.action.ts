"use server";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

const compare = (a: number, b: number) =>
  a === b ? "equal" : a > b ? "up" : "down";

export async function tryHex(
  state: { match: boolean; red: string; green: string; blue: string },
  formData: FormData,
) {
  const questionNum = formData.get("questionNum");
  const hexCode = formData.get("hex")!;
  let hexRed, hexGreen, hexBlue;

  if (hexCode) {
    [hexRed, hexGreen, hexBlue] = [0, 2, 4].map((i) =>
      parseInt(<string>hexCode.slice(i, i + 2), 16),
    );
  }

  try {
    const { data, error } = await supabase
      .from("Color")
      .select("color_code")
      .eq("question_number", questionNum)
      .single();

    if (data && hexCode) {
      const res = data.color_code;
      const [redCompare, greenCompare, blueCompare] = [0, 2, 4].map((i) =>
        parseInt(<string>res.slice(i, i + 2), 16),
      );

      return {
        curHex: `#${hexCode}`,
        match: new RegExp(res, "gi").test(String(hexCode)),
        red: compare(redCompare, hexRed!),
        green: compare(greenCompare, hexGreen!),
        blue: compare(blueCompare, hexBlue!),
      };
    }

    return { curHex: "", match: false, red: "", green: "", blue: "" };
  } catch (e) {
    return { curHex: "", match: false, red: "", green: "", blue: "" };
  }
}
