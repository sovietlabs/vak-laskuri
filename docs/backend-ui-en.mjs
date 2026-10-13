// This Pages build has no server API and never submits a report automatically.
const node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
export function showSourceState(dataset){
 const date=new Intl.DateTimeFormat('en-GB',{dateStyle:'long',timeZone:'Europe/Helsinki'}).format(new Date(dataset.checked));
 document.getElementById('data-age').textContent=`Information may be incorrect. Dataset last updated on ${date}. Check the official source before transport.`;
 document.getElementById('source-check').textContent='GitHub Pages: bundled local dataset. This version is updated manually. There is no automatic source check.';
}
export function reportButton(record,dataset){
 const b=node('button','Report an error');b.type='button';b.className='report-button';b.setAttribute('aria-label',`Report an error: UN ${record.un}, ${record.classification}, packing group ${record.packingGroup||'no group'}`);
 b.onclick=()=>openReport(record,dataset,b);return b;
}
function openReport(record,dataset,trigger){
 const existing=document.getElementById('report-dialog');if(existing){existing.focus();return;}
 const d=node('dialog');d.id='report-dialog';d.className='report-dialog';d.setAttribute('aria-labelledby','report-title');
 const title=node('h2',`Report an error: UN ${record.un}`);title.id='report-title';d.append(title,node('p',`${record.name} · ${record.classification} · Packing group ${record.packingGroup||'—'}`));
 const label=node('label','Describe the error. Give the correct information or source if you know it.');label.htmlFor='report-message';const text=node('textarea');text.id=label.htmlFor;text.minLength=10;text.maxLength=2000;text.rows=6;
 const note=node('p','You can download a report without an account. A GitHub issue requires a GitHub account and is published only when you submit it on GitHub. Do not include personal or customer data.');note.className='muted';
 const download=node('button','Download report');const github=node('button','Open report on GitHub');const close=node('button','Close');close.className='secondary';for(const b of [download,github,close])b.type='button';
 const status=node('p');status.setAttribute('role','status');
 function body(){if(text.value.trim().length<10){status.textContent='Enter at least 10 characters.';text.focus();return null;}return `UN ${record.un}: ${record.name}\nClassification code: ${record.classification}\nPacking group: ${record.packingGroup||'—'}\nEntry ID: ${record.id}\nDataset updated: ${dataset.checked}\nDataset SHA-256: ${dataset.sha256}\n\nReporter description (unverified):\n${text.value.trim()}`;}
 download.onclick=()=>{const value=body();if(value===null)return;const url=URL.createObjectURL(new Blob([value],{type:'text/plain;charset=utf-8'}));const a=node('a');a.href=url;a.download=`vak-virheilmoitus-${record.un}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Report downloaded. It has not been sent to a maintainer.';};
 github.onclick=()=>{const value=body();if(value===null)return;const url=new URL('https://github.com/sovietlabs/vak-laskuri/issues/new');url.searchParams.set('title',`Data error: UN ${record.un}`);url.searchParams.set('body',value);const a=node('a');a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.click();status.textContent='GitHub form opened. Review and submit the report there.';};
 close.onclick=()=>d.close();const actions=node('div');actions.className='actions';actions.append(download,github,close);d.append(label,text,note,status,actions);document.body.append(d);d.addEventListener('close',()=>{d.remove();if(trigger.isConnected)trigger.focus();},{once:true});d.showModal();text.focus();
}
