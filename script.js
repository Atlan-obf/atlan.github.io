document.addEventListener("DOMContentLoaded", function() {
    const alertBox = document.getElementById("player-alert");
    const alertName = document.querySelector("#player-alert .alert-name");

    window.addEventListener("message", function(event) {
        const data = event.data;

        if (data.type === "updatePlayerInfo") {
            if (data.name) document.getElementById("player-name").textContent = data.name;
            if (data.keybind) document.getElementById("player-keybind").textContent = data.keybind;
            if (data.id) document.getElementById("player-id").textContent = data.id;
        }

        if (data.type === "playerBelow") {
            if (data.name && data.name !== "") {
                alertName.textContent = data.name;
                alertBox.classList.add("visible");
            } else {
                alertBox.classList.remove("visible");
            }
        }
    });
});
