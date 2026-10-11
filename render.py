import io
from playwright.sync_api import sync_playwright
from PIL import Image
import os, sys
R=os.path.dirname(os.path.dirname(os.path.abspath(__file__))); U='http://127.0.0.1:8123'
svg=open(R+'/favicon.svg').read()
with sync_playwright() as p:
    b=p.chromium.launch(); msgs=[]
    def icon(size, path, maskable=False):
        pg=b.new_page(viewport={'width':size,'height':size})
        inner = svg.replace('<svg ','<svg width="%d" height="%d" '%(size,size))
        if maskable:
            inner = '<div style="width:%dpx;height:%dpx;background:#0B0E14;display:grid;place-items:center">%s</div>'%(size,size,svg.replace('<svg ','<svg width="%d" height="%d" '%(int(size*.72),int(size*.72))))
        pg.set_content('<html><body style="margin:0;background:transparent">'+inner+'</body></html>')
        pg.screenshot(path=path, omit_background=True); pg.close()
    for s,n in [(180,'apple-touch-icon.png'),(192,'icon-192.png'),(512,'icon-512.png')]: icon(s,f'{R}/{n}')
    icon(512,f'{R}/icon-512-maskable.png',True)
    icon(256,'/tmp/ico256.png')
    Image.open('/tmp/ico256.png').save(f'{R}/favicon.ico',sizes=[(16,16),(32,32),(48,48)])
    # OG
    pg=b.new_page(viewport={'width':1200,'height':630},color_scheme='dark',bypass_csp=True)
    pg.on('console',lambda m: msgs.append(m.text)); pg.on('pageerror',lambda e: msgs.append('ERR '+str(e)))
    pg.goto(U+'/tools/og.html?og&theme=dark'); pg.wait_for_function('window.__ready===true')
    pg.wait_for_function('document.querySelectorAll(".pk").length>=4 && document.querySelector(".blk")', timeout=60000)
    pg.wait_for_timeout(250)
    pg.screenshot(path=f'{R}/og.png')
    # PDFs
    for theme,name in [('dark','OSI-Security-Rings-A3.pdf'),('light','OSI-Security-Rings-A3-print-light.pdf')]:
        pg=b.new_page(bypass_csp=True); pg.goto(f'{U}/?print&theme={theme}'); pg.wait_for_function('window.__ready===true')
        pg.pdf(path=f'{R}/downloads/{name}',width='420mm',height='297mm',print_background=True,prefer_css_page_size=True)
        pg.screenshot(path=f'/tmp/pdf-{theme}.png',full_page=True)
    print(msgs); b.close()
