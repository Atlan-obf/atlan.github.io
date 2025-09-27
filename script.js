 window.addEventListener("message", function(event) {
    const data = event.data;

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
    
 });


