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

const events = [

    new Event(
        "Music Concert",
        "2026-09-10",
        10,
        "Music"
    ),

    new Event(
        "Baking Workshop",
        "2026-08-15",
        5,
        "Food"
    ),

    new Event(
        "Clean-Up Drive",
        "2026-07-20",
        8,
        "Environment"
    )
];

// ======================================
// DOM ELEMENTS
// ======================================

const eventContainer =
    document.querySelector("#eventContainer");

const registrationForm =
    document.querySelector("#registrationForm");

const loader =
    document.querySelector("#loader");

const successMessage =
    document.querySelector("#successMessage");

const failureMessage =
    document.querySelector("#failureMessage");

// ======================================
// DISPLAY EVENTS
// ======================================

const displayEvents = () => {

    eventContainer.innerHTML = "";

    events.forEach((event) => {

        const {
            name,
            date,
            seats,
            category
        } = event;

        const card =
            document.createElement("div");

        card.classList.add("event-card");

        card.innerHTML = `
            <h3>${name}</h3>

            <p>
                <strong>Date:</strong>
                ${date}
            </p>

            <p>
                <strong>Category:</strong>
                ${category}
            </p>

            <p>
                <strong>Seats:</strong>
                ${seats}
            </p>
        `;

        eventContainer.appendChild(card);
    });
};

// ======================================
// FORM SUBMISSION
// AJAX & FETCH API
// ======================================

registrationForm.addEventListener(
    "submit",

    async (event) => {

        // Prevent page reload
        event.preventDefault();

        // Clear old messages
        successMessage.textContent = "";
        failureMessage.textContent = "";

        document.querySelector(
            "#nameError"
        ).textContent = "";

        document.querySelector(
            "#emailError"
        ).textContent = "";

        document.querySelector(
            "#eventError"
        ).textContent = "";

        // ======================================
        // GET FORM VALUES
        // ======================================

        const formElements =
            registrationForm.elements;

        const userName =
            formElements["userName"]
                .value.trim();

        const userEmail =
            formElements["userEmail"]
                .value.trim();

        const selectedEvent =
            formElements["selectedEvent"]
                .value;

        let isValid = true;

        // ======================================
        // VALIDATION
        // ======================================

        if (userName === "") {

            document.querySelector(
                "#nameError"
            ).textContent =
                "Name is required";

            isValid = false;
        }

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

        if (selectedEvent === "") {

            document.querySelector(
                "#eventError"
            ).textContent =
                "Select an event";

            isValid = false;
        }

        // Stop if invalid
        if (!isValid) {

            return;
        }

        // ======================================
        // USER DATA
        // ======================================

        const userData = {

            name: userName,
            email: userEmail,
            event: selectedEvent
        };

        try {

            // Show loader
            loader.style.display = "block";

            // ======================================
            // SIMULATE DELAY
            // ======================================

            setTimeout(async () => {

                try {

                    // ======================================
                    // FETCH POST REQUEST
                    // ======================================

                    const response =
                        await fetch(
                            "https://jsonplaceholder.typicode.com/posts",
                            {
                                method: "POST",

                                headers: {
                                    "Content-Type":
                                        "application/json"
                                },

                                body: JSON.stringify(userData)
                            }
                        );

                    if (!response.ok) {

                        throw new Error(
                            "Registration failed"
                        );
                    }

                    const result =
                        await response.json();

                    console.log(result);

                    // Success message
                    successMessage.textContent =
                        "Registration successful!";

                    // Reset form
                    registrationForm.reset();

                } catch (error) {

                    console.error(error.message);

                    // Failure message
                    failureMessage.textContent =
                        "Failed to submit registration";
                }

                finally {

                    // Hide loader
                    loader.style.display = "none";
                }

            }, 2000);

        } catch (error) {

            console.error(error.message);

            loader.style.display = "none";
        }
    }
);

// ======================================
// INITIAL DISPLAY
// ======================================

displayEvents();