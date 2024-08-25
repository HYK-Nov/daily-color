import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function GET(req: Request) {
  const { data, error } = await supabase
    .from("Color")
    .select("question_number");

  if (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 200 },
    );
  }

  return NextResponse.json(data, { status: 500 });
}
