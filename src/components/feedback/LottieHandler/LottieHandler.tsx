import Lottie from "lottie-react";
import notFoundLottie from "@assets/lotties/404 Error - Doodle animation.json";
import emptyLottie from "@assets/lotties/Empty Box Animation.json";
import errorLottie from "@assets/lotties/error.json";
import loadingLottie from "@assets/lotties/loading.json";
import successLottie from "@assets/lotties/success.json";

const lottieType = {
  notFound: notFoundLottie,
  empty: emptyLottie,
  error: errorLottie,
  loading: loadingLottie,
  success: successLottie,
};

type TLottieHandlerProps = {
  type: keyof typeof lottieType;
  message?: string;
};

export default function LottieHandler({ type, message }: TLottieHandlerProps) {
  const lottie = lottieType[type];
  const className =
    type === "error"
      ? { fontSize: "19px", marginTop: "10px", color: "red" }
      : { fontSize: "19px", marginTop: "20px" };
  return (
    <div className="d-flex flex-column align-items-center">
      <Lottie animationData={lottie} loop={true} style={{ width: "400px" }} />
      {message && <h3 style={className}>{message}</h3>}
    </div>
  );
}
