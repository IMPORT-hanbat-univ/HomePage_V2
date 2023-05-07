type AFC<P = {}> = (...args: Parameters<React.FC<P>>) => Promise<ReturnType<React.FC<P>>>;

export default function AsSyncComponent<T extends AFC<any>>(
  component: T
): React.FC<T extends AFC<infer P> ? P : never> {
  return component as any;
}
