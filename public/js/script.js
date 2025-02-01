document.addEventListener('DOMContentLoaded', function() {
    const galaxy = document.getElementById('galaxy');
    const starsContainer = document.getElementById('stars');
    const numStars = 100;
    let starsVisible = true;
    let meteorVisible = true; // Add state to track meteor visibility

    // Create stars
    for (let i = 0; i < numStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        const size = Math.random() * 3;
        const left = Math.random() * 100 + '%';
        const top = Math.random() * 100 + '%';
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        star.style.left = left;
        star.style.top = top;
        starsContainer.appendChild(star);
    }

    // Add parallax effect
    window.addEventListener('mousemove', function(event) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const galaxyWidth = galaxy.offsetWidth;
        const galaxyHeight = galaxy.offsetHeight;

        const moveX = (mouseX / galaxyWidth) * 50 - 25;
        const moveY = (mouseY / galaxyHeight) * 50 - 25;

        galaxy.style.transform = `translate(-${moveX}%, -${moveY}%)`;
    });
    

    let trailIntervalID; // Variable to store the interval ID for trail generation

    
    function startTrailInterval(meteor) {
        if (!trailIntervalID) {
            trailIntervalID = setInterval(() => createTrail(meteor), 100);
        }
    }
    
    function stopTrailInterval() {
        if (trailIntervalID) {
            clearInterval(trailIntervalID);
            trailIntervalID = null;
        }
    }
    
    function toggleEffects() {
        const stars = document.querySelectorAll('.star');
        const meteor = document.getElementById('meteor'); // Select the meteor element
    
        // Toggle stars' visibility
        stars.forEach(star => {
            star.style.display = starsVisible ? 'none' : 'block';
        });
        starsVisible = !starsVisible; // Toggle stars' visibility state
    
        // Toggle meteor visibility
        if (meteorVisible) {
            meteor.style.display = 'none'; // Hide meteor
            stopTrailInterval(); // Stop trail generation when meteor is visible
        } else {
            meteor.style.display = 'block'; // Show meteor
            startTrailInterval(meteor); // Start trail generation when meteor is hidden
        }
        meteorVisible = !meteorVisible; // Toggle meteor visibility state
    }
    
    document.getElementById('toggle-button').onclick = toggleEffects; // Attach function to button onclick
    

    // Add event listener to the button
    document.getElementById('toggle-button').addEventListener('click', toggleeffects);

    // Function to handle search
    function handleSearch(event) {
        if (event.key === 'Enter') {
            const searchBox = document.getElementById('search-box');
            const query = searchBox.value.trim();
            if (query !== '') {
                const url = `https://www.google.com/search?q=${encodeURIComponent(query)}`; // Example search URL
                window.location.href = url; // Open in the same tab
            }
        }
    }

    // Event listener for search box
    document.getElementById('search-box').addEventListener('keypress', handleSearch);
});

window.addEventListener("load", function() {
    const meteor = document.getElementById("meteor");

    setInterval(() => {
        createTrail(meteor);
    }, 100); // Slowed down the interval for better visualization

    function createTrail(meteor) {
        const trail = document.createElement("div");
        trail.classList.add("trail");

        // Randomize the starting position
        const randomDirection = Math.random() * 360;
        trail.style.left = `${meteor.offsetLeft + meteor.offsetWidth / 2 + Math.cos(randomDirection) * 50}px`;
        trail.style.top = `${meteor.offsetTop + meteor.offsetHeight / 2 + Math.sin(randomDirection) * 50}px`;

        document.body.appendChild(trail);

        setTimeout(() => {
            trail.remove();
        }, 995);
    }
});
