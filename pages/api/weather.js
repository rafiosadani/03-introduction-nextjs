export default async function handler(req, res) {
    const city = req.query.city || "Malang";
    const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

    if (!API_KEY) {
        return res.status(500).json({error: "API key missing"});
    }

    try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`)

        if (!response.ok) {
            const errorData = await response.json();
            res.status(response.status).json({error: errorData.message || "Could not parse weather."});
        }

        const weatherData = await response.json();
        res.status(response.status).json(weatherData);
    } catch (err) {
        console.error("Error fetching user data:", err); // log error untuk debugging
        res.status(500).json({error: "An error occurred while fetching weather"});
    }
}