import React, { useEffect, useState } from "react";
import auditService from "@/api/auditService";
import { FormValues } from "@/types/audit";
import { Dashboard } from "@/components/audit/dashboard";


interface AuditDashboradProps { }


export const AuditDashborad: React.FC<AuditDashboradProps> = ({ }) => {
  const [audits, setAudits] = useState<FormValues[] | null>(null)

  useEffect(() => {

    const fetchAPI = async () => {
      const response = await auditService.getAuditAll()
      console.log(response.data)
      setAudits(response.data)
    }

    fetchAPI()
  }, [])
  return (
    <div className="bg-white min-h-screen">
      <main className="container mx-auto py-8 px-4 text-black">
        <h1 className="text-3xl font-bold mb-6 text-black-1">Audit Form Dashboard</h1>
        <div className="grid gap-4">
          {audits && audits.map((item, index) => {
            return <Dashboard key={`audit-${index}`} data={item} />
          })}
        </div>
      </main>
    </div>
  )
}
