document.addEventListener("DOMContentLoaded", function () {
    const highlightElement = document.querySelector(".highlight");

    if (highlightElement) {
        highlightElement.style.cursor = "pointer";

        
        const encodedLink = "aHR0cHM6Ly93d3cueW91dHViZS5jb20vQEhBU1lJTTU2";

        // Tambahkan event listener untuk klik
        highlightElement.addEventListener("click", function () {
            // Decode tautan YouTube dari Base64
            const decodedLink = atob(encodedLink);
            // Arahkan ke kanal YouTube
            window.open(decodedLink, "_blank");
        });
    }
});