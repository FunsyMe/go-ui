const buttons = document.querySelectorAll(
    ".refresh-button, .copy-button, .clear-button, .download-button"
);

buttons.forEach(button => {
    button.addEventListener("click", () => {
        const className = button.className;
        const logsField = document.getElementById("logs");

        switch (className) {
            case "refresh-button":
                break;

            case "clear-button":
                logsField.textContent = "";
                break;

            case "copy-button":
                navigator.clipboard.writeText(logsField.textContent)
                break;

            case "download-button":
                break;
        }
    });
});