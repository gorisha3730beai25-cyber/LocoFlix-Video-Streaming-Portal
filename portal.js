/* =====================================================
                    GLOBAL VARIABLES
===================================================== */

let isLoggedIn = false;

let currentCaptcha = "";

let myList = [];


/* =====================================================
                    PAGE LOAD
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

    const savedLogin =
        localStorage.getItem("locoflixLoggedIn");

    const savedName =
        localStorage.getItem("locoflixName");


    if (savedLogin === "true") {

        isLoggedIn = true;

    }


    if (savedName) {

        const profileName =
            document.getElementById("profileName");

        if (profileName) {

            profileName.textContent = savedName;

        }

    }


    generateCaptcha();

});



/* =====================================================
                    LOGIN
===================================================== */

function openLogin() {

    closeSignup();

    const modal =
        document.getElementById("loginModal");

    if (!modal) return;

    modal.showModal();

    document.body.classList.add("modal-open");

    generateCaptcha();

}


function closeLogin() {

    const modal =
        document.getElementById("loginModal");

    if (!modal) return;

    modal.close();

    document.body.classList.remove("modal-open");

}


/* =====================================================
                SIGNUP
===================================================== */

function openSignup() {

    closeLogin();

    const modal =
        document.getElementById("signupModal");

    if (!modal) return;

    modal.showModal();

    document.body.classList.add("modal-open");

}


function closeSignup() {

    const modal =
        document.getElementById("signupModal");

    if (!modal) return;

    if (modal.open) {

        modal.close();

    }

}


function switchToSignup() {

    closeLogin();

    openSignup();

}


function switchToLogin() {

    closeSignup();

    openLogin();

}


/* =====================================================
                    CAPTCHA
===================================================== */

function generateCaptcha() {

    const characters =
        "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";


    let captcha = "";


    for (let i = 0; i < 6; i++) {

        const randomIndex =
            Math.floor(
                Math.random() *
                characters.length
            );

        captcha +=
            characters[randomIndex];

    }


    currentCaptcha = captcha;


    const captchaText =
        document.getElementById("captchaText");


    if (captchaText) {

        captchaText.textContent =
            captcha;

    }

}


/* =====================================================
                LOGIN VALIDATION
===================================================== */

