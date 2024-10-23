// Copyright (c) 2024 Tobias Briones. All rights reserved.
// This file is part of https://github.com/mathswe/mathswe.com

import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store.ts";
import { useEffect, useRef } from "react";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export function usePrevious<T>(value: T) {
    const ref = useRef<T>();

    useEffect(() => {
        ref.current = value;
    }, [ value ]);
    return ref.current;
}
