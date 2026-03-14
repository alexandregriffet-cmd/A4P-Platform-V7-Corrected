async function loadClubData() {
  const res = await fetch('data/club-data.json');
  return res.json();
}
function badgeClass(score){
  if(score < 45) return ['🔴','red'];
  if(score < 55) return ['🟠','orange'];
  return ['🟢','green'];
}
