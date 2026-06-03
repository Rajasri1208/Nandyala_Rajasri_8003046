// Welcome message in console
console.log("Welcome to the Community Portal");

// Alert when page fully loads
window.onload = function () {
    alert("Page is fully loaded");
};

// Event details using const and let
const eventName = "Community Clean-Up Drive";
const eventDate = "15 August 2026";
let availableSeats = 50;

// Display event details using template literals
document.getElementById("eventDetails").innerHTML = `
    Event Name: ${eventName} <br>
    Event Date: ${eventDate} <br>
    Available Seats: <span id="seatCount">${availableSeats}</span>
`;

// Function to register a user
function registerUser() {

    // Check if seats are available
    if (availableSeats > 0) {

        // Decrease seat count
        availableSeats--;

        // Update seat count on webpage
        document.getElementById("seatCount").textContent = availableSeats;

        // Confirmation message
        alert("Registration Successful!");

        // Log updated seats
        console.log(`Seats left: ${availableSeats}`);

    } else {

        alert("No seats available!");
    }
}