import { compile, type Token } from 'moo';

// build lexer
export const lexer = compile({
    int: /\d+/,
    neg: '-',
    dot: '.',
    years: /(?:y|yrs?|years?)\b/,
    months: /(?:mon(?:th)?s?)\b/,
    days: /(?:d|days?)\b/,
    hours: /(?:h|hrs?|hours?)\b/,
    minutes: /(?:m|mins?|minutes?)\b/,
    seconds: /(?:s|secs?|seconds?)\b/,
    milliseconds: /(?:ms|milliseconds?)\b/,
    space: { match: /[\s\t\n\v\f\r]+/, lineBreaks: true },
    colon: ':',
});

lexer.next = ((next) => () => {
    let tok: Token | undefined;
    do {
        tok = next();
    } while (tok && tok.type === 'space');
    return tok;
})(lexer.next.bind(lexer));

export const lexerAny = lexer;
