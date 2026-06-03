// ======================================
// BASIC SETUP
// ======================================

console.log("Welcome to the Community Portal");

window.onload = () => {

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
// GLOBAL EVENT ARRAY
// ======================================

let events = [];

// ======================================
// DOM ELEMENTS
// ======================================

const eventContainer =
    document.querySelector("#eventContainer");

const categoryFilter =
    document.querySelector("#categoryFilter");

const searchBox =
    document.querySelector("#searchBox");

const loader =
    document.querySelector("#loader");

// ======================================
// ADD EVENT FUNCTION
// DEFAULT PARAMETERS
// ======================================

const addEvent = (
    name = "New Event",
    date = "2026-01-01",
    seats = 0,
    category = "General"
) => {

    const newEvent =
        new Event(name, date, seats, category);

    events.push(newEvent);
};

// ======================================
// SAMPLE EVENTS
// ======================================

addEvent(
    "Live Music Concert",
    "2026-09-10",
    10,
    "Music"
);

addEvent(
    "Workshop on Baking",
    "2026-08-15",
    5,
    "Food"
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
// DISPLAY EVENTS
// ======================================

const displayEvents = (eventList) => {

    eventContainer.innerHTML = "";

    const today = new Date();

    eventList.forEach((event, index) => {

        // ======================================
        // DESTRUCTURING
        // ======================================

        const {
            name,
            date,
            seats,
            category
        } = event;

        const eventDate =
            new Date(date);

        // Show only upcoming events
        if (
            eventDate >= today &&
            event.checkAvailability()
        ) {

            // Create card
            const card =
                document.createElement("div");

            card.classList.add("event-card");

            card.innerHTML = `
                <h2>${name}</h2>

                <p>
                    <strong>Date:</strong>
                    ${date}
                </p>

                <p>
                    <strong>Category:</strong>
                    ${category}
                </p>

                <p>
                    <strong>Seats Left:</strong>

                    <span id="seat-${index}">
                        ${seats}
                    </span>
                </p>

                <button onclick="registerUser(${index})">
                    Register
                </button>
            `;

            eventContainer.appendChild(card);
        }
    });
};

// ======================================
// REGISTER USER
// ======================================

const registerUser = (index) => {

    try {

        if (!events[index]) {

            throw new Error(
                "Event not found"
            );
        }

        if (!events[index].checkAvailability()) {

            throw new Error(
                "No seats available"
            );
        }

        // Reduce seats
        events[index].seats--;

        // Update UI
        document.querySelector(
            `#seat-${index}`
        ).textContent =
            events[index].seats;

        alert(
            `Successfully registered for ${events[index].name}`
        );

    } catch (error) {

        console.error(error.message);

        alert(error.message);
    }
};

// ======================================
// FILTER EVENTS
// SPREAD OPERATOR
// ======================================

const filterEvents = () => {

    const selectedCategory =
        categoryFilter.value;

    // Clone events array
    const clonedEvents = [...events];

    let filteredEvents = [];

    if (selectedCategory === "All") {

        filteredEvents =
            clonedEvents;
    }

    else {

        filteredEvents =
            clonedEvents.filter(event =>
                event.category === selectedCategory
            );
    }

    displayEvents(filteredEvents);
};

// ======================================
// SEARCH EVENTS
// ======================================

const searchEvents = () => {

    const searchText =
        searchBox.value.toLowerCase();

    // Clone array using spread operator
    const clonedEvents = [...events];

    const searchedEvents =
        clonedEvents.filter(event =>
            event.name
                .toLowerCase()
                .includes(searchText)
        );

    displayEvents(searchedEvents);
};

// ======================================
// FETCH EVENTS USING async/await
// ======================================

const fetchEventsAsync = async () => {

    try {

        // Show loader
        loader.style.display = "block";

        const response =
            await fetch(
                "https://jsonplaceholder.typicode.com/users"
            );

        if (!response.ok) {

            throw new Error(
                "Failed to fetch events"
            );
        }

        const data =
            await response.json();

        // Convert fetched data
        const fetchedEvents =
            data.slice(0, 4).map(
                (item, index) => {

                    return new Event(
                        item.name,
                        `2026-12-0${index + 1}`,
                        5 + index,
                        index % 2 === 0
                            ? "Music"
                            : "Food"
                    );
                }
            );

        // Spread operator
        events = [
            ...events,
            ...fetchedEvents
        ];

        displayEvents(events);

    } catch (error) {

        console.error(error.message);

        alert(error.message);

    } finally {

        // Hide loader
        loader.style.display = "none";
    }
};

// ======================================
// EVENT HANDLING
// ======================================

// onchange event
categoryFilter.onchange = () => {

    filterEvents();
};

// keydown event
searchBox.addEventListener(
    "keydown",
    () => {

        setTimeout(searchEvents, 100);
    }
);

// ======================================
// INITIAL DISPLAY
// ======================================

displayEvents(events);

// Fetch remote events
fetchEventsAsync();