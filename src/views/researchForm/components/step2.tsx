import React, { useState } from "react";
import {
    Textarea,
    Select,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';



interface Step2Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step2: React.FC<Step2Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Textarea
                    label="Founders and Core Team"
                    placeholder="Biographies and relevant experience of the founding members and core team"
                    {...form.getInputProps('step2.foundersAndCoreTeam')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Advisors"
                    placeholder="Information about any advisors associated with the project"
                    {...form.getInputProps('step2.advisors')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Organizational Structure"
                    placeholder="Details on the project’s governance model, including any councils, committees, or DAOs"
                    {...form.getInputProps('step2.orgStructure')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Governance Processes"
                    placeholder="Overview of proposal processes, voting mechanisms, and decision-making frameworks"
                    {...form.getInputProps('step2.governance')}
                />
            </div>
        </>
    )
} 