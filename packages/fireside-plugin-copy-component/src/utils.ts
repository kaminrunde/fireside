export const isOlderThanXMins = (dateString: string) => {
  const date = new Date(dateString);
  const currentTime = new Date();
  const differenceInMilliseconds = currentTime.getTime() - date.getTime();
  const differenceInMinutes = differenceInMilliseconds / (1000 * 60);
  return differenceInMinutes > 5;
};
