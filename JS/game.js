class Player {
    constructor(num) {
        this.name = "";
        this.num = num;
        this.romaning = 3000;
        this.location = 1;
        this.prisoner = false;
        this.prisonCounter = 0;
        this.freeParking = false;
    }

    GetName() { return this.name }

    GetRomaning() { return this.romaning }

    getLocation() { return this.location }

    setLocation(newLocation) {
        this.location = newLocation;
        if (this.location > 20) {
            this.location -= 20;
            this.setRomaning(200);
        }
        document.getElementById("soldierImg" + String(this.num - 1)).remove();
        document.getElementById("soldier" + String(this.location)).appendChild(soldier[this.num - 1]);
    }

    setRomaning(amount) {
        this.romaning += amount;
        if (this.romaning < 0) {
            gameOver();
            return;
        }
        else document.getElementById("romaning" + String(this.num)).innerHTML = "ROMANING: " + String(this.romaning);
    }

    setRomaningTo0() { this.romaning = 0 }
}

class City {
    constructor(name, price, country, housePrice, hotelPrice, rent, house1, house2, house3, house4, hotel) {
        this.name = name;
        this.price = price;
        this.country = country;
        this.housePrice = housePrice;
        this.hotelPrice = hotelPrice;
        this.rent = rent;
        this.house1 = house1;
        this.house2 = house2;
        this.house3 = house3;
        this.house4 = house4;
        this.hotel = hotel;
        this.owner = "";
        this.status = 0;
    }

    getPrice() { return this.price }

    setStatus() { this.status++ }

    getOwner() { return this.owner }

    build(placenum) {
        let place = document.getElementById("place" + String(placenum));
        let titleDiv = document.createElement('div');
        titleDiv.className = "title " + this.country;
        titleDiv.innerText = this.name
        place.appendChild(titleDiv);
        let soldiersDiv = document.createElement('div');
        soldiersDiv.className = "soldier";
        soldiersDiv.id = "soldier" + String(placenum);
        place.appendChild(soldiersDiv);
        let houseDiv = document.createElement('div');
        houseDiv.className = "house";
        houseDiv.id = "house" + String(placenum);
        place.appendChild(houseDiv);
    }

    action() {
        if (this.status == 0) { this.buy(); return }
        else if (whoIsNow == this.owner) { return }
        else this.rentPlace();
    }

    rentPlace() {
        let massege = document.getElementById("alerts");
        massege.innerText = this.name + " BELONGS TO " + players[this.owner].GetName() + ", YOU HAVE TO PAY HIM " + String(this[statuses[this.status]]) + "$.";
        players[whoIsNow].setRomaning(-this[statuses[this.status]]);
        players[this.owner].setRomaning(this[statuses[this.status]])
    }

    buy() {
        let city = this;
        let massege = document.getElementById("alerts");
        massege.innerText = "DO YOU WANT TO BUY " + this.name + " FOR " + this.getPrice() + "$?";
        let br = document.createElement('br');
        let yes = document.createElement('button');
        let no = document.createElement('button');
        yes.addEventListener("click", function () {
            city.status++;
            if (whoIsNow == 0) {
                city.owner = 3;
                players[3].setRomaning(-city.getPrice());
            }
            else {
                city.owner = whoIsNow - 1;
                players[whoIsNow - 1].setRomaning(-city.getPrice());
            }
            let massege = document.getElementById("alerts");
            massege.innerHTML = "";
        });
        no.addEventListener("click", function () {
            let massege = document.getElementById("alerts");
            massege.innerHTML = "";
        });
        yes.innerText = "YES";
        no.innerText = "NO";
        massege.appendChild(br)
        massege.appendChild(yes);
        massege.appendChild(no);
    }
}

class Chances {
    constructor(amount, text) {
        this.amount = amount;
        this.text = text;
    }

    getText() { return this.text }

    getAmount() { return this.amount }
}

class Chance {
    constructor() { }

    build(placenum) {
        let place = document.getElementById("place" + String(placenum));
        place.style.backgroundImage = "url('../pictures/chance.png')";
        place.style.backgroundSize = "100% 100%"
        let titleDiv = document.createElement('div');
        titleDiv.innerText = "CHANCE"
        place.appendChild(titleDiv);
        let soldiersDiv = document.createElement('div');
        soldiersDiv.className = "soldier";
        soldiersDiv.id = "soldier" + String(placenum);
        place.appendChild(soldiersDiv);
    }

    action() {
        let chance = chances[parseInt(Math.random() * chances.length)];
        let massege = document.getElementById("alerts");
        massege.innerText = chance.getText();
        players[whoIsNow].setRomaning(chance.getAmount());
    }
}

class CommunityChests {
    constructor(amount, text) {
        this.amount = amount;
        this.text = text;
    }

    getText() { return this.text }

    getAmount() { return this.amount }
}

class CommunityChest {
    constructor() { }

