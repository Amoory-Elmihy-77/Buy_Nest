import type { TLoading } from "@types";
import CategorySkeleton from "../skeletons/CategorySkeleton/CategorySkeleton";
import CartSkeleton from "../skeletons/CartSkeleton/CartSkeleton";
import ProductSkeleton from "../skeletons/ProductSkeleton/ProductSkeleton";
import TableSkeleton from "../skeletons/TableSkeleton/TableSkeleton";
import LottieHandler from "../LottieHandler/LottieHandler";

const skeletonTypes = {
  cart: CartSkeleton,
  category: CategorySkeleton,
  product: ProductSkeleton,
  table: TableSkeleton,
};

type TLoadingProps = {
  status: TLoading;
  error: string | null;
  children: React.ReactNode;
  type: keyof typeof skeletonTypes;
};

export default function Loading({
  status,
  error,
  children,
  type,
}: TLoadingProps) {
  const Component = skeletonTypes[type];
  if (status === "pending") return <Component />;
  if (status === "failed")
    return <LottieHandler type="error" message={error as string} />;
  else return <>{children}</>;
}
