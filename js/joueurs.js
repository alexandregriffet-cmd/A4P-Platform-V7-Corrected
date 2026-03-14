async function init(){
  const data = await (await fetch('data/club-data.json')).json();
  const body = document.getElementById('playersBody');
  body.innerHTML = data.players.map(p => {
    const [emoji, cls] = p.score < 45 ? ['🔴','red'] : p.score < 55 ? ['🟠','orange'] : ['🟢','green'];
    return `<tr>
      <td>${p.name}</td>
      <td>${p.team}</td>
      <td>${p.score}</td>
      <td>${p.confiance}</td>
      <td>${p.regulation}</td>
      <td>${p.engagement}</td>
      <td>${p.stabilite}</td>
      <td><span class="badge ${cls}">${emoji}</span></td>
    </tr>`;
  }).join('');
}
init();
