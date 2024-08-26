import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function GET() {
  const { data, error } = await supabase
    .from("Color")
    .select("question_number");

  if (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }

  return NextResponse.json(data, { status: 200 });
}

export async function POST(req: Request) {
  const formData = await req.formData();
  const questionNum = formData.get("question_number");
  const hexCode = formData.get("hex_code");

  const { data, error } = await supabase
    .from("Color")
    .select("question_number")
    .eq("question_number", questionNum)
    .eq("color_code", hexCode);

  if (data && data.length > 0) {
    return NextResponse.json({ match: true }, { status: 200 });
  }

  return NextResponse.json({ match: false }, { status: 200 });
}
