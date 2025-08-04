import React, { Suspense } from "react";
import LottieHandler from "../LottieHandler/LottieHandler";

export default function SuspenseFallback({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense fallback={<LottieHandler type="loading" />}>{children}</Suspense>
  );
}
