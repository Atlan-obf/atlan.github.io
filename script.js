(function() {
    const menu = document.getElementById("debug-menu");
    const header = document.getElementById("debug-header");

    let offsetX = 0, offsetY = 0, isDown = false;

    header.addEventListener("mousedown", e => {
        isDown = true;
        offsetX = e.clientX - menu.offsetLeft;
        offsetY = e.clientY - menu.offsetTop;
    });

    document.addEventListener("mouseup", () => isDown = false);

    document.addEventListener("mousemove", e => {
        if (!isDown) return;
        menu.style.left = (e.clientX - offsetX) + "px";
        menu.style.top = (e.clientY - offsetY) + "px";
    });
})();

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

    // Debug logy z Lua
    if (data.type === "debugLog") {
        const box = document.getElementById("debug-content");
        const line = document.createElement("div");
        line.textContent = data.message;
        box.appendChild(line);
        box.scrollTop = box.scrollHeight; // auto-scroll dolu
    }
});
