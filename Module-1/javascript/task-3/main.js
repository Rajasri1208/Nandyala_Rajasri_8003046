// Welcome message
console.log("Welcome to the Community Portal");

// Alert when page fully loads
window.onload = function () {
    alert("Page is fully loaded");
};

// Array of events
const events = [
    {
        name: "Community Clean-Up Drive",
        date: "2026-08-15",
        seats: 5
    },
    {
        name: "Music Festival",
        date: "2024-01-10",
        seats: 10
    },
    {
        name: "Food Donation Camp",
        date: "2026-09-05",
        seats: 0
    }
];

// Get container
const eventContainer = document.getElementById("eventContainer");

// Current date
const today = new Date();

// Display events using forEach()
events.forEach((event, index) => {

    const eventDate = new Date(event.date);

    // if-else to check valid events
    if (eventDate >= today && event.seats > 0) {

        // Create event card
        const eventCard = document.createElement("div");
        eventCard.classList.add("event-card");

        // Event details using template literals
        eventCard.innerHTML = `
            <h2>${event.name}</h2>
            <p>Date: ${event.date}</p>
            <p>
                Available Seats: 
                <span id="seat-${index}">${event.seats}</span>
            </p>

            <button onclick="registerUser(${index})">
                Register
            </button>
        `;

        // Add card to webpage
        eventContainer.appendChild(eventCard);

    } else {

        console.log(`Hidden Event: ${event.name}`);
    }
});

// Registration function with try-catch
function registerUser(index) {

    try {

        // Check valid event
        if (!events[index]) {
            throw new Error("Event does not exist");
        }

        // Check seat availability
        if (events[index].seats <= 0) {
            throw new Error("No seats available");
        }

        // Decrease seat count
        events[index].seats--;

        // Update UI
        document.getElementById(`seat-${index}`).textContent =
            events[index].seats;

        // Success message
        alert(`Registered successfully for ${events[index].name}`);

        console.log(`Seats left: ${events[index].seats}`);

    } catch (error) {

        // Handle errors
        alert(error.message);

        console.error("Registration Error:", error.message);
    }
}