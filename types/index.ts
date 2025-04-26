/**
 * Common types used throughout the application
 */

/**
 * Base response type for API calls
 */
export interface ApiResponse<T> {
    data: T;
    success: boolean;
    message?: string;
}

/**
 * User type
 */
export interface User {
    id: string;
    name: string;
    email: string;
    role: "admin" | "user";
}

/**
 * Dashboard data type
 */
export interface DashboardData {
    totalItems: number;
    completedItems: number;
    pendingItems: number;
}
