"use client"

import { useState } from "react"
import auditService from '@/api/auditService';
import { format } from 'date-fns';
import { FileType } from "@/types";
import { FormValues } from "@/types/audit";

interface DashboardProps {
    data: FormValues
}

export function Dashboard({ data }: DashboardProps) {
    const [isExpanded, setIsExpanded] = useState(false)
    const [expandedSteps, setExpandedSteps] = useState<Record<string, boolean>>({})

    // Toggle the entire dashboard
    const toggleExpand = () => {
        setIsExpanded(!isExpanded)

        // If expanding, expand all steps. If collapsing, collapse all steps
        const steps = Object.keys(data).filter((key) => key.startsWith("step"))
        const newExpandedSteps = { ...expandedSteps }

        steps.forEach((step) => {
            newExpandedSteps[step] = isExpanded
        })

        setExpandedSteps(newExpandedSteps)
    }

    // Toggle a specific step
    const toggleStep = (step: string) => {
        setExpandedSteps({
            ...expandedSteps,
            [step]: !expandedSteps[step],
        })
    }

    const getLastUpdated = (date: string | null) => {
        if (!date) {
            return 'Unknown';
        }
        try {
            const updatedAt = new Date(date);
            return format(updatedAt, 'MMMM d, yyyy, HH:mm:ss');
        } catch (error) {
            console.error('Error formatting date:', error);
            return 'Invalid Date';
        }
    };

    const handleDownload = async (value: FileType) => {
        try {
            await auditService.downloadFile({
                bucket: value.bucket,
                key: value.key,
                original_filename: value.original_filename,
                content_type: value.content_type
            });
        } catch (error) {
        }
    };

    // Render a key-value pair
    const renderValue = (key: string, value: any) => {
        if (value === null || value === "") {
            return <span className="text-gray-400">Not provided</span>
        }
        // Handle file downloads
        if (typeof value === "object" && value.key) {
            return (
                <div onClick={() => handleDownload(value)} className="flex items-center">
                    <span className="mr-2">{value.original_filename}</span>
                    <button
                        rel="noopener noreferrer"
                        className="text-blue-500 hover:text-blue-700">
                        <div className="p-1 rounded-full hover:bg-gray-100"
                        >
                            {/* Download icon */}
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-4 w-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                                />
                            </svg>
                            <span className="sr-only">Download {value.original_filename}</span>
                        </div>
                    </button>
                </div>
            )
        }

        // Handle links (simple heuristic)
        if (
            typeof value === "string" &&
            (key.toLowerCase().includes("link") ||
                key.toLowerCase().includes("website") ||
                key.toLowerCase().includes("git")) &&
            value.length > 0 &&
            !value.includes(" ")
        ) {
            const url = value.startsWith("http") ? value : `https://${value}`
            return (
                <a
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:text-blue-700 flex items-center"
                >
                    {value}
                    {/* External link icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 ml-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                    </svg>
                </a>
            )
        }

        // Default case
        return <span>{value.toString()}</span>
    }

    // Get all steps from the data
    const steps = Object.keys(data).filter((key) => key.startsWith("step"))


    return (
        <div className="w-full border rounded-lg shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 flex justify-between items-center bg-white border-b">
                <button
                    onClick={toggleExpand}
                    className="flex items-center text-xl font-bold text-gray-800 hover:text-gray-600 focus:outline-none"
                >
                    {isExpanded ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    )}
                    <span className="text-xl font-semibold">{data.step1.name}</span>
                </button>
                <span className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-600 border">
                    Last updated: {getLastUpdated(data.updated_at ? data.updated_at : null)}
                    {/* Last updated: {getLastUpdated()} */}
                </span>
            </div>

            {/* Content */}
            {isExpanded && (
                <div className="p-4 bg-white">
                    <div className="space-y-4">
                        {steps.map((step) => (
                            <div key={step} className="border rounded-md overflow-hidden">
                                <div
                                    className="flex items-center justify-between p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                    onClick={() => toggleStep(step)}
                                >
                                    <h3 className="text-lg font-medium capitalize flex items-center text-gray-800">
                                        {expandedSteps[step] ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-4 w-4 mr-2"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        )}
                                        {step.replace(/([A-Z])/g, " $1").trim()}
                                    </h3>
                                </div>

                                {expandedSteps[step] && (
                                    <div className="p-3 border-t">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                            {Object.entries(data[step]).map(([key, value]) => (
                                                <div key={key} className="py-1">
                                                    <dt className="text-sm font-medium text-gray-500 mb-1">
                                                        {key.replace(/([A-Z])/g, " $1").trim()}
                                                    </dt>
                                                    <dd className="text-sm">{renderValue(key, value)}</dd>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}

                        {/* Display metadata */}
                        <div className="border rounded-md overflow-hidden">
                            <div
                                className="flex items-center justify-between p-3 cursor-pointer bg-gray-50 hover:bg-gray-100"
                                onClick={() => toggleStep("metadata")}
                            >
                                <h3 className="text-lg font-medium capitalize flex items-center text-gray-800">
                                    {expandedSteps["metadata"] ? (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                        </svg>
                                    ) : (
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 mr-2"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    )}
                                    Metadata
                                </h3>
                            </div>

                            {expandedSteps["metadata"] && (
                                <div className="p-3 border-t">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2">
                                        {data.id && (
                                            <div className="py-1">
                                                <dt className="text-sm font-medium text-gray-500 mb-1">ID</dt>
                                                <dd className="text-sm">{data.id || "Unknown"}</dd>
                                            </div>
                                        )}
                                        {data.created_at && (
                                            <div className="py-1">
                                                <dt className="text-sm font-medium text-gray-500 mb-1">Created At</dt>
                                                <dd className="text-sm">
                                                    {getLastUpdated(data.created_at)}
                                                </dd>
                                            </div>
                                        )}
                                        {data.updated_at && (
                                            <div className="py-1">
                                                <dt className="text-sm font-medium text-gray-500 mb-1">Updated At</dt>
                                                <dd className="text-sm">
                                                    {getLastUpdated(data.updated_at)}
                                                </dd>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

