import { encrypt } from "@/utils/encryptService";
import { createClient } from "@/utils/supabase/client";
import { NextResponse } from "next/server";

const supabase = createClient();

export async function GET() {
  try {
    const { data, error } = await supabase.rpc("get_daily_color");

    if (error) console.error(error);

    if (!data) {
      return NextResponse.json({}, { status: 404 });
    }

    return NextResponse.json({
      ...data,
      color_code: encrypt(data.color_code),
    });
  } catch (e) {
    console.error(e);
  }
}
