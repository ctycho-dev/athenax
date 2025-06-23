import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';
import { useGetResearchAllQuery } from "@/services/researchApi";
import auditService from "@/api/auditService";
import { FormValues } from "@/types/audit";
import { Dashboard } from "@/views/review/audit/components/dashboard";
import State from "../../submitMaterials/components/state";
import { ReportState } from "@/enums";
import PageTitle from "@/components/ui/pageTitle";


interface ResearchReviewProps { }


export const ResearchReview: React.FC<ResearchReviewProps> = ({ }) => {
  // const [audits, setAudits] = useState<FormValues[] | null>(null)
  const navigate = useNavigate()
  const privyToken = useSelector((state: RootState) => state.auth.privyToken);

  const {
    data,
    isLoading: isAuditsLoading,
  } = useGetResearchAllQuery(undefined, {
    skip: !privyToken
  });

  useEffect(() => {
    console.log(data)
  }, [data])



  return (
    <div className="text-white">
      <div className="border-b border-gray-2 px-6 py-3.5 flex justify-between items-center">
        <PageTitle>Research Review</PageTitle>
      </div>
      <main className="container mx-auto py-8 px-6 ">
        <div className="grid gap-4">
          <table className="bg-console-card w-full overflow-scroll rounded-medium">
            <thead>
              <tr className="border-b border-gray-2">
                <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Project Name</th>
                <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Status</th>
                <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Code</th>
                <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Researcher Response</th>
                <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Updated At</th>
                <th className="px-4 py-4 text-gray-3 font-normal text-sm text-start">Created At</th>
              </tr>
            </thead>
            <tbody>
              {data && data.map((item) => (
                <tr key={item.id} className="[&:not(:last-child)]:border-b border-gray-2" onClick={() => navigate(`/review/research/${item.id}`)}>
                  <td className="px-4 py-4 text-sm font-medium">
                    {item.steps.step1.name}
                  </td>
                  <td className="px-4 py-4">
                    <State state={item.state} />
                  </td>
                  <td className="px-4 py-4">
                    id
                  </td>
                  <td className="px-4 py-4 text-sm font-medium">
                    {item.admin_comment || 'No response yet'}
                  </td>
                  <td className="px-4 py-4 w-max">
                    {item.updated_at}
                  </td>
                  <td className="px-4 py-4 w-max">
                    {item.created_at}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  )
}
