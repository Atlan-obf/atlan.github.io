window.addEventListener("message", function(event) {
    const data = event.data;

    if (data.type === "updatePlayerInfo") {
        if (data.name) document.getElementById("player-name").textContent = data.name;
        if (data.keybind) document.getElementById("player-keybind").textContent = data.keybind;
        if (data.id) document.getElementById("player-id").textContent = data.id;
    }

    if (data.type === "debugLog") {
        const debugContent = document.getElementById("debug-content");
        let p = document.createElement("p");
        p.textContent = "> " + data.message;
        if (data.level) p.classList.add(data.level); 
        debugContent.appendChild(p);
        debugContent.scrollTop = debugContent.scrollHeight;
    }

    if (data.type === "toggleUI") {
        const dbg = document.getElementById("debug-window");
        if (data.visible) {
            dbg.style.display = "block";
        } else {
            dbg.style.display = "none";
        }
    }
});
