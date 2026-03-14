async function init(){
  const data = await (await fetch('data/club-data.json')).json();
  const body = document.getElementById('passationsBody');
  body.innerHTML = data.passations.map(p => `
    <tr>
      <td>${p.module}</td>
      <td>${p.team}</td>
      <td><code>${p.url}</code></td>
      <td>${p.status}</td>
      <td>${p.responses}</td>
    </tr>
  `).join('');
}
init();
