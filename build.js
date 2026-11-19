// Dijalankan Vercel saat deploy: mengganti __TGL__ dengan tanggal deploy (WIB)
const fs = require('fs');
const bulan = ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des'];
const p = new Intl.DateTimeFormat('en-GB', {timeZone:'Asia/Jakarta', day:'numeric', month:'numeric', year:'numeric'})
  .formatToParts(new Date()).reduce((a,x)=>(a[x.type]=x.value,a),{});
const tgl = `${p.day} ${bulan[p.month-1]} ${p.year}`;
let n = 0;
for (const f of fs.readdirSync('.').filter(f => f.endsWith('.html'))) {
  const s = fs.readFileSync(f, 'utf8');
  if (s.includes('__TGL__')) { fs.writeFileSync(f, s.split('__TGL__').join(tgl)); n++; }
}
console.log(`Tanggal pembaruan: ${tgl} (${n} file)`);
