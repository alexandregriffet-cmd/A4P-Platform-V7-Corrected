async function init(){
  const data = await (await fetch('data/club-data.json')).json();
  const root = document.getElementById('teamsGrid');
  root.innerHTML = data.teams.map(t => `
    <article class="card">
      <p class="eyebrow">${t.players} joueurs</p>
      <h2>${t.name}</h2>
      <p>Score moyen : <strong>${t.score}</strong></p>
      <p>Confiance ${t.confiance} • Régulation ${t.regulation}</p>
      <p>Engagement ${t.engagement} • Stabilité ${t.stabilite}</p>
      <p>Alertes : <strong>${t.alertes}</strong></p>
    </article>
  `).join('');
}
init();
