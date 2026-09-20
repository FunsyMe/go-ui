const buttons = document.querySelectorAll(
    ".panel-button, .proxy-settings-button, .logs-button, .panel-settings-button"
);

const pageTitle = document.getElementById("page-title")

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const page = button.dataset.page;
        const page_iframe = document.querySelector(".page-iframe");

        switch (page) {
            case "panel":
                page_iframe.src = "dashboard.html";
                pageTitle.textContent = "GO-UI - Дэшборд"
                break;

            case "proxy-settings":
                page_iframe.src = "proxy_settings.html";
                pageTitle.textContent = "GO-UI - Прокси"
                break;

            case "logs":
                page_iframe.src = "logs.html";
                pageTitle.textContent = "GO-UI - Логи"
                break;

            case "panel-settings":
                page_iframe.src = "panel_settings.html";
                pageTitle.textContent = "GO-UI - Настройки"
                break;
        }
    });
});

// this will enable / disable panel.mobile.css

(() => {
    const CSS_FILE = "static/css/panel.mobile.css";

    function isMobile() {
        const ua = navigator.userAgent.toLowerCase();

        const mobileUA =
            /android|iphone|ipad|ipod|blackberry|iemobile|opera mini|mobile/i.test(ua);

        const portrait = window.innerHeight > window.innerWidth;

        const smallScreen =
            (window.innerHeight <= 1000) ||
            (window.innerWidth <= 1620);

        return mobileUA || portrait || smallScreen;
    }

    function enableMobileCSS() {
        if (document.getElementById("mobile-css")) return;

        const link = document.createElement("link");
        link.id = "mobile-css";
        link.rel = "stylesheet";
        link.href = CSS_FILE;

        document.head.appendChild(link);
    }

    function disableMobileCSS() {
        document.getElementById("mobile-css")?.remove();
    }

    function update() {
        if (isMobile()) {
            enableMobileCSS();
        } else {
            disableMobileCSS();
        }
    }

    window.addEventListener("DOMContentLoaded", update);
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
})();