# await-promise ⌛
Async React component for awaiting a promise and passing its result to other
components.

## Why?
This library helps in fetching data from server component and pass it down to children components. Normally you would await the promise in the server component but this is bad since you have to wait every promises in order to paint something on the website. With this library, it will make the server component display immediately. This library also make use of [Suspense](https://react.dev/reference/react/Suspense) where the component will show a fallback component while waiting for the component to resolve.

## 1. Install
`yarn add @initd.sg/await-promise`

## 2. Usage
To use just pass the promise to the `fn` props. `<AwaitPromise />` children
accepts a function with the argument being the result of the promise. With this
method we can put a client component inside the `<AwaitPromise />` and show a
loading fallback while waiting for that promise to resolve.
```tsx
import { AwaitPromise } from "await-promise";

export default function Page() {
    const fn = new Promise<{ name: string }>((resolve) =>
        setTimeout(() => resolve({ name: "user" }), 1000)
    );

    return (
        <>
            <AwaitPromise fallback={"loading..."} fn={fn}>
                {(user) => <div>{user.name}</div>}
            </AwaitPromise>
        </>
    );
}
```

## 3. Error Handling
A promise passed to `fn` argument may throw an error due to network error or incorrect http parameters when trying to call an external API. By default, `<AwaitPromise />` handles this error by showing the error message. In case we want to customize the error message, we can just create another component and pass to the `errorFallback` props.
```tsx
import { AwaitPromise } from "await-promise";

export default function Page() {
    const fn = new Promise<string>((resolve, reject) =>
        setTimeout(() => reject("Network Error Occured"), 1000)
    );

    return (
        <>
            <AwaitPromise 
                fallback={"loading..."}
                errorFallback={(err) => <ErrorText err={err} />} 
                fn={fn}
            >
                {(user) => <div>{user.name}</div>}
            </AwaitPromise>
        </>
    );
}

function ErrorText(err: Error) {
    console.error(err); // error logging
    return <p className="text-red-500">{err.message}</p>
}
```
