const LoadingScreen = async ({ progress }: { progress: number }) => {
  return (
    <div className="w-full h-10 flex relative">
      <div
        style={{ transform: `translateX(-${progress}%)` }}
        className={`w-full bg-primary h-full z-10`}
      ></div>
      <div className="w-full bg-base-300 absolute h-full"></div>
    </div>
  );
};

export default LoadingScreen;
