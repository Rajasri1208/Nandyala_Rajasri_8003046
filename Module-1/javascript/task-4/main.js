// Welcome message
console.log("Welcome to the Community Portal");

// Alert after page loads
window.onload = function () {
    alert("Page is fully loaded");
};

// Array to store events
const events = [];

// Function to add events
function addEvent(name, date, seats, category) {

    events.push({
        name,
        date,
        seats,
        category
    });
}

// Adding sample events
addEvent(
    "Community Clean-Up Drive",
    "2026-08-15",
    5,
    "Environment"
);

addEvent(
    "Music Festival",
    "2026-09-10",
    10,
    "Music"
);

addEvent(
    "Food Donation Camp",
    "2024-01-05",
    0,
    "Food"
);

// Closure to track registrations by category
function registrationTracker(categoryName) {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        console.log(
            `Total registrations for ${categoryName}: ${totalRegistrations}`
        );
    };
}

// Create trackers
const environmentTracker =
    registrationTracker("Environment");

const musicTracker =
    registrationTracker("Music");

const foodTracker =
    registrationTracker("Food");

// Display events
function displayEvents(eventList) {

    const container =
        document.getElementById("eventContainer");

    container.innerHTML = "";

    const today = new Date();

    // Loop through events
    eventList.forEach((event, index) => {

        const eventDate = new Date(event.date);

        // Show only upcoming events with seats
        if (eventDate >= today && event.seats > 0) {

            const card = document.createElement("div");

            card.classList.add("event-card");

            card.innerHTML = `
                <h2>${event.name}</h2>

                <p>Date: ${event.date}</p>

                <p>Category: ${event.category}</p>

                <p>
                    Available Seats:
                    <span id="seat-${index}">
                        ${event.seats}
                    </span>
                </p>

                <button onclick="registerUser(${index})">
                    Register
                </button>
            `;

            container.appendChild(card);

        } else {

            console.log(`Hidden Event: ${event.name}`);
        }
    });
}

// Function to register users
function registerUser(index) {

    try {

        if (!events[index]) {
            throw new Error("Event not found");
        }

        if (events[index].seats <= 0) {
            throw new Error("No seats available");
        }

        // Reduce seats
        events[index].seats--;

        // Update seat display
        document.getElementById(`seat-${index}`).textContent =
            events[index].seats;

        alert(
            `Successfully registered for ${events[index].name}`
        );

        // Use closure trackers
        if (events[index].category === "Environment") {
            environmentTracker();
        }

        else if (events[index].category === "Music") {
            musicTracker();
        }

        else if (events[index].category === "Food") {
            foodTracker();
        }

    } catch (error) {

        alert(error.message);

        console.error(error.message);
    }
}

// Higher-order function with callback
function filterEventsByCategory(category, callback) {

    let filteredEvents;

    if (category === "All") {

        filteredEvents = events;

    } else {

        filteredEvents =
            events.filter(event =>
                event.category === category
            );
    }

    // Execute callback
    callback(filteredEvents);
}

// Filter dropdown event
document
    .getElementById("categoryFilter")
    .addEventListener("change", function () {

        const selectedCategory = this.value;

        filterEventsByCategory(
            selectedCategory,
            displayEvents
        );
    });

// Initial display
displayEvents(events);