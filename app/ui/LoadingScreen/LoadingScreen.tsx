import { silkscreen } from "../../fonts";

const LoadingScreen = () => {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-screen h-screen">
        <p className={`${silkscreen.className} text-xl`}>Loading...</p>
        <div className="w-full max-w-xl h-10 flex relative overflow-hidden">
          <div
            className={`w-full max-w-xl bg-primary h-full z-10 animate-loading`}
          ></div>
          <div className="w-full bg-base-300 absolute h-full"></div>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
