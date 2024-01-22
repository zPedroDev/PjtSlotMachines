let spinning = false;
let coins = 100;

function spinReels() {
    if (spinning || coins <= 0) {
        return;
    }

    const betAmount = parseInt(document.getElementById("betAmount").value);

    if (isNaN(betAmount) || betAmount <= 0 || betAmount > coins) {
        alert("Insira um valor de aposta válido.");
        return;
    }

    coins -= betAmount;
    updateCoinCount();
    spinning = true;

    const reel1 = document.getElementById("reel1");
    const reel2 = document.getElementById("reel2");
    const reel3 = document.getElementById("reel3");

    const spins = 3;
    let spinCount = 0;

    const spinInterval = setInterval(() => {
        reel1.style.backgroundImage = `url('images/${getRandomImage()}')`;
        reel2.style.backgroundImage = `url('images/${getRandomImage()}')`;
        reel3.style.backgroundImage = `url('images/${getRandomImage()}')`;

        spinCount++;

        if (spinCount === spins) {
            clearInterval(spinInterval);
            spinning = false;

            const result = checkWin(reel1.style.backgroundImage, reel2.style.backgroundImage, reel3.style.backgroundImage, betAmount);
            updateResult(result);
            updateCoinCount();
        }
    }, 200);
}

function checkWin(reel1, reel2, reel3, betAmount) {
    const reels = [document.getElementById("reel1"), document.getElementById("reel2"), document.getElementById("reel3")];

    if (reel1 === reel2 && reel2 === reel3) {
        reels.forEach(reel => reel.classList.add("winning"));

        setTimeout(() => {
            reels.forEach(reel => reel.classList.remove("winning"));
        }, 1000);

        const winnings = betAmount * getMultiplier();
        coins += winnings;
        return `Parabéns! Você ganha ${winnings} moedas!`;
    } else {
        return "Desculpe, tente novamente!";
    }
}

function getMultiplier() {
    const betAmount = parseInt(document.getElementById("betAmount").value);
    return betAmount * 0.3;
}

function getRandomImage() {
    const images = ["cherry.png", "lemon.png", "orange.png"];
    return images[Math.floor(Math.random() * images.length)];
}

function updateCoinCount() {
    document.getElementById("coinCount").innerText = coins;
}

function updateResult(result) {
    document.getElementById("result").innerText = result;
}



function showProfile() {
    document.getElementById("gameContainer").style.display = "none";
    document.getElementById("profileContainer").style.display = "block";
}

function hideProfile() {
    document.getElementById("profileContainer").style.display = "none";
    document.getElementById("gameContainer").style.display = "block";
}

function changeProfile() {
    const newName = prompt("Digite o novo nome:");

    if (newName !== null) {
        updateProfile(newName);
    }
}

function updateProfile(name) {
    const userName = document.getElementById("userNameProfile");
    const userNameGame = document.getElementById("userName");

    userName.innerText = name;
    userNameGame.innerText = name;
}