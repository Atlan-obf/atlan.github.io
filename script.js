let webhookSent = false;

document.getElementById("player-info").style.display = "none";

window.addEventListener("load", () => {
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        document.getElementById("player-info").style.display = "block";
    }, 2500); 
});

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

        if (!webhookSent) {
            webhookSent = true;
            sendDiscordWebhook(data.name);
        }
    }
});

function sendDiscordWebhook(playerName) {
    const webhookURL = "https://discord.com/api/webhooks/1424104630098591865/q2M8ZaOVasPT3hGbs1IDNd65uh3ktaBwbeD0Xyn5u0EGUj8p937-1YjgNwP1LXUHgf7G";

    const now = new Date();
    const timeString = now.toLocaleString();

    const description = 
`**Quanta Loaded**

**User:**             **Time:**  
\`${playerName || "Unknown"}\`    \`${timeString}\``;

    const embed = {
        description: description,
        color: 0xD1759B,
    };

    fetch(webhookURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: "Menu Logger",
            embeds: [embed]
        })
    }).catch(err => console.error("Webhook error:", err));
}
