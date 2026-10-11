import json, http.server, re, sys, os
ROOT=sys.argv[1]; PORT=int(sys.argv[2])
cfg=json.load(open(os.path.join(ROOT,'vercel.json')))
def hdrs(path):
    out=[]
    for rule in cfg['headers']:
        pat='^'+rule['source'].replace('(.*)','.*').replace('(css|js)','(css|js)')+'$'
        if re.match(pat,path): out+=rule['headers']
    return out
class H(http.server.SimpleHTTPRequestHandler):
    def __init__(s,*a,**k): super().__init__(*a,directory=ROOT,**k)
    def end_headers(s):
        for h in hdrs(s.path.split('?')[0]):
            if h['key'] in ('Strict-Transport-Security',): continue
            v=h['value'].replace(' upgrade-insecure-requests','').replace('; upgrade-insecure-requests','')
            s.send_header(h['key'],v)
        super().end_headers()
    def log_message(s,*a): pass
http.server.ThreadingHTTPServer(('127.0.0.1',PORT),H).serve_forever()
