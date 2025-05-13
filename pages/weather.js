import { useEffect, useState } from "react";

const WeatherPage = () => {
    const [city, setCity] = useState("Malang");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [isDay, setIsDay] = useState(true);
    const [currentTime, setCurrentTime] = useState(null);

    // Update waktu setiap detik
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date());
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const fetchWeather = async () => {
        setLoading(true);
        setError("");

        // Menentukan apakah sekarang siang atau malam
        const hour = new Date().getHours();
        setIsDay(hour >= 6 && hour <= 18); // 06.00 - 18.00

        // Delay sedikit biar animasi sempat muncul
        await new Promise(resolve => setTimeout(resolve, 500)); // 500ms

        try {
          const response = await fetch(`/api/weather?city=${city}`);
          const data = await response.json();

          if (data.error) {
              setError(data.error);
              setWeather(null);
          } else {
              setWeather(data);
          }
        } catch (err) {
            console.error("Error fetching user data:", err); // log error untuk debugging
            setError("Error fetching weather");
            setWeather(null);
        }
        setLoading(false);
    }

    // Menjalankan fetchWeather saat komponen pertama kali dimuat
    useEffect(() => {
        fetchWeather(city);
    }, []);

    // Fungsi untuk menangani pencarian kota
    const handleSearch = (e) => {
        e.preventDefault();
        if (city.trim()) {
            fetchWeather(city);
        }
    }

    return (
        <div className={`min-h-screen flex items-center justify-center transition-all duration-500 ${isDay ? "bg-gradient-to-br from-blue-200 via-white to-yellow-100 text-gray-900" : "bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white"}`}>
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 w-full max-w-md text-center border border-gray-300 dark:border-gray-700 transition-colors duration-500">
                <h1 className={`text-4xl font-extrabold mb-2 font-mono ${isDay ? "text-gray-800" : "text-white"}`}>🌤️ Cuaca Hari Ini</h1>
                {currentTime ? (
                    <p className={`mb-4 font-mono text-lg ${isDay ? "text-gray-700" : "text-gray-300"}`}>
                        🕒 {currentTime.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                    })}
                    </p>
                ) : (
                    <p className="mb-4 font-mono text-lg text-gray-400">🕒 Memuat waktu...</p>
                )}

                {/* Form untuk pencarian kota */}
                <form onSubmit={handleSearch} className="mb-6">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        placeholder="Masukkan nama kota"
                        className="w-full px-4 py-2 rounded-full border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                    />
                    <button
                        type="submit"
                        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-full hover:bg-blue-600 transition"
                    >
                        Cari
                    </button>
                </form>

                {/* Animasi Loading */}
                {loading && (
                    <div className="min-h-[200px] flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
                    </div>
                )}

                {/* Menampilkan pesan error jika ada */}
                {error && !loading && (
                    <div className="bg-red-50 text-red-700 border border-red-300 rounded-xl shadow-md p-6 text-center mt-6">
                        <h2 className="text-xl font-bold mb-2">Gagal Memuat Data</h2>
                        <p className="mb-4">{error}</p>
                        <button
                            onClick={() => fetchWeather(city)}
                            className="text-blue-600 hover:underline font-medium"
                        >
                            ↻ Coba Lagi
                        </button>
                    </div>
                )}

                {/* Menampilkan data cuaca */}
                {weather && !loading && !error && (
                    <div className="mt-4">
                        <img
                            src={`https://openweathermap.org/img/wn/${isDay ? "02d" : weather.weather[0].icon}@4x.png`}
                            alt="Icon Cuaca"
                            className="mx-auto"
                        />
                        <h2 className="text-2xl font-bold mb-2">📍 {weather.name}</h2>
                        <div className={`rounded-xl p-4 shadow-inner space-y-2 text-left ${isDay ? "bg-blue-100 text-gray-800" : "bg-blue-900 text-white"}`}>
                            <p>🌡️ Suhu: <span className="font-semibold">{weather.main.temp}°C</span></p>
                            <p>☁️ Cuaca: <span className="capitalize font-semibold">{weather.weather[0].description}</span></p>
                            <p>💨 Angin: <span className="font-semibold">{weather.wind.speed} m/s</span></p>
                            <p>💧 Kelembapan: <span className="font-semibold">{weather.main.humidity}%</span></p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WeatherPage;