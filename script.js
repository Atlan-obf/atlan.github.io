// FPS Counter - keep it as N/A for now
// You can enable this later if needed
// let fps = 0;
// let lastTime = performance.now();
// let frameCount = 0;

// function updateFPS() {
//     frameCount++;
//     const currentTime = performance.now();
    
//     if (currentTime - lastTime >= 1000) {
//         fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
//         document.getElementById('fps-value').textContent = fps;
//         frameCount = 0;
//         lastTime = currentTime;
//     }
    
//     requestAnimationFrame(updateFPS);
// }

// Start FPS counter
// updateFPS();

// Loading Animation
window.addEventListener('load', function() {
    setTimeout(() => {
        const loadingOverlay = document.getElementById('loading-overlay');
        loadingOverlay.classList.add('fade-out');
        
        setTimeout(() => {
            loadingOverlay.style.display = 'none';
            // Show welcome notification
            showNotification('Welcome to Quant Control Panel!', 'success');
        }, 500);
    }, 2000);
});

// Notification System
function showNotification(message, type = 'info', duration = 4000) {
    const container = document.getElementById('notifications-container');
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    
    notification.innerHTML = `
        ${message}
        <button class="close-btn" onclick="closeNotification(this)">&times;</button>
    `;
    
    container.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Auto remove
    setTimeout(() => {
        closeNotification(notification.querySelector('.close-btn'));
    }, duration);
}

function closeNotification(btn) {
    const notification = btn.parentElement;
    notification.classList.remove('show');
    setTimeout(() => {
        notification.remove();
    }, 300);
}

// Enhanced Search Function
function performSearch(searchTerm) {
    const term = searchTerm.toLowerCase();
    const navItems = document.querySelectorAll('.nav-item');
    const categoryItems = document.querySelectorAll('.category-item');
    const settingsBoxes = document.querySelectorAll('.settings-box');
    const tabButtons = document.querySelectorAll('.tab-button');
    
    let hasResults = false;
    
    // Search navigation items
    navItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
            item.classList.remove('hidden');
            hasResults = true;
        } else {
            item.classList.add('hidden');
        }
    });
    
    // Search category items
    categoryItems.forEach(item => {
        const text = item.textContent.toLowerCase();
        if (text.includes(term)) {
            item.style.display = 'inline-flex';
            hasResults = true;
        } else {
            item.style.display = 'none';
        }
    });
    
    // Search settings boxes
    settingsBoxes.forEach(box => {
        const text = box.textContent.toLowerCase();
        if (text.includes(term)) {
            box.style.display = 'block';
            hasResults = true;
        } else {
            box.style.display = 'none';
        }
    });
    
    // Search tab buttons
    tabButtons.forEach(tab => {
        const text = tab.textContent.toLowerCase();
        if (text.includes(term)) {
            tab.style.display = 'block';
            hasResults = true;
        } else {
            tab.style.display = 'none';
        }
    });
    
    if (!hasResults && term.length > 0) {
        showNotification('No results found for: ' + searchTerm, 'info');
    }
}

