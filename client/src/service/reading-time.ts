export const readingTime = (text: string) => {
  const wpm: number = 225;
  const words: number = text.trim().split(/\s+/).length;
  const time: number = Math.ceil(words / wpm);
  return time;
};
