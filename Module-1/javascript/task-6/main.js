// Welcome message
console.log("Welcome to the Community Portal");

// Alert after page loads
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
// EVENTS ARRAY
// ==========================

const events = [];

// ==========================
// ADD EVENT USING .push()
// ==========================

function addEvent(name, date, seats, category) {

    const newEvent =
        new Event(name, date, seats, category);

    // push() method
    events.push(newEvent);
}

// Add sample events
addEvent(
    "Workshop on Baking",
    "2026-08-15",
    5,
    "Food"
);

addEvent(
    "Live Music Concert",
    "2026-09-10",
    10,
    "Music"
);

addEvent(
    "Community Clean-Up Drive",
    "2026-07-20",
    8,
    "Environment"
);

addEvent(
    "Music Jam Session",
    "2026-11-01",
    12,
    "Music"
);

// ==========================
// REGISTRATION CLOSURE
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
// DISPLAY EVENTS USING .map()
// ==========================

function displayEvents(eventList) {

    const container =
        document.getElementById("eventContainer");

    container.innerHTML = "";

    const today = new Date();

    // map() for formatting display cards
    const eventCards = eventList.map((event, index) => {

        const eventDate =
            new Date(event.date);

        // Show only upcoming events
        if (
            eventDate >= today &&
            event.checkAvailability()
        ) {

            // Object.entries()
            let details = "";

            Object.entries(event).forEach(
                ([key, value]) => {

                    details += `
                        <p>
                            <strong>${key}:</strong>
                            ${value}
                        </p>
                    `;
                }
            );

            return `
                <div class="event-card">

                    <h2>${event.name}</h2>

                    ${details}

                    <p>
                        Available Seats:
                        <span id="seat-${index}">
                            ${event.seats}
                        </span>
                    </p>

                    <button onclick="registerUser(${index})">
                        Register
                    </button>

                </div>
            `;
        }

        return "";
    });

    // Join all cards
    container.innerHTML =
        eventCards.join("");
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

        // Reduce seats
        events[index].seats--;

        // Update UI
        document.getElementById(`seat-${index}`).textContent =
            events[index].seats;

        alert(
            `Successfully registered for ${events[index].name}`
        );

        // Closure tracking
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
// FILTER EVENTS
// ==========================

function filterEventsByCategory(
    category,
    callback
) {

    let filteredEvents;

    if (category === "All") {

        filteredEvents = events;

    } else {

        // filter() method
        filteredEvents =
            events.filter(event =>
                event.category === category
            );
    }

    callback(filteredEvents);
}

// ==========================
// SHOW ONLY MUSIC EVENTS
// ==========================

function showMusicEvents() {

    // filter() for music events
    const musicEvents =
        events.filter(event =>
            event.category === "Music"
        );

    displayEvents(musicEvents);
}

// ==========================
// FILTER DROPDOWN
// ==========================

document
    .getElementById("categoryFilter")
    .addEventListener("change", function () {

        const selectedCategory =
            this.value;

        filterEventsByCategory(
            selectedCategory,
            displayEvents
        );
    });

// Initial display
displayEvents(events);