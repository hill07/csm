export async function fetchCurrencyData() {
    try {
      const response = await fetch(API_URL, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors", // Enabling CORS
      });
  
      const data = await response.json();
  
      if (!data || !data.quotes) {
        throw new Error("Invalid API response");
      }
  
      return data.quotes; 
    } catch (error) {
      console.error("Error fetching currency data:", error);
      return null; 
    }
  }
  