    build(placenum) {
        let place = document.getElementById("place" + String(placenum));
        place.style.backgroundImage = "url('../pictures/CommunityChest.png')";
        place.style.backgroundSize = "100% 100%"
        let titleDiv = document.createElement('div');
        titleDiv.innerText = "COMMUNITY CHEST"
        place.appendChild(titleDiv);
        let soldiersDiv = document.createElement('div');
        soldiersDiv.className = "soldier";
        soldiersDiv.id = "soldier" + String(placenum);
        place.appendChild(soldiersDiv);
    }

    action() {
        let chance = community_Chests[parseInt(Math.random() * community_Chests.length)];
        let massege = document.getElementById("alerts");
        massege.innerText = chance.getText();
        players[whoIsNow].setRomaning(chance.getAmount());
    }
}

class Corner1 {
    constructor() { }

    build(placenum) {
        let place = document.getElementById("place" + String(placenum));
        place.style.backgroundImage = "url('../pictures/GO.png')";
        place.style.backgroundSize = "100% 100%"
        let soldiersDiv = document.createElement('div');
        soldiersDiv.className = "soldier";
        soldiersDiv.id = "soldier" + String(placenum);
        place.appendChild(soldiersDiv);
    }

    action() { }
}

class Corner2 {
    constructor() { }

    build(placenum) {
        let place = document.getElementById("place" + String(placenum));
        place.style.backgroundImage = "url('../pictures/jail.png')";
        place.style.backgroundSize = "100% 100%"
        let soldiersDiv = document.createElement('div');
        soldiersDiv.className = "soldier";
        soldiersDiv.id = "soldier" + String(placenum);
        place.appendChild(soldiersDiv);
    }

    action() { }
}

class Corner3 {
    constructor() { }

    build(placenum) {
        let place = document.getElementById("place" + String(placenum));
        place.style.backgroundImage = "url('../pictures/freeParking.png')";
        place.style.backgroundSize = "100% 100%"
        let soldiersDiv = document.createElement('div');
        soldiersDiv.className = "soldier";
        soldiersDiv.id = "soldier" + String(placenum);
        place.appendChild(soldiersDiv);
    }

    action() {
        players[whoIsNow].freeParking = true;
    }
}

class Corner4 {
    constructor() { }

    build(placenum) {
        let place = document.getElementById("place" + String(placenum));
        place.style.backgroundImage = "url('../pictures/judge.png')";
        place.style.backgroundSize = "100% 100%"
        let soldiersDiv = document.createElement('div');
        soldiersDiv.className = "soldier";
        soldiersDiv.id = "soldier" + String(placenum);
        place.appendChild(soldiersDiv);
    }

    action() {
        let massege = document.getElementById("alerts");
        massege.innerText = "GO TO THE JAIL!"
        setTimeout(function () {
            if (whoIsNow == 0) {
                players[3].setLocation(6);
                players[3].prisoner = true;
            }
            else {
                players[whoIsNow - 1].setLocation(6);
                players[whoIsNow - 1].prisoner = true;
            }
        }, 1500)
    }
}

let places = [new Corner1(),
new City("SYDNEY", 440, "Australy", 120, 350, 160, 220, 280, 350, 400, 650),
new City("MELBOURNE", 560, "Australy", 150, 400, 180, 250, 300, 380, 450, 740),
new Chance(),
new City("TEL AVIV", 750, "Asia", 220, 600, 250, 310, 370, 430, 500, 900),
new Corner2(),
new City("JERUSALEM", 700, "Asia", 350, 600, 350, 600, 900, 1200, 1450, 2000),
new CommunityChest(),
new City("WASHINGTON", 900, "USA", 600, 800, 500, 700, 920, 1100, 1250, 1800),
new City("NEW YORK", 1000, "USA", 700, 1200, 850, 1150, 1320, 1500, 1700, 2900),
new Corner3(),
new City("PARIS", 1000, "EUROPE", 600, 1020, 700, 940, 1100, 1400, 1600, 2250),
new City("BERLIN", 600, "EUROPE", 350, 700, 400, 550, 680, 800, 920, 1500),
new Chance(),
new City("LONDON", 800, "EUROPE", 500, 900, 650, 850, 1020, 1300, 1500, 2100),
new Corner4(),
new City("CAIRO", 500, "Africa", 300, 600, 250, 380, 600, 750, 900, 1300),
new City("JOHANNESBURG", 620, "Africa", 400, 710, 300, 430, 600, 790, 900, 1150),
new CommunityChest(),
new City("MADAGASCAR", 570, "Africa", 340, 650, 380, 500, 670, 780, 910, 1200)
];
let players = [new Player(1), new Player(2), new Player(3), new Player(4)];
let statuses = ["empty", "rent", "house1", "house2", "house3", "house4", "hotel"]
let whoIsNow = 0;
let soldier = [document.createElement('img'), document.createElement('img'), document.createElement('img'), document.createElement('img')]
for (let i = 0; i < 4; i++) {
    soldier[i].src = "../pictures/soldier" + String(i + 1) + ".png";
    soldier[i].className = "soldierImg";
    soldier[i].id = "soldierImg" + String(i);
}

