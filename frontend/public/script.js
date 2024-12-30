// Function to handle user login
async function loginUser(email, password) {
    try {
        const response = await fetch('http://localhost:5000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response.ok) {
            throw new Error('Login failed: ' + response.statusText);
        }

        const data = await response.json();
        // Store token and userId in local storage
        localStorage.setItem('token', data.token);
        localStorage.setItem('userId', data.userId);
        console.log('Login successful:', data);

        // Start tracking location after successful login
        startTrackingLocation(); // Call the function to start tracking
    } catch (error) {
        console.error('Error during login:', error);
    }
}

// Function to start tracking location
function startTrackingLocation() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        console.error('User is not authorized. Please log in.');
        return;
    }

    // Set interval to send location every 4 seconds
    setInterval(() => {
        getLocationAndSend(); // Call your function to send location
    }, 4000);
}

// Function to get and send location
async function getLocationAndSend() {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');

    if (!token || !userId) {
        console.error('User is not authorized. Please log in.');
        return;
    }

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            const timestamp = new Date().toISOString();

            console.log(`Latitude: ${latitude}, Longitude: ${longitude}, Timestamp: ${timestamp}`);

            // Send location data to the backend
            try {
                const response = await fetch(`http://localhost:5000/api/user/location`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`, // Include the token
                    },
                    body: JSON.stringify({
                        latitude: latitude,
                        longitude: longitude,
                        timestamp: timestamp,
                    }),
                });

                if (!response.ok) {
                    throw new Error('Failed to log location: ' + response.statusText);
                }

                const result = await response.json();
                console.log('Location logged successfully:', result);
            } catch (error) {
                console.error('Error logging location:', error);
            }

        }, (error) => {
            console.error('Error getting location:', error);
        });
    } else {
        console.error('Geolocation is not supported by this browser.');
    }
}

// Example usage
document.getElementById('loginButton').addEventListener('click', async () => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    await loginUser(email, password);
});

// Call this function to get location and send it after login
document.getElementById('trackLocationBtn').addEventListener('click', getLocationAndSend);