import { AppDispatch, RootState } from "@/store";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

type DispatchFunc = () => AppDispatch;
export const useAppDispatch: DispatchFunc = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;