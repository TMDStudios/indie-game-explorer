let apps = []

function getApps(){
    const request = new XMLHttpRequest();
    request.open("GET", "https://devroboto.pythonanywhere.com/games/");
    request.onload = function(){
        console.log("Got the apps")
        const data = JSON.parse(request.response);
        for(let i = 0; i<data.length; i++){
            apps.push(data[i]);
        }
        if(apps.length==0){
            return [
                {
                    "name": "Block Wars",
                    "description": "Battle enemy ships in a shrinking environment.",
                    "website": "https://tmdstudios.github.io/",
                    "app_store": "",
                    "google_play": "https://play.google.com/store/apps/details?id=com.tmdstudios.blockwars",
                    "video": "9MBChUsqMy8",
                    "image": "https://play-lh.googleusercontent.com/1rON5qf8rvD3w948-2sKvFVzu0ZSEXTclvhF1PFw8mYxb74L60VeZDLQ-7OnVlXRG1I=w2560-h1440-rw",
                    "genre": "Arcade",
                    "approved": 1
                },
                {
                    "name": "Buddy Breakout",
                    "description": "A new twist on a classic.",
                    "website": "https://tmdstudios.github.io/",
                    "app_store": "",
                    "google_play": "https://play.google.com/store/apps/details?id=com.tmdstudios.buddybreakout",
                    "video": "V1wk2NYxhmk",
                    "image": "https://play-lh.googleusercontent.com/M8Kb7P8kKtzAbiVWDPJ8zQr4Mbeekv2kgWl6tGZyWMuv-XdjEZeJz9t9hpviBdEF1w=w2560-h1440-rw",
                    "genre": "Arcade",
                    "approved": 1
                },
                {
                    "name": "Puzzled Knight",
                    "description": "A match-3 fighting game.",
                    "website": "https://tmdstudios.github.io/",
                    "app_store": "",
                    "google_play": "https://play.google.com/store/apps/details?id=com.tmdstudios.puzzledknight",
                    "video": "aYcv7Hl_kB8",
                    "image": "https://play-lh.googleusercontent.com/NHQEB2nxZP8Iy5SJwAX5T33dUABP-WKVN5Xnww5WDvfOqGuKMc2UZj6TKNTcDHrCkC0=w2560-h1440-rw",
                    "genre": "Puzzle",
                    "approved": 1
                },
                {
                    "name": "Road to Rage",
                    "description": "Shoot your way through a horde of inconsiderate motorists.",
                    "website": "https://tmdstudios.github.io/",
                    "app_store": "",
                    "google_play": "https://play.google.com/store/apps/details?id=com.wordpress.tmdstudios",
                    "video": "r-tbHSkd03Y",
                    "image": "https://play-lh.googleusercontent.com/I1m1d0nO00mpXQqbt117pz2ltcNf2Bq9CpprbR0-BI-9m8OZVAMf0bGSIgzyguwHdgOP=w2560-h1440-rw",
                    "genre": "Arcade",
                    "approved": 1
                }
            ]
        }
        return JSON.parse(request.response)
    }
    request.send();
}

getApps()
let currentApp = 0;

function prevApp(){
    if(currentApp>0){
        currentApp--;
    }else{
        currentApp=apps.length-1;
    }
    showApp();
}

function nextApp(){
    console.log(apps[0].name)
    if(currentApp<apps.length-1){
        currentApp++;
    }else{
        currentApp=0;
    }
    showApp();
}

function showApp(){
    console.log(Number.isNaN(parseInt(apps[currentApp].google_play)))
    console.log(Number.isNaN(parseInt(apps[currentApp].app_store)))
    const googlePlayLink = Number.isNaN(parseInt(apps[currentApp].google_play)) ? apps[currentApp].google_play : "#";
    const appStoreLink = Number.isNaN(parseInt(apps[currentApp].app_store)) ? apps[currentApp].app_store : "#";

    document.getElementById("description").innerHTML = `
        <h4>${apps[currentApp].name}</h4>
        <p><em>${apps[currentApp].genre}</em></p>
        <p><br></p>
        <p>${apps[currentApp].description}</p>
        <p><a href='${apps[currentApp].website}'>Official Website</a></p>
    `;
    document.getElementById("link").innerHTML = `
        <a href="${googlePlayLink}"><img src="media/googleBanner.png"/></a>
        <a href="${appStoreLink}"><img id="appStoreLogo" src="media/appleBanner.png"/></a>
    `;
    document.getElementById("video").setAttribute("src", `https://www.youtube.com/embed/${apps[currentApp].video}?autoplay=1&mute=1&loop=1`);
    document.getElementById("video").setAttribute("title", apps[currentApp].name);
}

function viewImage(){
    window.open("/"+apps[currentApp].fullImg);
}

const appHeight = () => document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`)
window.addEventListener('resize', appHeight)
appHeight()

// MODAL
function addGame(){
    document.getElementById("modal").showModal();
}

let gameForm = document.getElementById("addGameForm");
gameForm.onsubmit = function(e){
    e.preventDefault()
    console.log("Submit Game");

    let xhttp = new XMLHttpRequest();
    xhttp.open("POST", "https://devroboto.pythonanywhere.com/games/add/");
    xhttp.onload = function(){
        alert("Game submitted")
    }
    xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    if(document.getElementById('gameName').value.length>0
    && document.getElementById('gameDescription').value.length>0
    && document.getElementById('gameImage').value.length>0){
        xhttp.send("name="+document.getElementById('gameName').value+
        "&description="+document.getElementById('gameDescription').value+
        "&website="+document.getElementById('gameWebsite').value+
        "&app_store="+document.getElementById('app_store').value+
        "&google_play="+document.getElementById('google_play').value+
        "&video="+document.getElementById('gameVideo').value+
        "&image="+document.getElementById('gameImage').value+
        "&genre="+document.getElementById('genre').value
        );
    }else{
        alert("Game Name, Description, and Image must be provided")
    }
    document.getElementById("modal").close();
}
document.getElementById("cancelBtn").addEventListener('click', () => {
    document.getElementById("modal").close();
});