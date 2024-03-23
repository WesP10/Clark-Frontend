class CD {
    constructor(title, artist, country, company, price, year){
        this.title=title;
        this.artist=artist;
        this.country=country;
        this.company=company;
        this.price=price;
        this.year=year;
    }
}
class Game {
    constructor(title, year, platform){
        this.year=year;
        this.title=title;
        this.platform=platform;
    }
}
function loadData() {
    const xhttp = new XMLHttpRequest();
    //Asynchronous - Defininng code that will happen later 
    xhttp.onreadystatechange = function () {
        if(this.readyState === 4 && this.status === 200){
            const xmlDoc = this.responseXML;
            const games = xmlDoc.getElementsByTagName("game");
            let table = "<tr><th>Title</th><th>Year</th><th>Platform</th></tr>";
            for(let i = 0; i < games.length; i++){
                let title = games[i].getElementsByTagName("title")[0].childNodes[0].nodeValue;
                let year = games[i].getElementsByTagName("year")[0].childNodes[0].nodeValue;
                let platform = games[i].getElementsByTagName("platform")[0].childNodes[0].nodeValue;
                table += "<tr><td>"+ title + "</td>" +
                    "<td>"+year+"</td>" +
                    "<td>"+platform+"</td></tr>";
            }
            document.getElementById("gameData").innerHTML = table;
        }
    }
    xhttp.open("GET", "../images/xml/games.xml", true);
    xhttp.send();
}

function loadXMLData(){
    fetch('../images/xml/cd_catalog.xml')
        .then(response => response.text()) //for XML use text
        .then(xmlText => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(xmlText, 'application/xml');
            const cdNodes = xmlDoc.querySelectorAll('CD');
            const cdList = Array.from(cdNodes).map(n => {
                const title = n.querySelector('TITLE').textContent;
                const artist = n.querySelector('ARTIST').textContent;
                const country = n.querySelector('COUNTRY').textContent;
                const company = n.querySelector('COMPANY').textContent;
                const price = parseFloat(n.querySelector('PRICE').textContent);
                const year = parseInt(n.querySelector('YEAR').textContent);

                return new CD(title, artist, country, company, price, year);
            });
            sessionStorage.cdData = JSON.stringify(cdList);
        })
        .catch(error => {
            console.log('Error fetching data: ', error);
        });
}

function loadJsonData(){
    fetch('../images/xml/cd_catalog.json')
        .then(response => response.json()) 
        .then(jsonData => {
            const cdList = jsonData.CATALOG.CD.map(cd => {
                return new CD(cd.TITLE, cd.ARTIST, cd.COUNTRY, cd.COMPANY, cd.PRICE, cd.YEAR);
            });
            sessionStorage.cdData = JSON.stringify(cdList);
        })
        .catch(error => {
            console.log('Error fetching data: ', error);
        });
}