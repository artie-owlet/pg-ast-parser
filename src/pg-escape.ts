// stolen from https://github.com/segmentio/pg-escape/blob/master/index.js

export function literal(val: string) {
    if (null == val) return 'NULL';
    if (Array.isArray(val)) {
        const vals: any[] = val.map(literal);
        return '(' + vals.join(', ') + ')';
    }
    const backslash = ~val.indexOf('\\');
    const prefix = backslash ? 'E' : '';
    val = val.replace(/'/g, "''");
    val = val.replace(/\\/g, '\\\\');
    return prefix + "'" + val + "'";
}
