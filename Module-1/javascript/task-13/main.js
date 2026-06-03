// ======================================
// BASIC SETUP
// ======================================

console.log("Welcome to the Community Portal");

window.onload = () => {

    alert("Page fully loaded");

    console.log("Window loaded successfully");
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

    console.log("Displaying events");

    eventContainer.innerHTML = "";

    events.forEach((event, index) => {

        // Destructuring
        const {
            name,
            date,
            seats,
            category
        } = event;

        console.log(
            `Event ${index + 1}:`,
            event
        );

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
// DEBUGGING & TESTING
// ======================================

registrationForm.addEventListener(
    "submit",

    async (event) => {

        // ======================================
        // BREAKPOINT
        // ======================================

        debugger;

        console.log(
            "Form submission started"
        );

        // Prevent form reload
        event.preventDefault();

        console.log(
            "Default form submission prevented"
        );

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

        console.log(
            "Collected Form Data:",
            {
                userName,
                userEmail,
                selectedEvent
            }
        );

        let isValid = true;

        // ======================================
        // VALIDATION
        // ======================================

        if (userName === "") {

            document.querySelector(
                "#nameError"
            ).textContent =
                "Name is required";

            console.error(
                "Validation Error: Name missing"
            );

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

            console.error(
                "Validation Error: Invalid email"
            );

            isValid = false;
        }

        if (selectedEvent === "") {

            document.querySelector(
                "#eventError"
            ).textContent =
                "Please select an event";

            console.error(
                "Validation Error: Event not selected"
            );

            isValid = false;
        }

        // Stop if invalid
        if (!isValid) {

            console.warn(
                "Form validation failed"
            );

            return;
        }

        // ======================================
        // USER DATA PAYLOAD
        // ======================================

        const userData = {

            name: userName,
            email: userEmail,
            event: selectedEvent
        };

        console.log(
            "Payload being sent:",
            JSON.stringify(userData)
        );

        try {

            // Show loader
            loader.style.display = "block";

            console.log(
                "Loader displayed"
            );

            // ======================================
            // SIMULATED SERVER DELAY
            // ======================================

            setTimeout(async () => {

                console.log(
                    "Sending fetch request..."
                );

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

                                body:
                                    JSON.stringify(userData)
                            }
                        );

                    console.log(
                        "Fetch Response:",
                        response
                    );

                    // ======================================
                    // BREAKPOINT
                    // ======================================

                    debugger;

                    if (!response.ok) {

                        throw new Error(
                            "Registration failed"
                        );
                    }

                    const result =
                        await response.json();

                    console.log(
                        "Server Response Data:",
                        result
                    );

                    // Success message
                    successMessage.textContent =
                        "Registration successful!";

                    console.log(
                        "Success message displayed"
                    );

                    // Reset form
                    registrationForm.reset();

                } catch (error) {

                    console.error(
                        "Fetch Error:",
                        error.message
                    );

                    failureMessage.textContent =
                        "Registration failed!";
                }

                finally {

                    loader.style.display = "none";

                    console.log(
                        "Loader hidden"
                    );
                }

            }, 2000);

        } catch (error) {

            console.error(
                "Unexpected Error:",
                error.message
            );

            loader.style.display = "none";
        }
    }
);

// ======================================
// INITIAL DISPLAY
// ======================================

displayEvents();