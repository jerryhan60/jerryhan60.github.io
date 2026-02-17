"""Post-process notebook.html to inject theme CSS and font directly into <head>.

Inlines the full CSS content as a <style> block (not a <link>) to guarantee
it wins all specificity battles against the classic template's inline styles.
"""
import sys
import os

html_file = sys.argv[1] if len(sys.argv) > 1 else 'notebook.html'
css_file = os.path.join(os.path.dirname(html_file) or '.', 'notebook-theme.css')

with open(html_file, 'r') as f:
    html = f.read()

with open(css_file, 'r') as f:
    css = f.read()

inject = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">'
    '<style>\n' + css + '\n</style>'
)

html = html.replace('</head>', inject + '\n</head>', 1)

with open(html_file, 'w') as f:
    f.write(html)

print(f'Injected theme ({len(css)} bytes of CSS) into {html_file}')
