// Welcome message
console.log("Welcome to the Community Portal");

// Alert when page fully loads
window.onload = function () {
    alert("Page is fully loaded");
};

// ==========================
// EVENT CLASS
// ==========================

class Event {

    constructor(name, date, seats, category) {

        this.name = name;
        this.date = date;
        this.seats = seats;
        this.category = category;
    }
}

// ==========================
// PROTOTYPE METHOD
// ==========================

Event.prototype.checkAvailability = function () {

    return this.seats > 0;
};

// ==========================
// EVENT ARRAY
// ==========================

const events = [];

// ==========================
// ADD EVENT FUNCTION
// ==========================

function addEvent(name, date, seats, category) {

    const newEvent =
        new Event(name, date, seats, category);

    events.push(newEvent);
}

// Add sample events
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

// ==========================
// CLOSURE FOR REGISTRATION
// ==========================

function registrationTracker(categoryName) {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        console.log(
            `Total registrations for ${categoryName}: ${totalRegistrations}`
        );
    };
}

const environmentTracker =
    registrationTracker("Environment");

const musicTracker =
    registrationTracker("Music");

const foodTracker =
    registrationTracker("Food");

// ==========================
// DISPLAY EVENTS
// ==========================

function displayEvents(eventList) {

    const container =
        document.getElementById("eventContainer");

    container.innerHTML = "";

    const today = new Date();

    eventList.forEach((event, index) => {

        const eventDate = new Date(event.date);

        // if-else validation
        if (
            eventDate >= today &&
            event.checkAvailability()
        ) {

            // Create event card
            const card =
                document.createElement("div");

            card.classList.add("event-card");

            // Object.entries()
            let eventDetails = "";

            Object.entries(event).forEach(
                ([key, value]) => {

                    eventDetails += `
                        <p>
                            <strong>${key}:</strong>
                            ${value}
                        </p>
                    `;
                }
            );

            card.innerHTML = `
                <h2>${event.name}</h2>

                ${eventDetails}

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

// ==========================
// REGISTER USER
// ==========================

function registerUser(index) {

    try {

        if (!events[index]) {

            throw new Error("Event not found");
        }

        if (!events[index].checkAvailability()) {

            throw new Error("No seats available");
        }

        // Reduce seat count
        events[index].seats--;

        // Update UI
        document.getElementById(`seat-${index}`).textContent =
            events[index].seats;

        alert(
            `Successfully registered for ${events[index].name}`
        );

        // Category-wise closure tracking
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

// ==========================
// HIGHER-ORDER FUNCTION
// ==========================

function filterEventsByCategory(
    category,
    callback
) {

    let filteredEvents;

    if (category === "All") {

        filteredEvents = events;

    } else {

        filteredEvents =
            events.filter(event =>
                event.category === category
            );
    }

    // Callback execution
    callback(filteredEvents);
}

// ==========================
// FILTER EVENT LISTENER
// ==========================

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