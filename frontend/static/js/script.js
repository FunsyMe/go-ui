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