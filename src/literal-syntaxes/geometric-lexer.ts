import { compile, type Token } from 'moo';

// build lexer
export const lexer = compile({
    comma: ',',
    space: { match: /[\s\t\n\v\f\r]+/, lineBreaks: true },
    int: /-?\d+(?![.\d])/,
    float: /-?(?:(?:\d*\.\d+)|(?:\d+\.\d*))/,
    lcurl: '{',
    rcurl: '}',
    lparen: '(',
    rparen: ')',
    lbracket: '[',
    rbracket: ']',
    lcomp: '<',
    rcomp: '>',
});

lexer.next = ((next) => () => {
    let tok: Token | undefined;
    do {
        tok = next();
    } while (tok && tok.type === 'space');
    return tok;
})(lexer.next.bind(lexer));

export const lexerAny = lexer;
