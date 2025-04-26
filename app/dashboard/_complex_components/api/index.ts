/**
 * Dashboard API functions for interacting with backend services
 */

/**
 * Fetch dashboard data from the API
 */
export const fetchDashboardData = async () => {
    try {
        const response = await fetch("/api/dashboard");
        
        if (!response.ok) {
            throw new Error("Failed to fetch dashboard data");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error fetching dashboard data:", error);
        throw error;
    }
};

/**
 * Update dashboard settings
 */
export const updateDashboardSettings = async (settings: Record<string, any>) => {
    try {
        const response = await fetch("/api/dashboard/settings", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(settings)
        });
        
        if (!response.ok) {
            throw new Error("Failed to update dashboard settings");
        }
        
        return await response.json();
    } catch (error) {
        console.error("Error updating dashboard settings:", error);
        throw error;
    }
};
