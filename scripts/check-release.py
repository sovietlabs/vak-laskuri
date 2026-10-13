"""Check the small static release boundary. Run from any directory."""
import json,re,struct,zlib
from pathlib import Path
root=Path(__file__).resolve().parents[1]
required={'en.html','app-en.mjs','backend-ui-en.mjs','engine-en.mjs','index.html','style.css','app.mjs','engine.mjs','history.mjs','catalogue.mjs','backend-ui.mjs','icon.svg','manifest.webmanifest','data.json','rules.json','.nojekyll'}
actual={p.name for p in (root/'docs').iterdir() if p.is_file()}
assert actual==required,('Unexpected website file set',actual^required)
for p in root.rglob('*'):
 if not p.is_file() or '.git' in p.relative_to(root).parts:continue
 rel=p.relative_to(root).as_posix()
 assert not p.is_symlink(),rel
 if p.suffix=='.png':
  raw=p.read_bytes();assert raw[:8]==b'\x89PNG\r\n\x1a\n',rel;offset=8;end=False
  while offset<len(raw):
   size=struct.unpack('!I',raw[offset:offset+4])[0];kind=raw[offset+4:offset+8];value=raw[offset+8:offset+8+size];crc=raw[offset+8+size:offset+12+size]
   assert kind in {b'IHDR',b'IDAT',b'IEND'},('Image metadata',rel,kind)
   assert len(crc)==4 and struct.unpack('!I',crc)[0]==zlib.crc32(kind+value)&0xffffffff,rel
   offset+=size+12
   if kind==b'IEND':end=True;break
  assert end and offset==len(raw),rel
  continue
 assert p.suffix not in {'.pdf','.sqlite','.pem','.key','.xlsx','.zip'},rel
 text=p.read_text()
 for pattern in [r'(?i)gh[pousr]_[A-Za-z0-9]{20,}',r'(?m)^-----BEGIN [A-Z ]*PRIVATE KEY-----',r'(?i)\b(?:10\.\d+\.\d+\.\d+|192\.168\.\d+\.\d+|172\.(?:1[6-9]|2\d|3[01])\.\d+\.\d+)\b',r'(?i)/(?:Users|home)/[A-Za-z0-9_-]+/']:
  assert not re.search(pattern,text),('Sensitive pattern',rel)
manifest=json.loads((root/'docs/manifest.webmanifest').read_text());assert all(manifest[k]=='./' for k in ['id','scope','start_url'])
index=(root/'docs/index.html').read_text();assert 'Content-Security-Policy' in index and 'Tiedot voivat olla virheellisiä.' in index and '11.10.2026' in index
assert not re.search(r'(?:href|src)="/(?!/)',index)
for p in (root/'docs').glob('*.mjs'):
 text=p.read_text()
 for sink in ['innerHTML','outerHTML','insertAdjacentHTML','document.write','eval(','new Function']:
  assert sink not in text,('Unsafe sink',p.name,sink)
manual=(root/'docs/backend-ui.mjs').read_text();assert 'fetch(' not in manual and 'api/' not in manual
print('Release boundary, sensitive-pattern, metadata and static-mode checks passed.')
