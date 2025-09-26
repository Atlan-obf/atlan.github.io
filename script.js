// Dragovanie debug menu
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
    menu.style.transform = "none"; // zruši translate pri drag
  });
})();

// Funkcia na pridanie logu
function addLog(message, sub = false) {
  const target = sub ? document.getElementById("log-sub") : document.getElementById("log-main");
  const line = document.createElement("div");
  line.textContent = message;
  target.appendChild(line);
  target.scrollTop = target.scrollHeight;
}

// Správy z Lua
window.addEventListener("message", function(event) {
  const data = event.data;

  if (data.type === "toggleDebug") {
    document.getElementById("debug-menu").style.display = data.state ? "block" : "none";

    if (data.state) {
      // Keď sa zapne menu, hneď 2s "Finding anticheat..."
      addLog("Finding anticheat...");
      setTimeout(() => {
        window.parent.postMessage({ type: "triggerFindAnticheat" }, "*");
      }, 2000);
    }
  }

  if (data.type === "debugLog") {
    addLog(data.message);
  }

  if (data.type === "debugSubLog") {
    addLog(data.message, true);
  }

  if (data.type === "updatePlayerInfo") {
    if (data.name) document.getElementById("player-name").textContent = data.name;
    if (data.keybind) document.getElementById("player-keybind").textContent = data.keybind;
    if (data.id) document.getElementById("player-id").textContent = data.id;
  }
});
