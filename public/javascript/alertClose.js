const closeAlerts = function () {   // this function will add 'd-none' class to all alerts, which will remove them from the page

    const alerts = document.querySelectorAll('.alert-dismissible').forEach(el => el.classList.add('d-none'));
}

const fadeAlerts = function () {     // this function will fade all alerts over 1 second. Then call closeAlerts()

    document.querySelectorAll('.alert-dismissible').forEach(el => {
        el.style.transition = "opacity 0.5s linear 0s";
        el.style.opacity = 0;
    });
    setTimeout("closeAlerts()", 1000);
}

setTimeout("fadeAlerts()", 3500);   // initiate fade-close sequence 3.5 seconds after a page is loaded
