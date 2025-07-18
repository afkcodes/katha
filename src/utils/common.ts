export const timeFunction = async <T>(fn: () => Promise<T>, log?: string) => {
  const start = Date.now();
  const result = await fn();
  const time = Date.now() - start;
  if (log) console.debug(`[perf] ${log} took ${time}ms`);
  return {
    result,
    time,
  };
};
