async function init(){
  const data = await (await fetch('data/club-data.json')).json();
  const teams = data.teams;
  const players = data.players;
  const totalAlerts = players.filter(p => p.score < 55).length;
  const strong = ['confiance','regulation','engagement','stabilite'].map(k=>({k,v:Math.round(teams.reduce((a,t)=>a+t[k],0)/teams.length)})).sort((a,b)=>b.v-a.v);
  const weak = strong[strong.length-1];

  document.getElementById('kpis').innerHTML = `
    <div class="card kpi"><h3>Score moyen club</h3><p>${data.club.score_moyen}</p></div>
    <div class="card kpi"><h3>Équipes</h3><p>${teams.length}</p></div>
    <div class="card kpi"><h3>Joueurs</h3><p>${players.length}</p></div>
    <div class="card kpi"><h3>Alertes</h3><p>${totalAlerts}</p></div>
  `;

  document.getElementById('staffSummary').textContent = `Le club présente un engagement collectif élevé (${strong[0].v}) et une base globale solide. La dimension la plus fragile est ${weak.k === 'regulation' ? 'la régulation émotionnelle' : weak.k} (${weak.v}). ${totalAlerts} joueur(s) sont en vigilance. Priorité staff : stabiliser la gestion de la pression et suivre les joueurs sous 55.`;

  new Chart(document.getElementById('clubRadar'), {
    type: 'radar',
    data: {
      labels: ['Confiance','Régulation','Engagement','Stabilité'],
      datasets: [{
        label: 'Club',
        data: [
          Math.round(teams.reduce((a,t)=>a+t.confiance,0)/teams.length),
          Math.round(teams.reduce((a,t)=>a+t.regulation,0)/teams.length),
          Math.round(teams.reduce((a,t)=>a+t.engagement,0)/teams.length),
          Math.round(teams.reduce((a,t)=>a+t.stabilite,0)/teams.length)
        ]
      }]
    },
    options: {responsive:true,plugins:{legend:{display:false}},scales:{r:{min:0,max:100}}}
  });

  new Chart(document.getElementById('teamsBar'), {
    type: 'bar',
    data: {
      labels: teams.map(t=>t.name),
      datasets: [{label: 'Score moyen', data: teams.map(t=>t.score)}]
    },
    options: {responsive:true,plugins:{legend:{display:false}},scales:{y:{min:0,max:100}}}
  });
}
init();
