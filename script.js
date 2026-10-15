
const darkModeButton = document.getElementById("dark-mode-toggle");

darkModeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
});


const formInput = document.querySelector(".form-in");
const formInputName = document.getElementById("name");
const formInputNumber = document.getElementById("number");
const formInputMessage = document.getElementById("message");
const formFeedback = document.getElementById("form-feedback");

const SCRIPT_URL =
    "https://script.google.com/macros/s/AKfycbyV3VlJXyf-EVqnFbsuki-vAyMIQcu9TXx814eibF1m6I_7bofhzzDyZxRnbqkH7J7Mgg/exec";


formInput.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = formInputName.value.trim();
    const number = formInputNumber.value.trim();
    const message = formInputMessage.value.trim();

    formFeedback.style.color = "red";

    if (name === "") {
        formFeedback.textContent = "Error: Name should not be empty.";
        return;
    }

    if (number === "") {
        formFeedback.textContent = "Error: Phone number should not be empty.";
        return;
    }

    if (!/^\+?[0-9 ]{10,15}$/.test(number)) {
        formFeedback.textContent = "Error: Enter a valid phone number.";
        return;
    }

    if (message === "") {
        formFeedback.textContent = "Error: Message should not be empty.";
        return;
    }

    const data = {
        name: name,
        phone: number,
        message: message
    };

    formFeedback.textContent = "Sending message...";
    formFeedback.style.color = "black";

    fetch(SCRIPT_URL, {
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8"
        },
        body: JSON.stringify(data)
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (result) {
            if (result.success) {
                formFeedback.textContent =
                    "Message saved to Google Sheets!";
                formFeedback.style.color = "green";
                formInput.reset();
            } else {
                formFeedback.textContent =
                    "Failed to save: " + (result.error || "Unknown error");
                formFeedback.style.color = "red";
            }
        })
        .catch(function (error) {
            console.error("Submission error:", error);
            formFeedback.textContent =
                "Unable to confirm saving. Check the browser console.";
            formFeedback.style.color = "red";
        });
});


// Mobile navigation
const mobileMenuButton = document.getElementById("mobile-menu-toggle");
const navigation = document.getElementById("port-nav");

mobileMenuButton.addEventListener("click", function () {
    navigation.classList.toggle("open");

    const isOpen = navigation.classList.contains("open");

    mobileMenuButton.setAttribute("aria-expanded", isOpen);
    mobileMenuButton.setAttribute(
        "aria-label",
        isOpen ? "Close navigation menu" : "Open navigation menu"
    );

    mobileMenuButton.textContent = isOpen ? "✕ Close" : "☰ Menu";
});

navigation.querySelectorAll("a").forEach(function (link) {
    link.addEventListener("click", function () {
        navigation.classList.remove("open");

        mobileMenuButton.setAttribute("aria-expanded", "false");
        mobileMenuButton.setAttribute(
            "aria-label",
            "Open navigation menu"
        );

        mobileMenuButton.textContent = "☰ Menu";
    });
});
