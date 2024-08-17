export default function ColorBox({colorCode}:{colorCode:string}) {
  const red = parseInt(colorCode.substring(0,2), 16);
  const green = parseInt(colorCode.substring(2, 4), 16);
  const blue = parseInt(colorCode.substring(4, 6), 16);

  return (
    <div>
      <div className={`w-[150px] h-[150px] rounded`} style={{backgroundColor: `#${colorCode}`}}/>
      <p>#{colorCode}</p>
      <p>RGB({red}, {green}, {blue})</p>
    </div>
  );
};