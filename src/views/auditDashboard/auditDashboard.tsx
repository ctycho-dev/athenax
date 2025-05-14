import React, { useEffect, useState } from "react";
import { RootState } from "@/store/store";
import { useSelector } from 'react-redux';
import { useGetAuditAllQuery } from "@/services/auditApi";
import auditService from "@/api/auditService";
import { FormValues } from "@/types/audit";
import { Dashboard } from "@/views/auditDashboard/components/dashboard";


interface AuditDashboradProps { }


export const AuditDashborad: React.FC<AuditDashboradProps> = ({ }) => {
  // const [audits, setAudits] = useState<FormValues[] | null>(null)
  const privyToken = useSelector((state: RootState) => state.auth.privyToken);

  const {
    data: audits,
    isLoading: isAuditsLoading
  } = useGetAuditAllQuery(undefined, {
    skip: !privyToken
  });
  

  return (
    <div className="text-white">
      <main className="container mx-auto py-8 px-4 ">
        <h1 className="text-3xl font-bold mb-6 ">Audit Form Dashboard</h1>
        <div className="grid gap-4">
          {audits && audits.map((item, index) => {
            return <Dashboard key={`audit-${index}`} data={item} />
          })}
        </div>
      </main>
    </div>
  )
}
