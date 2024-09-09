export const revalidate = 60;
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function POST(req: NextRequest) {
  const { question_number } = await req.json();

  try {
    const { data, error } = await supabase
      .from("Color")
      .select("total_correct_count")
      .eq("question_number", question_number)
      .single();

    if (error) console.error(error);
    if (!data) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json(data, { status: 200 });
  } catch (e) {
    console.error(e);
  }
}
