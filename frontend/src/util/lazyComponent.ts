import { lazy, LazyExoticComponent, ComponentType } from "react";

export default function lazyComponent<T>(
  importFunction: () => Promise<{ default: ComponentType<T> }>
): LazyExoticComponent<ComponentType<T>> & { preload: () => void } {
  const Component: LazyExoticComponent<ComponentType<T>> & { preload?: () => void } = lazy(importFunction);
  Component.preload = importFunction;
  return Component as LazyExoticComponent<ComponentType<T>> & { preload: () => void };
}
