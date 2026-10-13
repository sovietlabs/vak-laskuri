export const exceptions = new Set(['0081','0082','0084','0241','0331','0332','0482','1005','1017']);
export function factor(r) { return r.category===1?(exceptions.has(r.un)?20:50):({0:null,2:3,3:1,4:0}[r.category]??null); }
export function parseAmount(value) {
 const s=String(value).trim();
 if(!/^\d+(?:[.,]\d{1,6})?$/.test(s)) throw Error('Enter a positive quantity with no more than six decimal places.');
 const n=Number(s.replace(',','.'));
 if(!Number.isFinite(n)||n<=0||n>1e9) throw Error('Quantity must be greater than 0 and no more than 1,000,000,000.');
 return n;
}
export function bases(r) {
 if(r.class==='1') return [['nem','kg net explosive mass']];
 if(r.class==='2' && r.un!=='1950') {
  const code=r.classification;
  if(/^[189]/.test(code)) return [['capacity','L receptacle capacity']];
  if(/^[234]/.test(code)) return [['net','kg net mass']];
  return [['article','kg articles without packaging']];
 }
 if(r.class==='3' && !/^(3540)$/.test(r.un)) return [['liquid','L liquid']];
 if(r.un==='1950') return [['article','kg aerosols without outer packaging']];
 return [['liquid','L liquid'],['net','kg net solid mass'],['article','kg articles without packaging']];
}
export function calculate(items) {
 if(!items.length) return {status:'empty',points:0,groups:[],reasons:[]};
 const scale=1000000n;
 let points=0n; const reasons=[],groups=new Map();
 for(const {record:r,amount,basis} of items) {
  if(!r || !Number.isInteger(r.category)||r.category<0||r.category>4) throw Error('Transport category is missing. Check the special provisions.');
  parseAmount(amount);
  const [whole,decimal='']=String(amount).trim().replace(',','.').split('.');
  const n=BigInt(whole)*scale+BigInt(decimal.padEnd(6,'0'));
  if(!bases(r).some(([id])=>id===basis)) throw Error('Check the quantity basis.');
  const f=factor(r);
  if(r.category===0) reasons.push('Category 0: the quantity exemption cannot be used.');
  points+=n*BigInt(f??0);
  const key=r.category===1&&exceptions.has(r.un)?'1a':String(r.category);
  const g=groups.get(key)||{key,amount:0n,points:0n,limit:({0:0,1:20,'1a':50,2:333,3:1000,4:null})[key]};
  g.amount+=n;g.points+=n*BigInt(f??0);groups.set(key,g);
 }
 // Compare the unrounded value. A single category 2 load has a 333-unit limit.
 const active=[...groups.values()].filter(g=>g.key!=='4');
 if(active.length===1 && active[0].limit!==null && active[0].amount>BigInt(active[0].limit)*scale) reasons.push('Transport category quantity limit exceeded.');
 if(points>1000n*scale) reasons.push('Calculated value exceeds 1,000.');
 return {status:reasons.length?'exceeded':'within',points:Number(points)/1e6,groups:[...groups.values()].map(g=>({...g,amount:Number(g.amount)/1e6,points:Number(g.points)/1e6})),reasons};
}
export function remainingQuantity(items,record) {
 const result=calculate(items),f=factor(record);
 if(result.status==='exceeded') return 0;
 if(f===null) return 0;
 if(f===0) return null;
 let remaining=Math.floor(Math.max(0,1000000000-Math.round(result.points*1e6))/f)/1e6;
 const key=record.category===1&&exceptions.has(record.un)?'1a':String(record.category);
 const active=result.groups.filter(g=>g.key!=='4');
 if(active.every(g=>g.key===key)) {
  const limit=({1:20,'1a':50,2:333,3:1000})[key];
  remaining=Math.min(remaining,Math.max(0,limit-(active[0]?.amount??0)));
 }
 return remaining;
}
export function ruleCodes(r) {
 return [...new Set([
  ...[...r.special.matchAll(/\b\d{2,3}\b/g)].map(m=>'SP'+m[0]),
  ...[...`${r.packages} ${r.handling} ${r.operation}`.matchAll(/\b(?:CV|V|S)\d+\b/g)].map(m=>m[0])
 ])];
}
