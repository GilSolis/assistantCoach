
document.getElementById('getTeams').addEventListener('click', getTeams)

async function getTeams(){

    let franchiseName = document.getElementById('franchiseName').value
    //test URLs
    const baseURL = `https://proxygil1.herokuapp.com`;
    const url = `${baseURL}/fetch`
    fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
        method: 'get', // I assume you're using get requests to communicate with the myfantasyleague api, but if not you can change this to post or whatever
        searchURL: 'https://pokeapi.co/api/v2/pokemon/ditto' // here you put the full url to myfantasyleague.com including query parameters and everything. change this parameter whenever you need to make a request for different info from myfantasyleague
    })
    }).then(res=> res.json()).then(console.log);
}


