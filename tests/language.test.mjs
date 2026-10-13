import {test} from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import * as fi from '../docs/engine.mjs';
import * as en from '../docs/engine-en.mjs';
const data=JSON.parse(readFileSync(new URL('../docs/data.json',import.meta.url)));
test('English engine preserves calculation results for every catalogue variant and boundary quantities',()=>{
 for(const record of data.rows){
  assert.equal(en.factor(record),fi.factor(record));
  assert.deepEqual(en.bases(record).map(x=>x[0]),fi.bases(record).map(x=>x[0]));
  for(const amount of ['0.000001','20','50','333','333.000001','1000','1000.000001']){
   const rows=[{record,amount,basis:fi.bases(record)[0][0]}];
   if(record.category===null){assert.throws(()=>en.calculate(rows));continue;}
   const a=fi.calculate(rows),b=en.calculate(rows);
   assert.deepEqual({...a,reasons:a.reasons.length},{...b,reasons:b.reasons.length});
   assert.equal(en.remainingQuantity(rows,record),fi.remainingQuantity(rows,record));
  }
 }
});
test('English page preserves official source destinations and language links',()=>{
 const fiPage=readFileSync(new URL('../docs/index.html',import.meta.url),'utf8');
 const enPage=readFileSync(new URL('../docs/en.html',import.meta.url),'utf8');
 const urls=s=>[...s.matchAll(/href="(https:[^"]+)"/g)].map(x=>x[1]);
 assert.deepEqual(urls(enPage),urls(fiPage));
 assert.match(fiPage,/href="en.html"/);assert.match(enPage,/lang="en"/);
 assert.match(enPage,/Information may be incorrect/);assert.match(enPage,/11 October 2026/);
 assert.match(enPage,/remain in Finnish/);assert.match(enPage,/app-en.mjs/);
});
