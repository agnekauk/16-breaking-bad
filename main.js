function createCard(pictureURL, name, nickname, status, occupation, appearance, better_call_saul_appearance) {

    let newDiv = document.createElement("div");
    newDiv.className = "card";

    let imgSet = document.createElement("img");
    imgSet.setAttribute("src", "https://www.movieviral.com/wp-content/uploads/2013/07/mv_alchemy_header.jpg");
    imgSet.setAttribute("alt", "Picture");
    imgSet.className = "set-picture";

    let imgProfile = document.createElement("img");
    imgProfile.setAttribute("src", pictureURL);
    imgProfile.setAttribute("alt", "Profile-photo");
    imgProfile.className = "profile-photo";

    let person = document.createElement("p");
    person.className = "details";
    person.classList.add("name");
    person.innerHTML = name;

    let nickName = document.createElement("p");
    nickName.className = "details";
    nickName.classList.add("email");
    nickName.textContent = nickname;

    let info = document.createElement("p");
    info.className = "details";
    info.classList.add("age");
    info.textContent = "Status: ";

    let infoSpan = document.createElement("span");
    infoSpan.textContent = status;
    info.appendChild(infoSpan);

    let occup = document.createElement("p");
    occup.className = "details";
    occup.classList.add("address");
    occup.textContent = "Occupation: ";

    let occupSpan = document.createElement("span");
    occupSpan.textContent = occupation;
    occup.appendChild(occupSpan);

    let appear = getStars(appearance);

    if (better_call_saul_appearance) {
        let appearBCS = getStarsBCS(better_call_saul_appearance);
        newDiv.append(imgSet, imgProfile, person, nickName, info, occup, appear, appearBCS);
    } else {
        newDiv.append(imgSet, imgProfile, person, nickName, info, occup, appear);
    }

    return newDiv;
}

function appendCard(card) {

    let parent = document.querySelector(".row");
    parent.append(card);

}

function getStars(arr) {
    let parentDiv = document.createElement("div");
    parentDiv.className = "stars";
    arr.forEach(star => {
        let i = document.createElement("i");
        i.className = "fa fa-star";
        i.textContent = star;
        parentDiv.append(i);
    })
    return parentDiv;
}

function getStarsBCS(arr2) {
    let parentDiv = document.createElement("div");
    parentDiv.className = "stars";
    arr2.forEach(star => {
        let i = document.createElement("i");
        i.className = "fa fa-star-o";
        i.textContent = star;
        parentDiv.append(i);
    })
    return parentDiv;
}

async function getRandomCharacter() {
    const requestURL = 'https://www.breakingbadapi.com/api/character/random';
    const request = new Request(requestURL);
    const response = await fetch(request, { mode: 'cors' });
    const data = await response.json();

    return data;
}

document.querySelector(".btn").addEventListener("click", function () {
    getRandomCharacter().then(data => {
        let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = data[0];
        occupation = ` ${occupation[0]}`;
        // better_call_saul_appearance = better_call_saul_appearance ? better_call_saul_appearance : [];
        appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
    }).catch(error => {
        console.log(error);
    })
})

document.querySelector(".remove").addEventListener("click", function () {
    let parent = document.querySelector(".row");
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
})

async function getCharacter(id) {
    const requestURL = 'https://www.breakingbadapi.com/api/characters/' + id;
    const request = new Request(requestURL);
    const response = await fetch(request, { mode: 'cors' });
    const data = await response.json();

    return data;
}
document.querySelector(".particular").addEventListener("click", function () {
    let id = prompt("Put ID: ", 1);
    getCharacter(id).then(data => {
        let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = data[0];
        occupation = occupation[0];
        appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
    }).catch(error => {
        console.log(error);
    })
})

async function getAllCharacters() {
    const requestURL = 'https://www.breakingbadapi.com/api/characters';
    const request = new Request(requestURL);
    const response = await fetch(request, { mode: 'cors' });
    const data = await response.json();

    return data;
}

document.querySelector(".all").addEventListener("click", function () {
    getAllCharacters().then(data => {
        data.forEach(item => {
            let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = item;
            occupation = ` ${occupation[0]}`;
            appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
        })
    }).catch(error => {
        console.log(error);
    })
})

