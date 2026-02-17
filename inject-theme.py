"""Post-process notebook.html to inject theme CSS and font directly into <head>."""
import sys

html_file = sys.argv[1] if len(sys.argv) > 1 else 'notebook.html'

with open(html_file, 'r') as f:
    html = f.read()

inject = (
    '<link rel="preconnect" href="https://fonts.googleapis.com">'
    '<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>'
    '<link href="https://fonts.googleapis.com/css2?family=VT323&display=swap" rel="stylesheet">'
    '<link rel="stylesheet" href="notebook-theme.css">'
)

html = html.replace('</head>', inject + '</head>', 1)

with open(html_file, 'w') as f:
    f.write(html)

print(f'Injected theme into {html_file}')
