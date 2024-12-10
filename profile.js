document.addEventListener("DOMContentLoaded", function () {
    // Display a dynamic greeting based on the time of day
    const hours = new Date().getHours();
    const greetingElement = document.querySelector("h2");

    let greeting = "Welcome to my Profile!";
    if (hours < 12) {
        greeting = "Good morning! Welcome to my Profile!";
    } else if (hours < 18) {
        greeting = "Good afternoon! Welcome to my Profile!";
    } else {
        greeting = "Good evening! Welcome to my Profile!";
    }
    greetingElement.textContent = greeting;

    // Log user interactions
    document.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", function () {
            console.log(`User clicked on: ${this.textContent}`);
        });
    });
});