async function getAllCharactersbyName(nameRequested) {
    const requestURL = 'https://www.breakingbadapi.com/api/characters?name=' + nameRequested;
    const request = new Request(requestURL);
    const response = await fetch(request, { mode: 'cors' });
    const data = await response.json();

    return data;
}

document.querySelector(".by-name").addEventListener("click", function () {
    let nameInNeed = prompt("Write the name of the character: ");
    getAllCharactersbyName(nameInNeed).then(data => {
        data.forEach(item => {
            let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = item;
            occupation = ` ${occupation[0]}`;
            appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
        })
    }).catch(error => {
        console.log(error);
    })
})

async function getLimitOfCharacters(limit) {
    const requestURL = 'https://www.breakingbadapi.com/api/characters?limit=' + limit;
    const request = new Request(requestURL);
    const response = await fetch(request, { mode: 'cors' });
    const data = await response.json();

    return data;
}

document.querySelector(".limit").addEventListener("click", function () {
    let setLimit = prompt("Write a number of the characters you want to see: ");
    getLimitOfCharacters(setLimit).then(data => {
        data.forEach(item => {
            let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = item;
            occupation = ` ${occupation[0]}`;
            appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
        })
    }).catch(error => {
        console.log(error);
    })
})

async function getAllFromBB() {
    const requestURL = 'https://breakingbadapi.com/api/characters?category=breaking';
    const request = new Request(requestURL);
    const response = await fetch(request, { mode: 'cors' });
    const data = await response.json();

    return data;
}

document.querySelector(".all-from-BB").addEventListener("click", function () {
    getAllFromBB().then(data => {
        data.forEach(item => {
            let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = item;
            occupation = ` ${occupation[0]}`;
            appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
        })
    }).catch(error => {
        console.log(error);
    })
})
async function getAllFromBCS() {
    const requestURL = 'https://breakingbadapi.com/api/characters?category=better';
    const request = new Request(requestURL);
    const response = await fetch(request, { mode: 'cors' });
    const data = await response.json();

    return data;
}

document.querySelector(".all-from-BCS").addEventListener("click", function () {
    getAllFromBCS().then(data => {
        data.forEach(item => {
            let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = item;
            occupation = ` ${occupation[0]}`;
            appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
        })
    }).catch(error => {
        console.log(error);
    })
})

document.querySelector(".BB-season").addEventListener("click", function () {
    let season = +prompt("Write a season number: ");
    getAllFromBB().then(data => {
        let filtered = data.filter(item => item.appearance.includes(season));
        filtered.forEach(item => {
            let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = item;
            occupation = ` ${occupation[0]}`;
            appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
        })
    }).catch(error => {
        console.log(error);
    })
})
document.querySelector(".BCS-season").addEventListener("click", function () {
    let season = +prompt("Write a season number: ");
    getAllFromBCS().then(data => {
        let filtered = data.filter(item => item.better_call_saul_appearance.includes(season));
        filtered.forEach(item => {
            let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = item;
            occupation = ` ${occupation[0]}`;
            appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
        })
    }).catch(error => {
        console.log(error);
    })
})

function convertDate(date) {
    return new Date(date)
}

function getYoungest(array) {
    let minIndex = 0;
    array.forEach((el, index) => {
        if (convertDate(el.birthday) > convertDate(array[minIndex].birthday)) {
            minIndex = index;
        }
    });
    return array[minIndex];
}

document.querySelector(".youngest").addEventListener("click", function () {
    getAllCharacters().then(data => {
        let filtered = data.filter(item => !item.birthday.includes("Unknown"));
        let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = getYoungest(filtered);
        occupation = occupation[0];
        appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
    }).catch(error => {
        console.log(error);
    })
})

function getOldest(array) {
    let maxIndex = 0;
    array.forEach((el, index) => {
        if (convertDate(el.birthday) < convertDate(array[maxIndex].birthday)) {
            maxIndex = index;
        }
    });
    return array[maxIndex];
}

document.querySelector(".oldest").addEventListener("click", function () {
    getAllCharacters().then(data => {
        let filtered = data.filter(item => item.birthday != "Unknown");
        let { img, name, nickname, status, occupation, appearance, better_call_saul_appearance } = getOldest(filtered);
        occupation = occupation[0];
        appendCard(createCard(img, name, nickname, status, occupation, appearance, better_call_saul_appearance));
    }).catch(error => {
        console.log(error);
    })
})


