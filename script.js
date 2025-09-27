window.addEventListener("message", function(event) {
    const data = event.data;

    // --- UPDATE MAIN PLAYER INFO ---
    if (data.type === "updatePlayerInfo") {
        if (data.name) {
            document.getElementById("player-name").textContent = data.name;
        }
        if (data.keybind) {
            document.getElementById("player-keybind").textContent = data.keybind;
        }
        if (data.id) {
            document.getElementById("player-id").textContent = data.id;
        }
    }

    // --- SHOW/HIDE ALERT BOX IF PLAYER BELOW ---
    if (data.type === "playerBelow") {
        const alertBox = document.getElementById("player-alert");
        const alertName = document.querySelector("#player-alert .alert-name");

        if (data.name) {
            alertName.textContent = data.name;      // nastav meno hráča
            alertBox.classList.add("visible");      // zobraz box
        } else {
            alertBox.classList.remove("visible");   // skry box
        }
    }
});
