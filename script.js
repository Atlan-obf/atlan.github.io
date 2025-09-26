let isDragging = false;
let dragOffset = { x: 0, y: 0 };
const debugMenu = document.getElementById('debug-menu');
const debugHeader = document.getElementById('debug-header');

debugHeader.addEventListener('mousedown', (e) => {
    isDragging = true;
    const rect = debugMenu.getBoundingClientRect();
    dragOffset.x = e.clientX - rect.left;
    dragOffset.y = e.clientY - rect.top;
    debugMenu.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    debugMenu.style.left = (e.clientX - dragOffset.x) + 'px';
    debugMenu.style.top = (e.clientY - dragOffset.y) + 'px';
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    debugMenu.style.cursor = 'grab';
});

// Debug Menu Controls
document.getElementById('close-btn').addEventListener('click', () => {
    debugMenu.style.display = 'none';
});

document.getElementById('minimize-btn').addEventListener('click', () => {
    const content = document.getElementById('debug-content');
    const footer = document.getElementById('debug-footer');
    
    if (content.style.display === 'none') {
        content.style.display = 'block';
        footer.style.display = 'flex';
        debugMenu.style.height = '400px';
    } else {
        content.style.display = 'none';
        footer.style.display = 'none';
        debugMenu.style.height = '30px';
    }
});

// Export to Lua functionality
document.getElementById('export-btn').addEventListener('click', () => {
    const playerName = document.getElementById('debug-player-name').textContent;
    const playerId = document.getElementById('debug-player-id').textContent;
    const serverIp = document.getElementById('debug-server-ip').textContent;
    const serverBuild = document.getElementById('debug-server-build').textContent;
    const anticheatStatus = document.getElementById('anticheat-status').textContent;
    
    const luaCode = `-- Debug Information Export
local debugInfo = {
    playerName = "${playerName}",
    playerId = ${playerId},
    serverIp = "${serverIp}",
    serverBuild = "${serverBuild}",
    anticheatStatus = "${anticheatStatus}",
    exportTime = "${new Date().toISOString()}"
}

-- Print debug information
for k, v in pairs(debugInfo) do
    print(k .. ": " .. tostring(v))
end`;

    // Create a download link for the Lua file
    const blob = new Blob([luaCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'debug_export.lua';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
});

// Message listener for updates from LUA
window.addEventListener("message", function(event) {
    const data = event.data;

    if (data.type === "updatePlayerInfo") {
        // Update player info box
        if (data.name) {
            document.getElementById("player-name").textContent = data.name;
            document.getElementById("debug-player-name").textContent = data.name;
        }
        if (data.keybind) {
            document.getElementById("player-keybind").textContent = data.keybind;
            document.getElementById("debug-keybind").textContent = data.keybind;
        }
        if (data.id) {
            document.getElementById("player-id").textContent = data.id;
            document.getElementById("debug-player-id").textContent = data.id;
        }
        
        // Show debug menu if it's hidden
        if (debugMenu.style.display === 'none') {
            debugMenu.style.display = 'block';
        }
    }
    
    // Handle anticheat detection updates
    if (data.type === "anticheatUpdate") {
        const statusElement = document.getElementById("anticheat-status");
        if (data.detected) {
            statusElement.textContent = 'Antichast Detected: "' + data.resource + '"';
            statusElement.className = 'anticheat-status anticheat-detected';
        } else {
            statusElement.textContent = 'No antichast detected!';
            statusElement.className = 'anticheat-status no-antichast';
        }
    }
    
    // Handle resource list updates
    if (data.type === "resourceList") {
        const resourceList = document.getElementById("resource-list");
        resourceList.innerHTML = '';
        
        if (data.resources && data.resources.length > 0) {
            data.resources.forEach(resource => {
                const item = document.createElement('div');
                item.className = 'debug-item';
                item.innerHTML = `<span>${resource.name}</span><span class="debug-value">${resource.status}</span>`;
                resourceList.appendChild(item);
            });
        } else {
            resourceList.innerHTML = '<div class="debug-item"><span>No resources detected</span></div>';
        }
    }
    
    // Handle server information updates
    if (data.type === "serverInfo") {
        if (data.ip) {
            document.getElementById("debug-server-ip").textContent = data.ip;
        }
        if (data.build) {
            document.getElementById("debug-server-build").textContent = data.build;
        }
    }
});

// Helper functions for demonstration
function GetPlayerServerId(playerId) {
    // This would be provided by your game environment
    return Math.floor(Math.random() * 100) + 1;
}

function PlayerId() {
    // This would be provided by your game environment
    return 1;
}

// Simulate receiving data (for demonstration purposes)
setTimeout(() => {
    // Simulate initial data
    window.dispatchEvent(new MessageEvent('message', {
        data: {
            type: "updatePlayerInfo",
            name: "sibe ti uz?",
            keybind: "PageUp",
            id: GetPlayerServerId(PlayerId()) || 123
        }
    }));
    
    // Simulate server info
    window.dispatchEvent(new MessageEvent('message', {
        data: {
            type: "serverInfo",
            ip: "127.0.0.1",
            build: "Idk neviem"
        }
    }));
    
    // Simulate anticheat detection
    window.dispatchEvent(new MessageEvent('message', {
        data: {
            type: "anticheatUpdate",
            detected: true,
            resource: "resource"
        }
    }));
}, 1000);
