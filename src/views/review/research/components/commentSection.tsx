"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Textarea, Select } from "@mantine/core"
import { ResearchType } from "@/types/research"
import { ReportState } from "@/enums"

interface CommentSectionProps {
    audit: ResearchType
    onUpdateAudit: (audit: ResearchType) => void
}

export const CommentSection: React.FC<CommentSectionProps> = ({ audit, onUpdateAudit }) => {
    const [comment, setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmitComment = async () => {
        if (!comment.trim()) return

        setSubmitting(true)

        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 800))

        const updatedAudit: ResearchType = {
            ...audit,
            admin_comment: comment,
            state: ReportState.UPDATE_INFO,
        }

        onUpdateAudit(updatedAudit)
        setComment("")
        setSubmitting(false)
    }

    const handleStateChange = async (newState: string | null) => {
        if (!newState) return

        setSubmitting(true)

        await new Promise((resolve) => setTimeout(resolve, 500))

        const updatedAudit: ResearchType = {
            ...audit,
            state: newState as ReportState,
        }

        onUpdateAudit(updatedAudit)
        setSubmitting(false)
    }

    // Convert enum to Mantine <Select> format
    const reportStateOptions = Object.values(ReportState).map((state) => ({
        value: state,
        label: state,
    }))

    return (
        <div className="bg-console-card p-6 rounded-medium">
            <div className="mb-4">
                <div className="text-xl">Comments & Status</div>
            </div>
            <div className="space-y-4">
                <Select
                    label="Update Status"
                    placeholder="Pick status"
                    data={reportStateOptions}
                    value={audit.state}
                    onChange={handleStateChange}
                    disabled={submitting}
                    allowDeselect={false}
                    className="max-w-md"
                />

                {audit.admin_comment && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Previous Comment</h3>
                        <div className="rounded-md bg-muted p-3 text-sm">{audit.admin_comment}</div>
                    </div>
                )}

                <div className="space-y-2">
                    <Textarea
                        label='Add Comment'
                        placeholder="Enter your comment here..."
                        className="min-h-[120px]"
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        disabled={submitting}
                    />
                    <p className="text-xs text-muted-foreground">
                        Adding a comment will automatically set the status to "Update Info"
                    </p>
                </div>
            </div>
            <div>
                <button
                    className="flex items-center gap-2 mt-4 bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
                    onClick={handleSubmitComment}
                    disabled={!comment.trim() || submitting}
                >
                    {submitting ? "Submitting..." : "Submit Comment"}
                    <Send className="h-4 w-4" />
                </button>
            </div>
        </div>
    )
}
