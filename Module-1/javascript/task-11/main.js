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
// EVENTS ARRAY
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

const registrationForm =
    document.querySelector("#registrationForm");

// ======================================
// ADD EVENT FUNCTION
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

// ======================================
// DISPLAY EVENTS
// ======================================

const displayEvents = (eventList) => {

    eventContainer.innerHTML = "";

    const today = new Date();

    eventList.forEach((event, index) => {

        // Destructuring
        const {
            name,
            date,
            seats,
            category
        } = event;

        const eventDate =
            new Date(date);

        if (
            eventDate >= today &&
            event.checkAvailability()
        ) {

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
// ======================================

const filterEvents = () => {

    const selectedCategory =
        categoryFilter.value;

    // Clone array
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
// FETCH EVENTS
// ======================================

const fetchEventsAsync = async () => {

    try {

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

        const fetchedEvents =
            data.slice(0, 2).map(
                (item, index) => {

                    return new Event(
                        item.name,
                        `2026-12-0${index + 1}`,
                        5 + index,
                        "Music"
                    );
                }
            );

        events = [
            ...events,
            ...fetchedEvents
        ];

        displayEvents(events);

    } catch (error) {

        console.error(error.message);

    } finally {

        loader.style.display = "none";
    }
};

// ======================================
// FORM VALIDATION
// ======================================

registrationForm.addEventListener(
    "submit",
    (event) => {

        // Prevent page reload
        event.preventDefault();

        // Clear old errors
        document.querySelector(
            "#nameError"
        ).textContent = "";

        document.querySelector(
            "#emailError"
        ).textContent = "";

        document.querySelector(
            "#eventError"
        ).textContent = "";

        document.querySelector(
            "#successMessage"
        ).textContent = "";

        // ======================================
        // form.elements
        // ======================================

        const formElements =
            registrationForm.elements;

        const userName =
            formElements["userName"].value.trim();

        const userEmail =
            formElements["userEmail"].value.trim();

        const selectedEvent =
            formElements["selectedEvent"].value;

        let isValid = true;

        // Name validation
        if (userName === "") {

            document.querySelector(
                "#nameError"
            ).textContent =
                "Name is required";

            isValid = false;
        }

        // Email validation
        if (
            userEmail === "" ||
            !userEmail.includes("@")
        ) {

            document.querySelector(
                "#emailError"
            ).textContent =
                "Enter valid email";

            isValid = false;
        }

        // Event validation
        if (selectedEvent === "") {

            document.querySelector(
                "#eventError"
            ).textContent =
                "Select an event";

            isValid = false;
        }

        // Success
        if (isValid) {

            document.querySelector(
                "#successMessage"
            ).textContent =
                `Successfully registered for ${selectedEvent}`;
        }
    }
);

// ======================================
// EVENT HANDLING
// ======================================

// onchange
categoryFilter.onchange = () => {

    filterEvents();
};

// keydown
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

fetchEventsAsync();