import { encrypt } from "@/utils/encryptService";
import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function GET() {
  try {
    const { data, error } = await supabase.rpc("get_daily_color");

    if (error) console.error(error);

    if (data) {
      return Response.json({ ...data, color_code: encrypt(data.color_code) });
    } else {
      return {};
    }
  } catch (e) {
    console.error(e);
  }
}
