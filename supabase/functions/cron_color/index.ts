import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const supabase = createClient(
  Deno.env.get("SUPABASE_URL")!,
  Deno.env.get("SUPABASE_ANON_KEY")!,
);

const generateColorCode = () => {
  const characters = "ABCDEF0123456789";
  let result = "";

  for (let i = 0; i < 6; i++) {
    result += characters[Math.floor(Math.random() * characters.length)];
  }

  return `#${result}`;
};

serve(async (req: Request) => {
  let isUnique = false;
  let newValue = "";

  while (!isUnique) {
    newValue = generateColorCode();
    const { data, error } = await supabase
      .from("Color")
      .select("color_code")
      .order("created_at", { ascending: false })
      .limit(90);

    if (error) {
      console.error(error);
    }

    if (!data?.map((item) => item.color_code).includes(newValue)) {
      isUnique = true;
    }
  }

  const { error } = await supabase
    .from("Color")
    .insert({ color_code: newValue });

  if (error) {
    console.error(error);
    return new Response("Error: Insert value", { status: 500 });
  }

  return new Response("Successfully inserted color", {
    status: 200,
  });
});
