import React from "react";
import { Suspense } from "react";

export interface AwaitPromiseProps<T> {
    fn: Promise<T>;
    fallback: React.ReactNode;
    errorFallback?: React.ReactNode;
    children: (result: T) => React.ReactNode;
}

export default function AwaitPromise<T>(props: AwaitPromiseProps<T>) {
    return (
        <Suspense fallback={props.fallback}>
            {/*@ts-ignore*/}
            <AwaitPromiseInternal {...props} />
        </Suspense>
    );
}

async function AwaitPromiseInternal<T>({
    fn,
    errorFallback,
    children,
}: AwaitPromiseProps<T>): Promise<React.ReactNode> {
    try {
        const result = await fn;
        return <>{children(result)}</>;
    } catch (e) {
        const err = e as Error;
        console.error(err);

        if (!errorFallback) {
            return <>err.message</>;
        }

        return <>errorFallback</>;
    }
}
