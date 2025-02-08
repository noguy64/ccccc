// Variables to store selected settings before saving
const defaultColorTheme = '#1e90ff'; // Default to blue
let selectedColorTheme = defaultColorTheme; // Initialize with default
let selectedFavicon = 'default'; // Default favicon

// Function to switch between screens
function showScreen(screenId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        if (screen.id === screenId) {
            screen.classList.add('active');
        } else {
            screen.classList.remove('active');
        }
    });
    // Smooth scroll to top
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Function to highlight active navigation link
function setActiveNav(navId) {
    const navLinks = document.querySelectorAll('.menu-options a');
    navLinks.forEach(link => {
        link.classList.remove('active-nav');
    });
    document.getElementById(navId).classList.add('active-nav');
}

// Function to preview color theme
function previewColorTheme(colorValue) {
    const root = document.documentElement;
    root.style.setProperty('--primary-color', colorValue);
    root.style.setProperty('--nav-hover-color', colorValue);
    selectedColorTheme = colorValue; // Update the selected value
}

// Function to preview favicon
function previewFavicon(iconName) {
    const favicon = document.getElementById('favicon');
    const favicons = {
        'default': 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAE0lEQVQoU2O0tLSU1LhUBgA+TABN2s8KzAAAAABJRU5ErkJggg==',
        'school': 'data:image/png;base64,...',   // Replace with actual Base64 data
        'work': 'data:image/png;base64,...',     // Replace with actual Base64 data
        'project': 'data:image/png;base64,...',  // Replace with actual Base64 data
        'news': 'data:image/png;base64,...',     // Replace with actual Base64 data
        'calculator': 'data:image/png;base64,...'// Replace with actual Base64 data
    };
    const titles = {
        'default': 'Glider',
        'school': 'School Portal',
        'work': 'Work Dashboard',
        'project': 'Project Manager',
        'news': 'News',
        'calculator': 'Calculator'
    };
    favicon.href = favicons[iconName];
    document.title = titles[iconName];
    selectedFavicon = iconName; // Update the selected value
}

// Function to save settings
function saveSettings() {
    // Save color theme
    localStorage.setItem('gliderColorTheme', selectedColorTheme);
    // Save favicon
    localStorage.setItem('gliderFavicon', selectedFavicon);

    // Show toast notification
    showToast();
}

// Function to display toast notification
function showToast() {
    const toast = document.getElementById('toast');
    toast.className = 'toast show';
    setTimeout(function () {
        toast.className = toast.className.replace('show', '');
    }, 3000);
}

// Function to perform search
function performSearch() {
    const query = document.getElementById('search-input').value.trim();
    if (query.includes('.')) {
        window.location.href = 'http://' + query;
    } else {
        window.location.href = 'https://www.google.com/search?q=' + encodeURIComponent(query);
    }
    return false; // Prevent form submission
}

// Function to open Glider in about:blank
function openGliderInAboutBlank() {
    const gliderContent = document.documentElement.outerHTML;
    const newWindow = window.open('about:blank', '_blank');
    newWindow.document.open();
    newWindow.document.write(gliderContent);
    newWindow.document.close();
}

// Page Cloaker Function
function cloakPage() {
    // Change the page title and icon to disguise the page
    document.title = "Educational Resource";
    previewFavicon('school');
    // Optionally, redirect to an educational website
    // window.location.href = "https://www.khanacademy.org";
}

// Event listener for the Cloak Page action
document.addEventListener('keydown', function(e) {
    // Press 'C' to trigger the cloaker
    if (e.key.toLowerCase() === 'c') {
        cloakPage();
    }
});

// Load settings on page load
document.addEventListener('DOMContentLoaded', () => {
    // Apply the default blue theme on first load
    previewColorTheme(defaultColorTheme);
    document.getElementById('color-select').value = defaultColorTheme;

    // Check if a saved color theme exists
    if (localStorage.getItem('gliderColorTheme')) {
        selectedColorTheme = localStorage.getItem('gliderColorTheme');
        // Apply the saved color theme
        previewColorTheme(selectedColorTheme);
        document.getElementById('color-select').value = selectedColorTheme;
    }

    // Check if a saved favicon exists
    if (localStorage.getItem('gliderFavicon')) {
        selectedFavicon = localStorage.getItem('gliderFavicon');
        // Apply the saved favicon
        previewFavicon(selectedFavicon);
        document.getElementById('favicon-select').value = selectedFavicon;
    }

    // Set up event listeners for settings changes
    document.getElementById('color-select').addEventListener('change', function() {
        previewColorTheme(this.value);
    });

    document.getElementById('favicon-select').addEventListener('change', function() {
        previewFavicon(this.value);
    });

    // Set the active navigation link to 'Home' on page load
    setActiveNav('nav-home');

    // Update footer year
    document.getElementById('footer-year').textContent = new Date().getFullYear();
});

document.addEventListener("DOMContentLoaded", function () {
    var sidebar = document.createElement('div');
    var search = document.createElement('div');
    sidebar.innerHTML = `
    <nav class="menu-container">
        <span class="menu-title" onclick="showScreen('home-screen'); setActiveNav('nav-home')">
            <i class="fas fa-paper-plane"></i> Glider
        </span>
        <div class="menu-options">
            <a href="/" id="nav-home" setActiveNav('nav-home')" aria-label="Home">
                <i class="fas fa-home"></i> Home
            </a>
            <a id="nav-apps" onclick="showScreen('apps-screen'); setActiveNav('nav-apps')" aria-label="Apps">
                <i class="fas fa-th"></i> Apps
            </a>
            <a id="nav-games" onclick="showScreen('games-screen'); setActiveNav('nav-games')" aria-label="Games">
                <i class="fas fa-gamepad"></i> Games
            </a>
            <a id="nav-settings" onclick="showScreen('settings-screen'); setActiveNav('nav-settings')" aria-label="Settings">
                <i class="fas fa-cog"></i> Settings
            </a>
        </div>
    </nav>
    `;
    document.body.appendChild(sidebar);
    document.body.appendChild(search);
});
