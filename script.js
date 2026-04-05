const API = "https://web-production-30add.up.railway.app";

async function loadMarkets() {
    try {
        aconst res = await fetch(`${API}/markets`);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();

        const container = document.getElementById("market-list");
        container.innerHTML = "";

        data.forEach(m => {
            container.innerHTML += `
                <div>
                    <h3>${m.name}</h3>
                    <p>${m.location}</p>
                    <p>${m.description}</p>
                </div>
            `;
        });
    } catch (error) {
        console.error("Error loading markets:", error);
        const container = document.getElementById("market-list");
        container.innerHTML = `<p style="color: red;">Error loading data: ${error.message}</p>`;
    }
}

async function addMarket() {
    try {
        const name = document.getElementById("name").value;
        const location = document.getElementById("location").value;
        const description = document.getElementById("description").value;

        if (!name || !location || !description) {
            alert("Please fill all fields");
            return;
        }

        const res = await fetch(`${API}/markets`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, location, description })
        });

        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }

        document.getElementById("name").value = "";
        document.getElementById("location").value = "";
        document.getElementById("description").value = "";

        loadMarkets();
    } catch (error) {
        console.error("Error adding market:", error);
        alert("Error adding market: " + error.message);
    }
}

// Load markets when DOM is ready
document.addEventListener("DOMContentLoaded", loadMarkets);
