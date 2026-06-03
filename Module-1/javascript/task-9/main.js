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
// GLOBAL EVENTS ARRAY
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
// DISPLAY EVENTS
// ======================================

function displayEvents(eventList) {

    eventContainer.innerHTML = "";

    const today = new Date();

    eventList.forEach((event, index) => {

        const eventDate =
            new Date(event.date);

        // Show only valid events
        if (
            eventDate >= today &&
            event.checkAvailability()
        ) {

            // Create card
            const card =
                document.createElement("div");

            card.classList.add("event-card");

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

                <button onclick="registerUser(${index})">
                    Register
                </button>
            `;

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

        // Reduce seat count
        events[index].seats--;

        // Update UI
        document.querySelector(
            `#seat-${index}`
        ).textContent = events[index].seats;

        alert(
            `Registered for ${events[index].name}`
        );

    } catch (error) {

        console.error(error.message);

        alert(error.message);
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
// SEARCH EVENTS
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
// FETCH EVENTS USING .then()
// ======================================

function fetchEventsWithThen() {

    // Show loader
    loader.style.display = "block";

    fetch(
        "https://jsonplaceholder.typicode.com/users"
    )

    .then(response => {

        if (!response.ok) {

            throw new Error(
                "Failed to fetch data"
            );
        }

        return response.json();
    })

    .then(data => {

        // Convert API data to events
        events = data.slice(0, 4).map(
            (item, index) => {

                return new Event(
                    item.name,
                    "2026-12-0" + (index + 1),
                    5 + index,
                    index % 2 === 0
                        ? "Music"
                        : "Food"
                );
            }
        );

        displayEvents(events);
    })

    .catch(error => {

        console.error(error);

        alert(
            "Error fetching events"
        );
    })

    .finally(() => {

        // Hide loader
        loader.style.display = "none";
    });
}

// ======================================
// FETCH EVENTS USING async/await
// ======================================

async function fetchEventsAsync() {

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
        events = data.slice(0, 4).map(
            (item, index) => {

                return new Event(
                    item.name,
                    "2026-11-1" + index,
                    10 + index,
                    index % 2 === 0
                        ? "Environment"
                        : "Music"
                );
            }
        );

        displayEvents(events);

    } catch (error) {

        console.error(error);

        alert(error.message);

    } finally {

        // Hide loader
        loader.style.display = "none";
    }
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

        setTimeout(searchEvents, 100);
    }
);

// ======================================
// INITIAL FETCH
// ======================================

// Using .then() version
fetchEventsWithThen();

// To test async/await version,
// comment above line and uncomment below

// fetchEventsAsync();