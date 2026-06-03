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

// Sample Events
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
// DOM ELEMENTS
// ======================================

const eventContainer =
    document.querySelector("#eventContainer");

const categoryFilter =
    document.querySelector("#categoryFilter");

const searchBox =
    document.querySelector("#searchBox");

// ======================================
// DISPLAY EVENTS
// ======================================

function displayEvents(eventList) {

    // Clear previous content
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

            // Create card
            const card =
                document.createElement("div");

            card.classList.add("event-card");

            // Event details
            card.innerHTML = `
                <h2>${event.name}</h2>

                <p>
                    <strong>Date:</strong>
                    ${event.date}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${event.category}
                </p>

                <p>
                    <strong>Seats Left:</strong>

                    <span id="seat-${index}">
                        ${event.seats}
                    </span>
                </p>

                <!-- onclick event -->
                <button onclick="registerUser(${index})">
                    Register
                </button>
            `;

            // Append card
            eventContainer.appendChild(card);
        }
    });
}

// ======================================
// REGISTER FUNCTION
// ======================================

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
        document.querySelector(
            `#seat-${index}`
        ).textContent = events[index].seats;

        alert(
            `Successfully registered for ${events[index].name}`
        );

    } catch (error) {

        alert(error.message);

        console.error(error.message);
    }
}

// ======================================
// FILTER EVENTS
// ======================================

function filterEvents() {

    const selectedCategory =
        categoryFilter.value;

    let filteredEvents;

    if (selectedCategory === "All") {

        filteredEvents = events;
    }

    else {

        filteredEvents =
            events.filter(event =>
                event.category === selectedCategory
            );
    }

    displayEvents(filteredEvents);
}

// ======================================
// SEARCH EVENTS USING keydown
// ======================================

function searchEvents() {

    const searchText =
        searchBox.value.toLowerCase();

    const searchedEvents =
        events.filter(event =>
            event.name
                .toLowerCase()
                .includes(searchText)
        );

    displayEvents(searchedEvents);
}

// ======================================
// EVENT HANDLING
// ======================================

// onchange event
categoryFilter.onchange = function () {

    filterEvents();
};

// keydown event
searchBox.addEventListener(
    "keydown",
    function () {

        // Small delay for latest key value
        setTimeout(searchEvents, 100);
    }
);

// ======================================
// INITIAL DISPLAY
// ======================================

displayEvents(events);