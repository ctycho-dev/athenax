import React, { useState } from "react";
import {
    Textarea,
    Select,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';



interface Step7Props {
    form: ReturnType<typeof useForm<FormValues>>;
}

// Regulatory and Compliance
export const Step7: React.FC<Step7Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Textarea
                    label="Legal Entity"
                    placeholder="Information on the legal structure and jurisdiction of the project"
                    {...form.getInputProps('step7.legalEntity')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Compliance Measures"
                    placeholder="Steps taken to comply with relevant regulations and any legal considerations"
                    {...form.getInputProps('step7.compliance')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Audits"
                    placeholder="Details of any security audits or assessments conducted"
                    {...form.getInputProps('step7.audits')}
                />
            </div>
        </>
    )
} 