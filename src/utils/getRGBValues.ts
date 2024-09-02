export const getRGBValues = (hex: string) => {
  const red = parseInt(hex.slice(0, 2), 16);
  const green = parseInt(hex.slice(2, 4), 16);
  const blue = parseInt(hex.slice(4, 6), 16);

  return { red: red, green: green, blue: blue };
};
