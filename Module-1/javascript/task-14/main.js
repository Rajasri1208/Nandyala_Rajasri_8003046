// ======================================
// BASIC SETUP
// ======================================

console.log("Welcome to the Community Portal");

$(document).ready(function () {

    console.log("jQuery document ready");

    // ======================================
    // FADE IN EVENT CARDS
    // ======================================

    $(".event-card").fadeIn(2000);

    // ======================================
    // REGISTER BUTTON CLICK EVENT
    // ======================================

    $("#registerBtn").click(function () {

        console.log(
            "Register button clicked"
        );

        // Get username
        const userName =
            $("#userName").val().trim();

        console.log(
            "Entered User Name:",
            userName
        );

        // Validation
        if (userName === "") {

            alert("Please enter your name");

            console.error(
                "Validation failed: Name missing"
            );

            return;
        }

        // Success message
        $("#successMessage").text(
            `Successfully registered, ${userName}!`
        );

        console.log(
            "Registration successful"
        );

        // ======================================
        // FADE OUT EVENT CARDS
        // ======================================

        $(".event-card").fadeOut(2000);

        // ======================================
        // FADE IN AGAIN
        // ======================================

        $(".event-card").fadeIn(2000);
    });
});