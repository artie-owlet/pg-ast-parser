export type Optional<T> = { [key in keyof T]?: T[key] };

export type nil = undefined | null;

type Impossible<K extends string | number | symbol> = Record<K, never>;
export type NoExtraProperties<T, U extends T = T> = U & Impossible<Exclude<keyof U, keyof T>>;


export type ReplaceReturnType<T, TNewReturn> = T extends (...a: any[]) => any
    ? (...a: Parameters<T>) => TNewReturn
    : never;

export class NotSupported extends Error {
    private constructor(what: string) {
        super('Not supported' + (': ' + what));
    }

    public static never(value: never, msg?: string) {
        return new NotSupported(`${msg ?? ''} ${JSON.stringify(value)}`);
    }
}

type ArrayItem<T> = T extends (infer I)[] ? I : never;

export function trimNullish<T>(value: T, depth = 5): T {
    if (depth < 0) {
        return value;
    }
    if (value instanceof Array) {
        value.forEach((x: ArrayItem<T>) => trimNullish(x, depth - 1));
    }
    if (typeof value !== 'object' || value instanceof Date) {
        return value;
    }

    if (!value) {
        return value;
    }

    for (const k of <(keyof T)[]>Object.keys(value)) {
        const val = value[k];
        if (val === undefined || val === null) {
            // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
            delete value[k];
        } else {
            trimNullish(val, depth - 1);
        }
    }
    return value;
}

export function isFiniteNumber(n: unknown): n is number {
    return Number.isFinite(n);
}
