// ======================================
// BASIC SETUP
// ======================================

console.log("Welcome to the Community Portal");

window.onload = function () {

    alert("Page is fully loaded");
};

// ======================================
// EVENT CLASS
// ======================================

class Event {

    constructor(name, date, seats, category) {

        this.name = name;
        this.date = date;
        this.seats = seats;
        this.category = category;
    }
}

// ======================================
// PROTOTYPE METHOD
// ======================================

Event.prototype.checkAvailability = function () {

    return this.seats > 0;
};

// ======================================
// EVENTS ARRAY
// ======================================

const events = [];

// ======================================
// ADD EVENTS USING push()
// ======================================

function addEvent(name, date, seats, category) {

    const newEvent =
        new Event(name, date, seats, category);

    events.push(newEvent);
}

// Sample events
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

// ======================================
// CLOSURE
// ======================================

function registrationTracker(categoryName) {

    let totalRegistrations = 0;

    return function () {

        totalRegistrations++;

        console.log(
            `Total registrations for ${categoryName}: ${totalRegistrations}`
        );
    };
}

const musicTracker =
    registrationTracker("Music");

const foodTracker =
    registrationTracker("Food");

const environmentTracker =
    registrationTracker("Environment");

// ======================================
// DOM ELEMENTS USING querySelector()
// ======================================

const eventContainer =
    document.querySelector("#eventContainer");

const categoryFilter =
    document.querySelector("#categoryFilter");

const showMusicBtn =
    document.querySelector("#showMusicBtn");

// ======================================
// DISPLAY EVENTS
// ======================================

function displayEvents(eventList) {

    // Clear old UI
    eventContainer.innerHTML = "";

    const today = new Date();

    eventList.forEach((event, index) => {

        const eventDate =
            new Date(event.date);

        // Show only future events
        if (
            eventDate >= today &&
            event.checkAvailability()
        ) {

            // ======================================
            // CREATE ELEMENT USING createElement()
            // ======================================

            const card =
                document.createElement("div");

            card.classList.add("event-card");

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

            // map() style formatting
            card.innerHTML = `
                <h2>${event.name}</h2>

                ${details}

                <p>
                    Seats Left:
                    <span id="seat-${index}">
                        ${event.seats}
                    </span>
                </p>

                <button onclick="registerUser(${index})">
                    Register
                </button>

                <button onclick="cancelRegistration(${index})">
                    Cancel
                </button>
            `;

            // appendChild()
            eventContainer.appendChild(card);
        }
    });
}

// ======================================
// REGISTER USER
// ======================================

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

        // ======================================
        // UPDATE UI
        // ======================================

        document.querySelector(
            `#seat-${index}`
        ).textContent = events[index].seats;

        alert(
            `Registered for ${events[index].name}`
        );

        // Closure tracking
        if (events[index].category === "Music") {

            musicTracker();
        }

        else if (
            events[index].category === "Food"
        ) {

            foodTracker();
        }

        else if (
            events[index].category === "Environment"
        ) {

            environmentTracker();
        }

    } catch (error) {

        alert(error.message);

        console.error(error.message);
    }
}

// ======================================
// CANCEL REGISTRATION
// ======================================

function cancelRegistration(index) {

    // Increase seats
    events[index].seats++;

    // Update UI
    document.querySelector(
        `#seat-${index}`
    ).textContent = events[index].seats;

    alert(
        `Registration cancelled for ${events[index].name}`
    );
}

// ======================================
// FILTER EVENTS
// ======================================

function filterEventsByCategory(
    category,
    callback
) {

    let filteredEvents;

    if (category === "All") {

        filteredEvents = events;
    }

    else {

        filteredEvents =
            events.filter(event =>
                event.category === category
            );
    }

    callback(filteredEvents);
}

// ======================================
// SHOW ONLY MUSIC EVENTS
// ======================================

function showMusicEvents() {

    const musicEvents =
        events.filter(event =>
            event.category === "Music"
        );

    displayEvents(musicEvents);
}

// ======================================
// EVENT LISTENERS
// ======================================

// Dropdown filter
categoryFilter.addEventListener(
    "change",
    function () {

        filterEventsByCategory(
            this.value,
            displayEvents
        );
    }
);

// Music button
showMusicBtn.addEventListener(
    "click",
    showMusicEvents
);

// ======================================
// INITIAL DISPLAY
// ======================================

displayEvents(events);