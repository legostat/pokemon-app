import { FastAverageColor } from "fast-average-color";

export const getColorFromUrl = async (url: string) => {
  const fac = new FastAverageColor();
  try {
    const color = await fac.getColorAsync(url);
    return color.hex;
  } catch (err) {
    return null;
  }
};
