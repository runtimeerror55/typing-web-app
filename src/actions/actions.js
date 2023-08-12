export const postTestStats = async (charactersStats) => {
      const response = await fetch("http://localhost:8080/stats", {
            headers: {
                  "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify(charactersStats),
      });
};
