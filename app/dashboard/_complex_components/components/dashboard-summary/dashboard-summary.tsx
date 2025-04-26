"use client";

import { useState, useEffect } from "react";
import { fetchDashboardData } from "../../api";

interface DashboardSummaryProps {
    title?: string;
}

interface DashboardData {
    totalItems: number;
    completedItems: number;
    pendingItems: number;
}

export const DashboardSummary = ({
    title = "Dashboard Summary"
}: DashboardSummaryProps) => {
    const [data, setData] = useState<DashboardData | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [hasError, setHasError] = useState<boolean>(false);

    useEffect(() => {
        const loadData = async () => {
            try {
                setIsLoading(true);
                // This would normally call the API, but we're using mock data for this example
                // const result = await fetchDashboardData();
                
                // Mock data for demonstration
                const mockData: DashboardData = {
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

    if (isLoading) {
        return <div className="p-4 bg-gray-100 rounded-md">Loading dashboard data...</div>;
    }

    if (hasError) {
        return (
            <div className="p-4 bg-red-50 text-red-600 rounded-md">
                Error loading dashboard data. Please try again.
            </div>
        );
    }

    if (!data) {
        return null;
    }

    const completionPercentage = Math.round((data.completedItems / data.totalItems) * 100);

    return (
        <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-4">{title}</h2>
            
            <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-blue-50 p-4 rounded-md">
                    <p className="text-sm text-blue-600">Total</p>
                    <p className="text-2xl font-bold">{data.totalItems}</p>
                </div>
                
                <div className="bg-green-50 p-4 rounded-md">
                    <p className="text-sm text-green-600">Completed</p>
                    <p className="text-2xl font-bold">{data.completedItems}</p>
                </div>
                
                <div className="bg-yellow-50 p-4 rounded-md">
                    <p className="text-sm text-yellow-600">Pending</p>
                    <p className="text-2xl font-bold">{data.pendingItems}</p>
                </div>
            </div>
            
            <div className="mb-2 flex justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-medium">{completionPercentage}%</span>
            </div>
            
            <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                    className="bg-blue-600 h-2.5 rounded-full" 
                    style={{ width: `${completionPercentage}%` }}
                ></div>
            </div>
        </div>
    );
};

export default DashboardSummary;
