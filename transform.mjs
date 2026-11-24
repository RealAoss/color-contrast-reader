function fail(message) {
    throw new Error(message);
}
const lines = text => text.split(/\r?\n/).map(line => line.trim()).filter(Boolean);
export function transform(s) {
    if (!s.trim()) fail('Enter some source text.');
    const vals = lines(s);
    if (vals.length !== 2) fail('Enter two colors');
    const lum = vals.map(v => {
        if (!/^#?[0-9a-f]{6}$/i.test(v)) fail('Use six hex digits');
        const rgb = v.replace('#', '').match(/../g).map(x => parseInt(x, 16) / 255).map(x => x <= 0.04045 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4);
        return .2126 * rgb[0] + .7152 * rgb[1] + .0722 * rgb[2]
    });
    return ((Math.max(...lum) + .05) / (Math.min(...lum) + .05)).toFixed(2) + ':1 contrast ratio'
}
