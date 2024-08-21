export interface AwaitPromiseProps<T> {
  delayMilliseconds?: number; // Delay in milliseconds
  fn: Promise<T>;
  children: (result: T) => React.ReactNode;
  error?: (err: Error) => React.ReactNode;
}

export default async function AwaitPromise<T>({
  delayMilliseconds,
  fn,
  children,
  error,
}: AwaitPromiseProps<T>) {
  const delayPromise = new Promise((resolve) =>
    setTimeout(resolve, delayMilliseconds || 0)
  );

  try {
    const [result] = await Promise.all([fn, delayPromise]);
    return <>{children(result)}</>;
  } catch (err: any) {
    // TODO: This can be improved under the following article
    // https://kentcdodds.com/blog/get-a-catch-block-error-message-with-typescript

    if (!error) throw err;
    return <>{error(err)}</>;
  }
}