// Navigation functionality
document.addEventListener('DOMContentLoaded', function() {
    // Sidebar navigation
    const navItems = document.querySelectorAll('.nav-item');
    const contentSections = document.querySelectorAll('.content-section');
    
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all content sections
            contentSections.forEach(section => section.classList.remove('active'));
            // Show selected content section
            const targetSection = document.getElementById(`content-${category}`);
            if (targetSection) {
                targetSection.classList.add('active');
                
                // Reset tabs in the new section
                resetTabsInSection(targetSection);
            }
        });
    });
    
    // Tab functionality
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-button')) {
            const tabName = e.target.getAttribute('data-tab');
            const parentSection = e.target.closest('.content-section');
            
            if (parentSection) {
                // Remove active class from all tab buttons in this section
                const tabButtons = parentSection.querySelectorAll('.tab-button');
                tabButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked tab button
                e.target.classList.add('active');
                
                // Hide all tab contents in this section
                const tabContents = parentSection.querySelectorAll('.tab-content');
                tabContents.forEach(content => content.classList.remove('active'));
                
                // Show selected tab content
                const targetTab = parentSection.querySelector(`#tab-${tabName}`);
                if (targetTab) {
                    targetTab.classList.add('active');
                }
            }
        }
    });
    
    // Enhanced Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', function() {
            const searchTerm = this.value;
            
            if (searchTerm.length === 0) {
                // Reset all visibility when search is empty
                navItems.forEach(item => item.classList.remove('hidden'));
                document.querySelectorAll('.category-item').forEach(item => item.style.display = 'inline-flex');
                document.querySelectorAll('.settings-box').forEach(box => box.style.display = 'block');
                document.querySelectorAll('.tab-button').forEach(tab => tab.style.display = 'block');
            } else {
                performSearch(searchTerm);
            }
        });
    }
    
    // Draggable window functionality
    const draggableWindow = document.getElementById('draggable-window');
    const dragHandle = document.getElementById('drag-handle');
    let isDragging = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    
    if (draggableWindow && dragHandle) {
        dragHandle.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', dragMove);
        document.addEventListener('mouseup', dragEnd);
    }
    
    function dragStart(e) {
        initialX = e.clientX - xOffset;
        initialY = e.clientY - yOffset;
        
        if (e.target === dragHandle) {
            isDragging = true;
            draggableWindow.classList.add('dragging');
        }
    }
    
    function dragMove(e) {
        if (isDragging) {
            e.preventDefault();
            currentX = e.clientX - initialX;
            currentY = e.clientY - initialY;
            
            xOffset = currentX;
            yOffset = currentY;
            
            draggableWindow.style.left = currentX + 'px';
            draggableWindow.style.top = currentY + 'px';
        }
    }
    
    function dragEnd() {
        if (isDragging) {
            isDragging = false;
            draggableWindow.classList.remove('dragging');
        }
    }
    
    // Category item click effects
    document.addEventListener('click', function(e) {
        if (e.target.closest('.category-item')) {
            const categoryItem = e.target.closest('.category-item');
            const categoryName = categoryItem.querySelector('span').textContent;
            
            // Remove active from all categories in the same container
            const container = categoryItem.closest('.category-grid');
            container.querySelectorAll('.category-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active to clicked category
            categoryItem.classList.add('active');
            
            // Show notification
            showNotification(`Selected: ${categoryName}`, 'info', 2000);
        }
        
        // Settings box interactions
        if (e.target.closest('.button')) {
            const button = e.target.closest('.button');
            const buttonText = button.textContent;
            showNotification(`Action: ${buttonText}`, 'success', 2000);
        }
        
        // Checkbox interactions
        if (e.target.type === 'checkbox') {
            const label = e.target.closest('label').textContent.trim();
            const isChecked = e.target.checked;
            showNotification(`${label}: ${isChecked ? 'Enabled' : 'Disabled'}`, 'info', 2000);
        }
    });
    
    // Slider functionality
    document.addEventListener('input', function(e) {
        if (e.target.type === 'range') {
            const slider = e.target;
            const valueSpan = slider.parentElement.querySelector('.slider-value');
            if (valueSpan) {
                valueSpan.textContent = slider.value;
            }
            
            // Show notification for slider changes
            const label = slider.parentElement.previousElementSibling;
            if (label) {
                const labelText = label.textContent;
                showNotification(`${labelText}: ${slider.value}`, 'info', 1500);
            }
        }
    });
    
    // Demo: Add new settings box function
    window.addSettingsBox = function(title, items) {
        const container = document.querySelector('.content-section.active .settings-container');
        if (!container) return;
        
        const box = document.createElement('div');
        box.className = 'settings-box';
        
        let itemsHTML = '';
        items.forEach(item => {
            if (item.type === 'checkbox') {
                itemsHTML += `
                    <div class="settings-item">
                        <label class="checkbox-container">
                            <input type="checkbox" ${item.checked ? 'checked' : ''}>
                            <span class="checkmark"></span>
                            ${item.label}
                        </label>
                    </div>
                `;
            } else if (item.type === 'slider') {
                itemsHTML += `
                    <div class="settings-item">
                        <label for="${item.id}">${item.label}</label>
                        <div class="slider-container">
                            <input type="range" id="${item.id}" min="${item.min}" max="${item.max}" value="${item.value}" class="slider">
                            <span class="slider-value">${item.value}</span>
                        </div>
                    </div>
                `;
            } else if (item.type === 'button') {
                itemsHTML += `
                    <div class="settings-item">
                        <button class="button ${item.style || 'primary'}">${item.label}</button>
                    </div>
                `;
            }
        });
        
        box.innerHTML = `
            <h4>${title}</h4>
            ${itemsHTML}
        `;
        
        container.appendChild(box);
        showNotification(`Added new settings box: ${title}`, 'success');
    };
    
    // Demo: Create sample box (you can call this from console)
    window.createDemoBox = function() {
        addSettingsBox('Demo Settings', [
            { type: 'checkbox', label: 'Enable demo feature', checked: true },
            { type: 'slider', label: 'Demo value', id: 'demo-slider', min: 0, max: 100, value: 50 },
            { type: 'button', label: 'Demo Action', style: 'primary' }
        ]);
    };
    
    // Initialize user info
    updateUserInfo();
});

