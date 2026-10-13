export const TABLE_SOURCE='https://traficom.fi/sites/default/files/media/file/2025%20VAK%20tie%20A-taulukko.xlsx';
const fields=['un','name','class','classification','packingGroup','labels','special','lq','eq','packing','packingSpecial','mixedPacking','portableTank','portableSpecial','tankCode','tankSpecial','vehicle','categoryTunnel','packages','bulk','handling','operation','hazard'];
export function validateCatalogue(data){
 if(!data||!Array.isArray(data.rows)||data.rows.length<2000||data.rows.length>15000||data.source!==TABLE_SOURCE||!/^\d{4}-\d{2}-\d{2}$/.test(data.checked)||Number.isNaN(Date.parse(data.checked))||typeof data.edition!=='string'||data.edition.length>100||!/^[a-f0-9]{64}$/.test(data.sha256))throw Error('Virheellinen aineisto.');
 const ids=new Set();
 for(const r of data.rows){
  if(!r||typeof r.id!=='string'||!/^\d{1,6}$/.test(r.id)||ids.has(r.id)||!/^\d{4}$/.test(r.un)||!r.name||!(r.category===null||(Number.isInteger(r.category)&&r.category>=0&&r.category<=4)))throw Error('Virheellinen nimike.');
  for(const key of fields)if(typeof r[key]!=='string'||r[key].length>5000)throw Error('Virheellinen nimikekenttä.');
  ids.add(r.id);
 }
 return data;
}
export function validateRules(rules){
 if(!rules||typeof rules!=='object'||Array.isArray(rules)||Object.keys(rules).length>1000)throw Error('Virheellinen määräysaineisto.');
 for(const [key,r] of Object.entries(rules))if(!/^(?:SP|CV|V|S)\d{1,3}$/.test(key)||!r||!Number.isInteger(r.page)||r.page<1||r.page>2000||typeof r.text!=='string'||r.text.length>200000)throw Error('Virheellinen määräysteksti.');
 return rules;
}
