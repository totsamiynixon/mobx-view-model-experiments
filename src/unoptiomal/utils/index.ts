import { IComputedValueOptions, computed } from "mobx";
import { useMemo } from "react";

// it is possible to avoid using useComputed and just use Computed
// but then when rerendering happens new computed will be created and value will be recalculated again
// pros of useMemoComputed -> using same recalculated value between renders
// cons of useMemoComputed -> recreating deps array on every render
// cons of useMemoComputed -> more complex syntax
// cons of useMemoComputed -> other disadvantages of memoization
export function useComputedMemo<T>(
  func: () => T,
  deps?: ReadonlyArray<unknown>,
  options?: IComputedValueOptions<T>
): T {
  return useMemo(() => computed(func, options), deps).get();
}

// props of useComputed -> simplem
// cons of useComputed -> when rerendering happens -> all of them recalculated again -> so basically all computed values recalculated twice
// 1. to understand if rerendering is needed
// 2. after rerendering happened because computed has been recreated

export function useComputed<T>(
  func: () => T,
  options?: IComputedValueOptions<T>
): T {
  return computed(func, options).get();
}

export function shallowCompareArrays<T extends Array<unknown>>(
  a: T,
  b: T
): boolean {
  if (a.length !== b.length) {
    return false;
  }

  for (let i = 0; i < a.length && i < b.length; i++) {
    // $FlowFixMe[incompatible-use] found when upgrading Flow
    if (a[i] === b[i]) {
      continue;
    }
    return false;
  }
  return true;
}
