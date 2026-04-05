const API = "http://127.0.0.1:5000";

async function loadMarkets() {
    const res = await fetch(`${API}/markets`);
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
}

async function addMarket() {
    const name = document.getElementById("name").value;
    const location = document.getElementById("location").value;
    const description = document.getElementById("description").value;

    await fetch(`${API}/markets`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, location, description })
    });

    loadMarkets();
}

loadMarkets();