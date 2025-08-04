import {
  actGetCategories,
  cleanUpCategories,
} from "@store/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { useEffect } from "react";

export default function useCategories() {
  const { loading, error, records } = useAppSelector(
    (state) => state.categoriesSlice
  );
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(actGetCategories());
    return () => {
      dispatch(cleanUpCategories());
    };
  }, [dispatch]);
  return { loading, error, records };
}
