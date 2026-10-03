/* Builds test-cards.html: the live snippet from index.html + 4 test cards.  Run: node build-test-cards.js */
const fs = require('fs');

const src = fs.readFileSync('index.html', 'utf8').split('\n');
const s = src.findIndex(l => l.startsWith('<!-- The live snippet')) + 1;
const e = src.findIndex((l, i) => i > s && l === '</script>');
const snippet = src.slice(s, e + 1).join('\n');

const IMG = 'data:image/svg+xml;utf8,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="260"><defs><linearGradient id="g" x1="0" x2="1">' +
    '<stop offset="0" stop-color="#6366f1"/><stop offset="1" stop-color="#ec4899"/></linearGradient></defs>' +
    '<rect width="600" height="260" fill="url(#g)"/></svg>');

const w = inner => '<div class="elementor-element"><div class="elementor-widget-container">' + inner + '</div></div>';

function card(n, title, cls, note, own) {
    own = own || {};
    return '<section class="spacer"><p class="hint">Scroll down</p></section>\n' +
        '<div class="card e-con ' + cls + '">\n' +
        '  <div class="e-con-inner">\n' +
        '    ' + w('<h3' + (own.h ? ' class="' + own.h + '"' : '') + '>Card ' + n + ' - ' + title + '</h3>') + '\n' +
        '    ' + w('<p>' + note + '</p>') + '\n' +
        '    ' + w('<img' + (own.img ? ' class="' + own.img + '"' : '') + ' alt="" src="' + IMG + '">') + '\n' +
        '    ' + w('<a href="#" class="btn' + (own.btn ? ' ' + own.btn : '') + '">Button</a>') + '\n' +
        '  </div>\n</div>\n' +
        '<p class="code">class="' + cls + '"' +
        (own.h ? ' | heading: ' + own.h : '') + (own.img ? ' | image: ' + own.img : '') + (own.btn ? ' | button: ' + own.btn : '') + '</p>\n';
}

const cards =
    card(1, 'plain cascade', 'ax-fade-left ax-cascade',
        'Box + border arrive first, then content one by one. Scroll up: content leaves, border leaves with the last piece.') +
    card(2, 'image has its own class', 'ax-fade-up ax-cascade',
        'Only the image uses its own settings (zoom-in, delay 300). Everything else uses the card effect.',
        { img: 'ax-zoom-in ax-delay-300' }) +
    card(3, 'button has its own class', 'ax-rise-3d ax-cascade ax-step-150',
        'Slower gap between pieces (150 ms). The button uses its own pop effect.',
        { btn: 'ax-pop' }) +
    card(4, 'heading + image own classes', 'ax-tilt-left ax-cascade ax-slow',
        'Slow card. Heading drops from the top, image uses reveal-left. Text and button follow the card effect.',
        { h: 'ax-fade-down', img: 'ax-reveal-left' });

const rowCard = (n, cls) => '<div class="card e-con ' + cls + '"><div class="e-con-inner">' + w('<h3>Row card ' + n + '</h3>') + w('<p>Two cards in the same row: they start left to right, a moment apart.</p>') + w('<img alt="" src="' + IMG + '">') + w('<a href="#" class="btn">Button</a>') + '</div></div>';
const row = [
    '<section class="spacer"><p class="hint">Scroll down</p></section>',
    '<div class="row2">' + rowCard(1, 'ax-fade-up ax-cascade') + rowCard(2, 'ax-fade-up ax-cascade') + '</div>',
    '<p class="code">2 cards in one row: ax-fade-up ax-cascade</p>',
    ''
].join('\n');

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>AX cascade - 4 test cards</title>
<style>
    body { margin: 0; font-family: system-ui, sans-serif; background: #0f172a; color: #e2e8f0; }
    .wrap { max-width: 900px; margin: 0 auto; padding: 0 16px 40vh; }
    .spacer { height: 70vh; display: flex; align-items: flex-end; }
    .hint { opacity: .5; margin: 0; }
    .card { border: 2px solid #818cf8; border-radius: 16px; background: #1e293b; padding: 20px; box-shadow: 0 10px 30px rgba(0,0,0,.4); }
    .row2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
    .card { max-width: 520px; }
    .row2 .card { max-width: none; }
    .card h3 { margin: 0 0 8px; }
    .card p { margin: 0 0 12px; line-height: 1.5; }
    .card img { width: 100%; border-radius: 10px; display: block; margin-bottom: 12px; }
    .btn { display: inline-block; padding: 10px 18px; background: #6366f1; color: #fff; border-radius: 8px; text-decoration: none; }
    .code { font: 12px/1.4 monospace; opacity: .6; margin: 10px 0 0; }
</style>
</head>
<body>
<div class="wrap">
${cards}${row}</div>

${snippet}
</body>
</html>
`;

fs.writeFileSync('test-cards.html', html);
console.log('test-cards.html written (' + html.length + ' chars)');
