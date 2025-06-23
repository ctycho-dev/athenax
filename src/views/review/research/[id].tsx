import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { format } from "date-fns";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import { useGetResearchQuery } from "@/services/researchApi";
import Loading from "@/components/layout/loading";
import State from "../../submitMaterials/components/state";
import { FaArrowLeft } from "react-icons/fa6";
import { usePageColorScheme } from "@/hooks/usePageTheme";
import { ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react";
import { CommentSection } from "./components/commentSection";
import { ResearchType } from "@/types/research"; // ⬅️ Ensure this exists and is accurate
import { ReportState } from "@/enums";

export const ResearchReviewRecord: React.FC = () => {
  usePageColorScheme("light");

  const { id: recordId } = useParams();
  const navigate = useNavigate();
  const privyToken = useSelector((state: RootState) => state.auth.privyToken);

  const {
    data,
    isLoading,
    isError,
    error,
  } = useGetResearchQuery(recordId || "", {
    skip: !privyToken || !recordId,
  });

  useEffect(() => {
    if (isError) {
      console.error("Error fetching research data:", error);
    }
  }, [isError, error]);

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (key: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (isLoading || !data) return <Loading />;

  const research = data as ResearchType;

  return (
    <div className="text-white">
      <main className="container mx-auto py-6 px-6">
        <div className="mb-6">
          <button
            className="text-border flex items-center gap-2 hover:cursor-pointer hover:text-white p-2"
            onClick={() => navigate(-1)}
          >
            <FaArrowLeft />
            <span>Back to Dashboard</span>
          </button>
        </div>

        <div className="flex items-center gap-2 mb-6">
          <h1 className="text-3xl font-bold">{research.steps.step1?.name || "Research Audit"}</h1>
          <State state={research.state} />
        </div>

        <div className="mb-6">
          <div>
            <span className="font-medium text-gray-3">Last Updated At:</span>{" "}
            {format(new Date(research.updated_at), "PPPpp")}
          </div>
          <div>
            <span className="font-medium text-gray-3">Created At:</span>{" "}
            {format(new Date(research.created_at), "PPPpp")}
          </div>
        </div>

        {Object.entries(research.steps).map(([key, step], index) => (
          <div key={key} className="bg-console-card p-6 rounded-medium mb-4">
            <div
              className="cursor-pointer flex flex-row items-center justify-between"
              onClick={() => toggleSection(key)}
            >
              <div className="text-xl capitalize">{`Step ${index + 1}`}</div>
              {expandedSections[key] ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>

            {expandedSections[key] && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(step).map(([fieldKey, fieldValue]) => {
                    const isLink = fieldKey.toLowerCase().includes("link");
                    const isFile =
                      typeof fieldValue === "object" &&
                      fieldValue !== null &&
                      "original_filename" in fieldValue;

                    return (
                      <div key={fieldKey} className="space-y-1">
                        <p className="text-sm font-medium text-gray-3">{fieldKey}</p>

                        {isLink ? (
                          <a
                            href={String(fieldValue)}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary hover:underline flex items-center gap-1"
                          >
                            {String(fieldValue)}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ) : isFile ? (
                          <button className="flex items-center gap-1.5">
                            <FileText className="h-4 w-4" />
                            {(fieldValue as { original_filename: string }).original_filename}
                          </button>
                        ) : (
                          <p>{String(fieldValue)}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ))}

        <CommentSection audit={research} onUpdateAudit={() => { }} />
      </main>
    </div>
  );
};
