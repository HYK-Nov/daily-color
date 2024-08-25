import { createClient } from "@/utils/supabase/client";

const supabase = createClient();

export async function GET(req: Request) {
  const { data } = await supabase
    .from("Color")
    .select("question_number")
    .order("created_at", { ascending: false })
    .limit(1);

  return Response.json(data);
}
