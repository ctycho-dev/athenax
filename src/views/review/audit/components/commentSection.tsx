"use client"

import { useState } from "react"
import { Send } from "lucide-react"
import { Textarea, Select } from "@mantine/core"
import { AuditType } from "@/types/audit"
import { ReportState } from "@/enums"
import {
    useAddAuditCommentMutation,
    useUpdateAuditStateMutation
} from "@/services/auditApi"

interface CommentSectionProps {
    audit: AuditType
}

export const CommentSection: React.FC<CommentSectionProps> = ({ audit }) => {
    const [comment, setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const [addComment] = useAddAuditCommentMutation()
    const [updateState] = useUpdateAuditStateMutation()

    const handleSubmitComment = async () => {
        if (!comment.trim()) return

        setSubmitting(true)
        setError(null)

        try {
            await addComment({ id: audit.id, comment: comment }).unwrap()
            setComment("")
        } catch (err: any) {
            console.error("Error submitting comment:", err)
            setError("Failed to submit comment. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

    const handleStateChange = async (newState: string | null) => {
        if (!newState) return

        setSubmitting(true)
        setError(null)

        try {
            await updateState({ id: audit.id, state: newState as ReportState }).unwrap()

        } catch (err: any) {
            console.error("Error updating state:", err)
            setError("Failed to update status. Please try again.")
        } finally {
            setSubmitting(false)
        }
    }

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

                {audit.comments && audit.comments?.length > 0 && (
                    <div className="space-y-2">
                        <h3 className="text-sm font-medium">Previous Comment</h3>
                        <div className="rounded-md bg-muted p-3 text-sm">
                            {audit.comments[audit.comments.length - 1].content}
                        </div>
                    </div>
                )}

                <div className="space-y-2">
                    <Textarea
                        label="Add Comment"
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

                {error && <p className="text-sm text-red-500">{error}</p>}

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
