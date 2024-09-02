import HexPage from "@/components/pages/hex-page";

const getHexCode = async () => {
  return await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/hex-code`).then(
    (res) => res.json(),
  );
};

export default async function Home() {
  const hexData = await getHexCode();

  return (
    <>
      <HexPage data={hexData} />
    </>
  );
}
