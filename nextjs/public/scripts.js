document.addEventListener("DOMContentLoaded", () => {
    const themeToggleBtn = document.getElementById("theme-toggle");

    themeToggleBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark-mode");
    });

    async function fetchData() {
        try {
            const response = await fetch('/api/recieveData.js', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ type: 'YourDataType', message: 'YourMessage' }) // Example payload
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Server Response:", responseData);

            handleResponseData(responseData);

        } catch (error) {
            console.error("Fetch Error:", error);
        }
    }

    function handleResponseData(data) {
        const messagesBox = document.getElementById("messages-content");
        const devicesBox = document.getElementById("devices-content");

        if (data.type === "Device") {
            devicesBox.innerHTML = ""; // Clear previous list
            const macAddresses = data.message;
            macAddresses.forEach(mac => {
                devicesBox.innerHTML += `<p>${mac}</p>`;
            });
        } else {
            messagesBox.innerHTML += `<p>${data.message}</p>`;
        }

        updateParkingLayout(data);
    }

    function updateParkingLayout(data) {
        const spot1 = document.getElementById("spot-1");
        const spot2 = document.getElementById("spot-2");
        const spot3 = document.getElementById("spot-3");
        const spot4 = document.getElementById("spot-4");

        if (data.parkingSpots) {
            spot1.classList.toggle("occupied", data.parkingSpots.spot1);
            spot2.classList.toggle("occupied", data.parkingSpots.spot2);
            spot3.classList.toggle("occupied", data.parkingSpots.spot3);
            spot4.classList.toggle("occupied", data.parkingSpots.spot4);
        }
    }

    setInterval(fetchData, 5000);
});
