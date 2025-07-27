import type { TLoading } from "@customTypes/shared";

type TLoadingProps = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
};

export default function Loading({ status, error, children }: TLoadingProps) {
  if (status === "pending") return <p>Please wait for loading...</p>;
  if (status === "failed") return <p>{error}</p>;
  else return <>{children}</>;
}
