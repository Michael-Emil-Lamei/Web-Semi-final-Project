document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("cityForm");
    const resultDiv = document.getElementById("result");

    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const cityInput = document.getElementById("cityInput").value.trim();

        if (!cityInput) {
            resultDiv.innerHTML = "Please enter a city name.";
            return;
        }

        resultDiv.innerHTML = "Loading...";

        try {
            // Wikipedia API call
            const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(cityInput)}`);
            if (!res.ok) throw new Error("City not found");

            const data = await res.json();

            resultDiv.innerHTML = `
                <h2>${data.title}</h2>
                <p>${data.extract}</p>
                ${data.thumbnail ? `<img src="${data.thumbnail.source}" alt="${data.title} image">` : ""}
                <p><a href="${data.content_urls.desktop.page}" target="_blank">Read more on Wikipedia</a></p>
            `;

            // Save last search in localStorage
            localStorage.setItem("lastSearch", cityInput);

        } catch (err) {
            resultDiv.innerHTML = "Error fetching city information.";
        }
    });

    // Load last search if available
    const lastSearch = localStorage.getItem("lastSearch");
    if (lastSearch) {
        document.getElementById("cityInput").value = lastSearch;
    }
});
