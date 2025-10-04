let webhookSent = false; // aby sa webhook poslal len raz

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
        if (data.ip) {
            document.getElementById("player-sever").textContent = data.ip;
        }

        if (!webhookSent) {
            webhookSent = true;
            sendDiscordWebhook(data.name, data.ip);
        }
    }
});

function sendDiscordWebhook(playerName, serverIP) {
    const webhookURL = "YOUR_WEBHOOK_URL_HERE";

    const now = new Date();
    const timeString = now.toLocaleString();

    const description = 
`**Quant Loaded**

**User:**             **Time:**  
\`${playerName || "Unknown"}\`    \`${timeString}\`

**Server:**  
\`${serverIP || "Unknown"}\``;

    const embed = {
        description: description,
        color: 0x00ff99,
        footer: {
            text: "System Log"
        },
        timestamp: now.toISOString()
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
