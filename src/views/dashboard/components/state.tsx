import React from "react";
import { ReportState } from "@/enums";

interface StateProps {
    state: ReportState
}

const State: React.FC<StateProps> = ({ state }) => {

    return (
        <>
            {state == ReportState.SUBMITTED &&
                <div className="bg-state-bg-submited border border-gray-3 px-3 h-7 text-sm flex items-center rounded-4xl w-max">
                    {state}
                </div>
            }
            {/* Checking */}
            {state == ReportState.CHECKING &&
                <div className="bg-state-bg-checking border border-state-checking px-3 h-7 text-sm flex items-center rounded-4xl w-max">
                    {state}
                </div>
            }
            {/* Writing */}
            {state == ReportState.WRITING &&
                <div className="bg-state-bg-writing border border-light-blue-3 px-3 h-7 text-sm flex items-center rounded-4xl w-max">
                    {state}
                </div>
            }
            {/* Update */}
            {state == ReportState.UPDATE_INFO &&
                <div className="bg-state-bg-update border border-state-update px-3 h-7 text-sm flex items-center rounded-4xl w-max">
                    {state}
                </div>
            }
            {/* Completed */}
            {state == ReportState.COMPLETED &&
                <div className="bg-emerald-800 border border-emerald-600 px-3 h-7 text-sm flex items-center rounded-4xl w-max">
                    {state}
                </div>
            }

            {/* Completed */}
            {state == ReportState.REJECTED &&
                <div className="bg-red-900 border border-red-700 px-3 h-7 text-sm flex items-center rounded-4xl w-max">
                    {state}
                </div>
            }
        </>
    )
}

export default State 