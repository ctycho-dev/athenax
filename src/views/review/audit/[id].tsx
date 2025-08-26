import React, { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { format } from 'date-fns';
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';
import { useGetAuditQuery } from "@/services/auditApi";
import Loading from "@/components/layout/loading";
import { AuditType } from "@/types/audit";
import State from "../../submitMaterials/components/state";
import { FaArrowLeft } from "react-icons/fa6";
import { usePageColorScheme } from '@/hooks/usePageTheme';
import { ChevronDown, ChevronUp, ExternalLink, FileText } from "lucide-react";
import { CommentSection } from "./components/commentSection";

export const AuditReviewRecord: React.FC = () => {
  usePageColorScheme('light');

  const { id: recordId } = useParams();
  const navigate = useNavigate();
  const privyToken = useSelector((state: RootState) => state.auth.privyToken);

  const { data, isLoading } = useGetAuditQuery(recordId || '', {
    skip: !privyToken || !recordId,
  });

  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (isLoading || !data) return <Loading />;

  const audit = data as AuditType; // ✅ Type assertion

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
          <h1 className="text-3xl font-bold">{audit.steps.step1.name}</h1>
          <State state={audit.state} />
        </div>

        <div className="mb-6">
          <div>
            <span className="font-medium text-gray-3">Last Updated At:</span>{" "}
            {format(new Date(audit.updated_at), 'PPPpp')}
          </div>
          <div>
            <span className="font-medium text-gray-3">Created At:</span>{" "}
            {format(new Date(audit.created_at), 'PPPpp')}
          </div>
        </div>

        {Object.entries(audit.steps).map(([key, step], index) => (
          <div key={key} className="bg-console-card p-6 rounded-medium mb-4">
            <div
              className="cursor-pointer flex flex-row items-center justify-between"
              onClick={() => toggleSection(key)}
            >
              <div className="text-xl capitalize">{`Step ${index + 1}`}</div>
              {expandedSections[key] ? (
                <ChevronUp className="h-4 w-4" />
              ) : (
                <ChevronDown className="h-4 w-4" />
              )}
            </div>

            {expandedSections[key] && (
              <div className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(step).map(([fieldKey, fieldValue]) => {
                    const isLink = fieldKey.toLowerCase().includes('link');
                    const isFile = typeof fieldValue === 'object' && fieldValue !== null && 'original_filename' in fieldValue;

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

        <CommentSection audit={audit} />
      </main>
    </div>
  );
};