// Helper function to reset tabs in a section
function resetTabsInSection(section) {
    const tabButtons = section.querySelectorAll('.tab-button');
    const tabContents = section.querySelectorAll('.tab-content');
    
    if (tabButtons.length > 0) {
        // Remove active from all tabs
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        // Activate first tab
        tabButtons[0].classList.add('active');
        if (tabContents[0]) {
            tabContents[0].classList.add('active');
        }
    }
}

// Update user info
function updateUserInfo() {
    const username = document.getElementById('username');
    const status = document.getElementById('status');
    
    if (username) {
        // You can customize this or get from localStorage/API
        username.textContent = 'Player';
    }
    
    if (status) {
        status.textContent = 'Online';
        status.style.color = 'hsl(120, 100%, 50%)';
    }
}

// FPS simulation disabled - keeping N/A
// You can enable this later if needed
// setInterval(() => {
//     const baseFPS = 60;
//     const variation = Math.random() * 10 - 5; // -5 to +5 variation
//     const simulatedFPS = Math.max(30, Math.min(120, baseFPS + variation));
    
//     // Only update if significantly different to avoid constant changes
//     const currentDisplayedFPS = parseInt(document.getElementById('fps-value').textContent);
//     if (Math.abs(simulatedFPS - currentDisplayedFPS) > 2) {
//         document.getElementById('fps-value').textContent = Math.round(simulatedFPS);
        
//         // Color coding for FPS
//         const fpsElement = document.getElementById('fps-value');
//         if (simulatedFPS >= 50) {
//             fpsElement.style.color = 'hsl(120, 100%, 50%)'; // Green
//         } else if (simulatedFPS >= 30) {
//             fpsElement.style.color = 'hsl(60, 100%, 50%)'; // Yellow
//         } else {
//             fpsElement.style.color = 'hsl(0, 100%, 50%)'; // Red
//         }
//     }
// }, 100);

// Keyboard shortcuts
document.addEventListener('keydown', function(e) {
    // ESC to close (you can modify this behavior)
    if (e.key === 'Escape') {
        console.log('ESC pressed - you can add close functionality here');
    }
    
    // Ctrl+F to focus search
    if (e.ctrlKey && e.key === 'f') {
        e.preventDefault();
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.focus();
        }
    }
});
