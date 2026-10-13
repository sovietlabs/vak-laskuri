// This Pages build has no server API and never submits a report automatically.
const node=(tag,text)=>{const n=document.createElement(tag);if(text!==undefined)n.textContent=text;return n;};
export function showSourceState(dataset){
 const date=new Intl.DateTimeFormat('fi-FI',{dateStyle:'long',timeZone:'Europe/Helsinki'}).format(new Date(dataset.checked));
 document.getElementById('data-age').textContent=`Tiedot voivat olla virheellisiä. Aineisto päivitetty viimeksi ${date}. GitHub Pages palvelee vain staattisia tiedostoja eikä voi suorittaa sovelluksen palvelintaustaa. Tässä versiossa ei siksi ole automaattista päivittäistä lähdetarkistusta. Aineiston muutokset tarkistetaan ja julkaistaan käsin. Tarkista tiedot virallisesta lähteestä ennen kuljetusta.`;
 document.getElementById('source-check').textContent='GitHub Pages: mukana toimitettu paikallinen aineistokopio. Tätä versiota päivitetään käsin. Sivulla ei ole automaattista lähdetarkistusta.';
}
export function reportButton(record,dataset){
 const b=node('button','Ilmoita virhe');b.type='button';b.className='report-button';b.setAttribute('aria-label',`Ilmoita virhe: UN ${record.un}, ${record.classification}, pakkausryhmä ${record.packingGroup||'ei ryhmää'}`);
 b.onclick=()=>openReport(record,dataset,b);return b;
}
function openReport(record,dataset,trigger){
 const existing=document.getElementById('report-dialog');if(existing){existing.focus();return;}
 const d=node('dialog');d.id='report-dialog';d.className='report-dialog';d.setAttribute('aria-labelledby','report-title');
 const title=node('h2',`Ilmoita virhe: UN ${record.un}`);title.id='report-title';d.append(title,node('p',`${record.name} · ${record.classification} · Pakkausryhmä ${record.packingGroup||'—'}`));
 const label=node('label','Kuvaa virhe ja kerro oikea tieto tai lähde, jos tiedät sen.');label.htmlFor='report-message';const text=node('textarea');text.id=label.htmlFor;text.minLength=10;text.maxLength=2000;text.rows=6;
 const note=node('p','Voit ladata ilmoituksen ilman käyttäjätiliä. GitHub-ilmoitus vaatii GitHub-tilin ja julkaistaan vasta, kun lähetät sen GitHubissa. Älä lisää henkilötietoja tai asiakastietoja.');note.className='muted';
 const download=node('button','Lataa ilmoitus');const github=node('button','Avaa ilmoitus GitHubissa');const close=node('button','Sulje');close.className='secondary';for(const b of [download,github,close])b.type='button';
 const status=node('p');status.setAttribute('role','status');
 function body(){if(text.value.trim().length<10){status.textContent='Kirjoita vähintään 10 merkkiä.';text.focus();return null;}return `UN ${record.un}: ${record.name}\nLuokituskoodi: ${record.classification}\nPakkausryhmä: ${record.packingGroup||'—'}\nNimikkeen tunnus: ${record.id}\nAineisto päivitetty: ${dataset.checked}\nAineiston SHA-256: ${dataset.sha256}\n\nIlmoittajan kuvaus (tarkistamaton):\n${text.value.trim()}`;}
 download.onclick=()=>{const value=body();if(value===null)return;const url=URL.createObjectURL(new Blob([value],{type:'text/plain;charset=utf-8'}));const a=node('a');a.href=url;a.download=`vak-virheilmoitus-${record.un}.txt`;a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);status.textContent='Ilmoitus ladattu. Sitä ei ole lähetetty ylläpitäjälle.';};
 github.onclick=()=>{const value=body();if(value===null)return;const url=new URL('https://github.com/sovietlabs/vak-laskuri/issues/new');url.searchParams.set('title',`Tietovirhe: UN ${record.un}`);url.searchParams.set('body',value);const a=node('a');a.href=url.href;a.target='_blank';a.rel='noopener noreferrer';a.click();status.textContent='GitHub-lomake avattu. Tarkista ja lähetä ilmoitus siellä.';};
 close.onclick=()=>d.close();const actions=node('div');actions.className='actions';actions.append(download,github,close);d.append(label,text,note,status,actions);document.body.append(d);d.addEventListener('close',()=>{d.remove();if(trigger.isConnected)trigger.focus();},{once:true});d.showModal();text.focus();
}
