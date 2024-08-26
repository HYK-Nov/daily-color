"use server";

export async function tryHex(
  state: { message: string; state: boolean; match: string },
  formData: FormData,
) {
  try {
    return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hexcode`, {
      method: "POST",
      body: formData,
    });
  } catch (e) {
    return {
      message: e instanceof Error ? e.message : "알 수 없는 오류",
      state: false,
    };
  }
}