function loginUser(event) {

    event.preventDefault();


    const email =
        document
            .getElementById("loginEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("loginPassword")
            .value;


    const captchaInput =
        document
            .getElementById("captchaInput")
            .value
            .trim()
            .toUpperCase();


    if (!email || !password || !captchaInput) {

        alert(
            "Please fill all the fields."
        );

        return;

    }


    if (captchaInput !== currentCaptcha) {

        alert(
            "Incorrect CAPTCHA. Please try again."
        );

        generateCaptcha();

        document
            .getElementById("captchaInput")
            .value = "";

        return;

    }


    isLoggedIn = true;


    localStorage.setItem(
        "locoflixLoggedIn",
        "true"
    );


    let savedName =
        localStorage.getItem("locoflixName");


    if (!savedName) {

        savedName = "LocoFlix User";

    }


    localStorage.setItem(
        "locoflixEmail",
        email
    );


    closeLogin();


    showStreamingPage();


    alert(
        "Login successful! Welcome to LocoFlix."
    );

    localStorage.setItem("loggedInUser", JSON.stringify({
    name: userName,
    email: email
}));

}

function updateProfile() {

    const user = JSON.parse(
        localStorage.getItem("loggedInUser")
    );

    const nameElement = document.getElementById("profileName");
    const emailElement = document.getElementById("profileEmail");
    const statusElement = document.getElementById("profileStatus");

    if (user) {

        nameElement.textContent = user.name;
        emailElement.textContent = user.email;
        statusElement.textContent = "Premium Member";

    } else {

        nameElement.textContent = "LocoFlix User";
        emailElement.textContent = "Not logged in";
        statusElement.textContent = "Guest";

    }
}

/* =====================================================
                REGISTER
===================================================== */

function registerUser(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("registerName")
            .value
            .trim();


    const email =
        document
            .getElementById("registerEmail")
            .value
            .trim();


    const password =
        document
            .getElementById("registerPassword")
            .value;


    if (!name || !email || !password) {

        alert(
            "Please fill all the fields."
        );

        return;

    }


    localStorage.setItem(
        "locoflixName",
        name
    );


    localStorage.setItem(
        "locoflixEmail",
        email
    );


    localStorage.setItem(
        "locoflixLoggedIn",
        "true"
    );


    isLoggedIn = true;


    const profileName =
        document.getElementById("profileName");


    if (profileName) {

        profileName.textContent = name;

    }


    closeSignup();


    showStreamingPage();


    alert(
        "Account created successfully! Welcome " +
        name + "."
    );

}


/* =====================================================
                FORGOT PASSWORD
===================================================== */

function forgotPassword() {

    const email =
        prompt(
            "Enter your registered email address:"
        );


    if (!email) {

        return;

    }


    alert(
        "If this email is registered, a password reset " +
        "link would be sent here.\n\n" +
        "This feature is for demonstration in the " +
        "first evaluation."
    );

}


/* =====================================================
                PROTECTED NAVIGATION
===================================================== */

function protectedNavigation(event) {

    if (event) {

        event.preventDefault();

    }


    if (!isLoggedIn) {

        openLogin();

        return;

    }


    showStreamingPage();

}


/* =====================================================
                SHOW STREAMING PAGE
===================================================== */

function showStreamingPage() {

    const homePage =
        document.getElementById("homePage");


    const streamingPage =
        document.getElementById("streamingPage");


    if (homePage) {

        homePage.classList.add("hidden");

    }


    if (streamingPage) {

        streamingPage.classList.remove("hidden");

    }


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =====================================================
                    LOGOUT
===================================================== */

function logout() {

    const confirmation =
        confirm(
            "Are you sure you want to logout?"
        );


    if (!confirmation) {

        return;

    }


    isLoggedIn = false;


    localStorage.removeItem(
        "locoflixLoggedIn"
    );


    localStorage.removeItem(
        "locoflixEmail"
    );


    localStorage.removeItem(
        "locoflixName"
    );


    const streamingPage =
        document.getElementById("streamingPage");


    const homePage =
        document.getElementById("homePage");


    if (streamingPage) {

        streamingPage.classList.add("hidden");

    }


    if (homePage) {

        homePage.classList.remove("hidden");

    }


    window.scrollTo({
        top: 0,
        behavior: "instant"
    });


    alert(
        "You are successfully logged out."
    );

}


/* =====================================================
                    MOBILE MENU
===================================================== */

function toggleMenu() {

    const menu =
        document.getElementById("mobileMenu");


    if (!menu) return;


    menu.classList.toggle("active");

}


/* =====================================================
                STREAM MENU
===================================================== */

function toggleStreamMenu() {

    const links =
        document.getElementById("streamLinks");


    if (!links) return;


    links.classList.toggle("active");

}


/* =====================================================
                SEARCH MOVIES
===================================================== */

function searchMovies() {

    const input =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const searchSection =
        document.getElementById("searchSection");


    const searchResults =
        document.getElementById("searchResults");


    if (!input) {

        searchSection.classList.add("hidden");

        searchResults.innerHTML = "";

        return;

    }


    searchSection.classList.remove("hidden");


    searchResults.innerHTML = "";


    const cards =
        document.querySelectorAll(
            ".movie-card"
        );


    let found = false;


    cards.forEach(function (card) {

        const title =
            (
                card.dataset.title ||
                ""
            ).toLowerCase();


        if (
            title.includes(input) &&
            !card.closest("#searchResults")
        ) {

            found = true;


            const clone =
                card.cloneNode(true);


            searchResults.appendChild(
                clone
            );

        }

    });


    if (!found) {

        searchResults.innerHTML = `

            <div class="empty-list">

                <i class="fa-solid fa-film"></i>

                <h3>
                    Nothing matches
                </h3>

                <p>
                    We couldn't find a movie
                    matching "${input}".
                </p>

            </div>

        `;

    }

}


/* =====================================================
                MOVIE SLIDERS
===================================================== */

function slideLeft(id) {

    const slider =
        document.getElementById(id);


    if (!slider) return;


    slider.scrollBy({
        left: -500,
        behavior: "smooth"
    });

}


function slideRight(id) {

    const slider =
        document.getElementById(id);


    if (!slider) return;


    slider.scrollBy({
        left: 500,
        behavior: "smooth"
    });

}


/* =====================================================
                    WATCH MOVIE
===================================================== */

function watchMovie(movieName) {

    if (!isLoggedIn) {

        openLogin();

        return;

    }


    alert(
        "▶ Now playing: " +
        movieName +
        "\n\n" +
        "A video player can be connected " +
        "to this button in the next project phase."
    );

}


/* =====================================================
                    MY LIST
===================================================== */

function addToMyList(movieName) {

    if (!isLoggedIn) {

        openLogin();

        return;

    }


    if (
        myList.includes(movieName)
    ) {

        alert(
            movieName +
            " is already in your My List."
        );

        return;

    }


    myList.push(movieName);


    renderMyList();


    alert(
        movieName +
        " has been added to My List."
    );

}


function renderMyList() {

    const container =
        document.getElementById(
            "myListContainer"
        );


    if (!container) return;


    if (myList.length === 0) {

        container.innerHTML = `

            <div class="empty-list">

                <i class="fa-solid fa-bookmark"></i>

                <h3>
                    Your list is empty
                </h3>

                <p>
                    Add movies using the + button.
                </p>

            </div>

        `;

        return;

    }


    container.innerHTML = "";


    myList.forEach(function (movie) {

        const card =
            document.createElement("article");


        card.className =
            "movie-card";


        card.innerHTML = `

            <div style="
                width:100%;
                height:100%;
                display:flex;
                align-items:center;
                justify-content:center;
                text-align:center;
                padding:20px;
                background:
                    linear-gradient(
                        135deg,
                        #300808,
                        #111
                    );
            ">

                <div>

                    <i
                        class="fa-solid fa-film"
                        style="
                            color:#e50914;
                            font-size:35px;
                            margin-bottom:15px;
                        ">
                    </i>

                    <h3>
                        ${movie}
                    </h3>

                    <button
                        onclick="watchMovie('${movie}')"
                        style="
                            margin-top:15px;
                            padding:8px 14px;
                            border:0;
                            border-radius:4px;
                            cursor:pointer;
                        ">

                        <i class="fa-solid fa-play"></i>
                        Watch

                    </button>

                </div>

            </div>

        `;


        container.appendChild(card);

    });

}


/* =====================================================
                NOTIFICATIONS
===================================================== */

function toggleNotifications() {

    const panel =
        document.getElementById(
            "notificationPanel"
        );


    const profile =
        document.getElementById(
            "profilePanel"
        );


    if (profile) {

        profile.classList.remove(
            "active"
        );

    }


    if (panel) {

        panel.classList.toggle(
            "active"
        );

    }

}


/* =====================================================
                    PROFILE
===================================================== */
function toggleProfile() {

    updateProfile();

    const panel = document.getElementById("profilePanel");

    panel.classList.toggle("show");
}


/* =====================================================
                    PREMIUM
===================================================== */

function openPremium() {

    const modal =
        document.getElementById(
            "premiumModal"
        );


    if (!modal) return;


    modal.showModal();


    document.body.classList.add(
        "modal-open"
    );

}


function closePremium() {

    const modal =
        document.getElementById(
            "premiumModal"
        );


    if (!modal) return;


    if (modal.open) {

        modal.close();

    }


    document.body.classList.remove(
        "modal-open"
    );

}


function choosePlan(plan) {

    alert(
        "You selected the " +
        plan +
        " Premium Plan.\n\n" +
        "Payment functionality can be added " +
        "in the next project phase."
    );

}


/* =====================================================
                CONTACT FORM
===================================================== */

function submitContact(event) {

    event.preventDefault();


    const name =
        document
            .getElementById("contactName")
            .value;


    alert(
        "Thank you, " +
        name +
        "!\n\n" +
        "Your message has been submitted successfully."
    );


    event.target.reset();

}


/* =====================================================
                SCROLL TO TOP
===================================================== */

window.addEventListener(
    "scroll",
    function () {

        const button =
            document.getElementById(
                "scrollTop"
            );


        if (!button) return;


        if (
            window.scrollY > 500
        ) {

            button.classList.add(
                "show"
            );

        } else {

            button.classList.remove(
                "show"
            );

        }

    }
);


function scrollToTop() {

    window.scrollTo({

        top: 0,

        behavior: "smooth"

    });

}


/* =====================================================
            CLOSE PANELS WHEN CLICKING OUTSIDE
===================================================== */

document.addEventListener(
    "click",
    function (event) {

        const notification =
            document.getElementById(
                "notificationPanel"
            );


        const profile =
            document.getElementById(
                "profilePanel"
            );


        const notificationButton =
            event.target.closest(
                ".icon-button"
            );


        const profileButton =
            event.target.closest(
                ".profile-button"
            );


        if (
            notification &&
            !notification.contains(event.target) &&
            !notificationButton
        ) {

            notification.classList.remove(
                "active"
            );

        }


        if (
            profile &&
            !profile.contains(event.target) &&
            !profileButton
        ) {

            profile.classList.remove(
                "active"
            );

        }

    }
);


/* =====================================================
                ESCAPE KEY
===================================================== */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {

            closeLogin();

            closeSignup();

            closePremium();

        }

    }
);