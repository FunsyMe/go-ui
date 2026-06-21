const buttons = document.querySelectorAll(
    ".panel-button, .proxy-settings-button, .logs-button, .panel-settings-button"
);

buttons.forEach(button => {
    button.addEventListener("click", () => {
        buttons.forEach(btn => btn.classList.remove("active"));
        button.classList.add("active");

        const page = button.dataset.page;
        const page_iframe = document.querySelector(".page-iframe");

        switch (page) {
            case "panel":
                page_iframe.src = "dashboard.html";
                break;

            case "proxy-settings":
                page_iframe.src = "proxy_settings.html";
                break;

            case "logs":
                page_iframe.src = "logs.html";
                break;

            case "panel-settings":
                page_iframe.src = "panel_settings.html";
                break;
        }
    });
});