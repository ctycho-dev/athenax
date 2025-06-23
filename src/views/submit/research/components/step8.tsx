import React, { useState } from "react";
import {
    Textarea,
    Select,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';



interface Step8Props {
    form: ReturnType<typeof useForm<FormValues>>;
}

// Risks and Challenges
export const Step8: React.FC<Step8Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Textarea
                    label="Identified Risks"
                    placeholder="Potential risks and challenges faced by the project"
                    {...form.getInputProps('step8.risks')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Mitigation Strategies"
                    placeholder="Plans and measures in place to address identified risks"
                    {...form.getInputProps('step8.strategies')}
                />
            </div>
        </>
    )
} 