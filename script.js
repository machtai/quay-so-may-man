let container = document.querySelector(".container");
let btn = document.getElementById("spin");
let playerNameInput = document.getElementById("player-name");
let addPlayerButton = document.getElementById("add-player");
let deletePlayerButton = document.getElementById("delete-player");
let deleteAllButton = document.getElementById("delete-all");
let playerList = document.getElementById("player-list");
let players = [];
let isSpinning = false;
let colors = ['#3f51b5', '#ff9800', '#e91e63', '#4caf50', '#009688', '#795548', '#9c27b0', '#f44336', '#ffeb3b', '#00bcd4'];

// Thêm người chơi vào danh sách
addPlayerButton.onclick = function () {
    let playerName = playerNameInput.value.trim();
    if (playerName) {
        players.push(playerName);
        updatePlayerList();
        updateWheel();
        playerNameInput.value = "";
    }
};

// Xóa người chơi cuối cùng trong danh sách
deletePlayerButton.onclick = function () {
    if (players.length > 0) {
        players.pop();
        updatePlayerList();
        updateWheel();
    }
};

// Xóa tất cả người chơi
deleteAllButton.onclick = function () {
    players = [];
    updatePlayerList();
    updateWheel();
};

// Cập nhật danh sách hiển thị người chơi
function updatePlayerList() {
    playerList.innerHTML = "";
    players.forEach((player, index) => {
        let li = document.createElement("li");
        li.textContent = `${index + 1}: ${player}`;
        playerList.appendChild(li);
    });
}

// Cập nhật tên người chơi trên vòng quay
function updateWheel() {
    container.innerHTML = ""; // Xóa vòng quay cũ
    let anglePerPlayer = 360 / players.length;
    players.forEach((player, index) => {
        let playerDiv = document.createElement("div");
        playerDiv.textContent = player;
        playerDiv.style.backgroundColor = colors[index % colors.length];
        playerDiv.style.transform = `rotate(${index * anglePerPlayer}deg)`;
        playerDiv.style.height = "50%";
        playerDiv.style.width = "200px";
        playerDiv.style.position = "absolute";
        playerDiv.style.clipPath = "polygon(100% 0, 50% 100%, 0 0)";
        playerDiv.style.transformOrigin = "bottom";
        playerDiv.style.textAlign = "center";
        playerDiv.style.display = "flex";
        playerDiv.style.alignItems = "center";
        playerDiv.style.justifyContent = "center";
        playerDiv.style.left = "135px";
        playerDiv.style.fontSize = "20px";
        playerDiv.style.fontWeight = "bold";
        playerDiv.style.color = "#fff";
        container.appendChild(playerDiv);
    });
}

// Xử lý khi nhấn Spin
btn.onclick = function () {
    if (isSpinning || players.length < 1) return;

    isSpinning = true;
    const totalSpins = 5; // Số vòng quay trước khi dừng
    const winnerIndex = players.length > 3 ? 3 : Math.floor(Math.random() * players.length); // Người chơi thứ 4 luôn thắng
    const degreesPerPlayer = 360 / players.length;
    const targetDegrees = (360 - (degreesPerPlayer * winnerIndex)) + (totalSpins * 360);

    container.style.transition = 'transform 5s ease-out';
    container.style.transform = `rotate(${targetDegrees}deg)`;

    setTimeout(() => {
        alert(`${players[winnerIndex]} là người thắng!`);
        isSpinning = false;
    }, 5000); // Thời gian xoay là 5 giây
};

// Hiển thị vòng quay mặc định với 10 màu khi chưa có người chơi
function initDefaultWheel() {
    for (let i = 0; i < 10; i++) {
        let playerDiv = document.createElement("div");
        playerDiv.style.backgroundColor = colors[i];
        playerDiv.style.transform = `rotate(${i * 36}deg)`; // Mỗi màu chiếm 36 độ (360/10)
        playerDiv.style.height = "50%";
        playerDiv.style.width = "200px";
        playerDiv.style.position = "absolute";
        playerDiv.style.clipPath = "polygon(100% 0, 50% 100%, 0 0)";
        playerDiv.style.transformOrigin = "bottom";
        playerDiv.style.left = "135px";
        container.appendChild(playerDiv);
    }
}

initDefaultWheel(); // Khởi tạo vòng quay mặc định
