https://api.myfantasyleague.com/2021/export?TYPE=myleagues&YEAR=2021&FRANCHISE_NAMES=suitedkings&JSON=1

document.getElementById('getTeams').addEventListener('click', getTeams)

async function getTeams(){

    let franchiseName = document.getElementById('franchiseName').value
    const res = await fetch('https://api.myfantasyleague.com/2021/export?TYPE=myleagues&YEAR=2021&FRANCHISE_NAMES=' + `${franchiseName}`)
    const results = await res.json()
    console.log(results)

}
getTeams()