let community_Chests = [new CommunityChests(-450, "YOU DID NOT PAY TAX FOR YOUR MERCHANDISE, YOU HAVE TO PAY 450$"),
new CommunityChests(-1000, "YOU RENOVATED THE HOUSE, PAY 1000$"),
new CommunityChests(-650, "YOU BOUGHT A NEW CAR, PAY 650$"),
new CommunityChests(-200, "YOU DROVE A RED LIGHT, PAY A TOTAL FINE OF 200$")];
let chances = [new Chances(250, "YOU WON THE LOTTERY, GET 250$")];

function GetPlayer() {
    let name = document.getElementById("playerName").value;
    if (name == "") {
        alert("A NAME CAN NOT BE EMPTY");
        return;
    }
    players[whoIsNow].name = name;
    whoIsNow = whoIsNow + 1;
    if (whoIsNow == 4) {
        document.getElementById("alerts").innerHTML = "";
        whoIsNow = 0;
        buildgame()
        return;
    }
    document.getElementById("playerName").value = "";
    let src = "../pictures/soldier" + String(whoIsNow + 1) + ".png"
    document.getElementById("soldier").src = src;
    document.getElementById("playerNumber").innerText = "PLAYER NUMBER " + String(whoIsNow + 1);
}

function buildBoard() {
    for (let i = 0; i < places.length; i++)
        places[i].build(i + 1);
}

function buildPlayers() {
    for (let i = 1; i <= 4; i++) {
        let playerPlace = document.getElementById("player" + String(i));
        let divName = document.createElement('div');
        let img = document.createElement('img');
        img.src = "../pictures/soldier" + String(i) + ".png";
        img.className = "playerSoldier";
        divName.appendChild(img);
        let Name = document.createElement('div');
        Name.innerText = players[i - 1].GetName();
        divName.appendChild(Name);
        divName.className = "playerName";
        playerPlace.appendChild(divName);
        let amount = document.createElement('div');
        amount.innerText = "ROMANING: " + String(players[i - 1].GetRomaning());
        amount.id = "romaning" + String(i);
        playerPlace.appendChild(amount);
    }
}

function buildgame() {
    buildBoard();
    buildPlayers();
    let place0 = document.getElementById("soldier1");
    place0.appendChild(soldier[0]);
    place0.appendChild(soldier[1]);
    place0.appendChild(soldier[2]);
    place0.appendChild(soldier[3]);
}

function play() {
    let massege = document.getElementById("alerts");
    massege.innerHTML = "";
    let num1 = parseInt(Math.random() * 6 + 1);
    let num2 = parseInt(Math.random() * 6 + 1);
    let cube1 = document.getElementById("cube1");
    let cube2 = document.getElementById("cube2");
    cube1.src = "../pictures/cube" + num1 + ".png";
    cube2.src = "../pictures/cube" + num2 + ".png";
    if (players[whoIsNow].freeParking == true) {
        players[whoIsNow].freeParking = false;
        whoIsNow++;
        if (whoIsNow == 4) { whoIsNow = 0 }
        return;
    }
    if (players[whoIsNow].prisoner == true) {
        players[whoIsNow].prisonCounter++;
        if (players[whoIsNow].prisonCounter == 3) {
            players[whoIsNow].prisonCounter = 0;
            players[whoIsNow].prisoner = false;
        }
        whoIsNow++;
        if (whoIsNow == 4) { whoIsNow = 0 }
        return;
    }
    let place = players[whoIsNow].getLocation();
    players[whoIsNow].setLocation(place + num1 + num2);
    places[players[whoIsNow].getLocation() - 1].action();
    whoIsNow++;
    if (whoIsNow == 4) { whoIsNow = 0 }
}

function gameOver() {
    let max = 0;
    let index = -1;
    for (let place = 0; place < places.length; place++) {
        if (places[place].constructor.name == 'City') {
            if (places[place].getOwner() != "")
                players[places[place].getOwner()].setRomaning(places[place].getPrice());
        }
    }
    let game = document.getElementById("container");
    game.innerHTML = "";
    game.style.flexDirection = "column";
    game.style.justifyContent = "center";
    game.style.alignItems = "center";
    for (let i = 0; i < 3; i++) {
        for (let player = 0; player < 4; player++) {
            if (players[player].GetRomaning() > max) {
                max = players[player].GetRomaning();
                index = player;
            }
        }
        let winner = document.createElement('div');
        winner.className = "win";
        winner.innerText = "WINNER #" + (i + 1) + ": " + players[index].GetName();
        players[index].setRomaningTo0();
        max = 0;
        index = -1;
        game.appendChild(winner);
    }
}