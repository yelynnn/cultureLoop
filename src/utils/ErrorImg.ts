export const onErrorImg: React.ReactEventHandler<HTMLImageElement> = (e) => {
  const target = e.target as HTMLImageElement;
  target.src = "/defaultImg.jpeg";
};
