import { useState, useEffect } from "react";
import { fetchDashboardData } from "../api";

/**
 * Custom hook for fetching and managing dashboard data
 */
export const useDashboardData = () => {
    const [data, setData] = useState<any>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                // This would normally call the API, but we're using mock data for this example
                // const result = await fetchDashboardData();
                
                // Mock data for demonstration
                const mockData = {
                    totalItems: 24,
                    completedItems: 16,
                    pendingItems: 8
                };
                
                setData(mockData);
                setHasError(false);
            } catch (error) {
                console.error("Failed to load dashboard data", error);
                setHasError(true);
            } finally {
                setIsLoading(false);
            }
        };

        loadData();
    }, []);

    const refreshData = async () => {
        setIsLoading(true);
        try {
            // This would normally call the API, but we're using mock data for this example
            // const result = await fetchDashboardData();
            
            // Mock data for demonstration with updated values
            const mockData = {
                totalItems: Math.floor(Math.random() * 30) + 10,
                completedItems: Math.floor(Math.random() * 20) + 5,
                get pendingItems() { return this.totalItems - this.completedItems; }
            };
            
            setData(mockData);
            setHasError(false);
        } catch (error) {
            console.error("Failed to refresh dashboard data", error);
            setHasError(true);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        hasError,
        refreshData
    };
};
