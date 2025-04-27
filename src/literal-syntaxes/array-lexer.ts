import { compile, type Token } from 'moo';

// build lexer
export const lexer = compile({
    valueString: {
        match: /"(?:\\["\\]|[^\n"\\])*"/,
        value: (x) => <string>JSON.parse(x),
        type: () => 'value',
    },
    valueRaw: {
        match: /[^\s,{}"](?:[^,{}"]*[^\s,{}"])?/,
        type: () => 'value',
    },
    comma: ',',
    space: { match: /[\s\t\n\v\f\r]+/, lineBreaks: true },
    start_list: '{',
    end_list: '}',
});

lexer.next = ((next) => () => {
    let tok: Token | undefined;
    do {
        tok = next();
    } while (tok && tok.type === 'space');
    return tok;
})(lexer.next.bind(lexer));

export const lexerAny = lexer;
