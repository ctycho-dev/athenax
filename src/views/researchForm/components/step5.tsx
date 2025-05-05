import React, { useState } from "react";
import {
    Textarea,
    Select,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';



interface Step5Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step5: React.FC<Step5Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Textarea
                    label="Funding Rounds"
                    placeholder="Information on past and current funding rounds, including amounts raised and key investors."
                    {...form.getInputProps('step5.funding')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Revenue Streams"
                    placeholder="Explanation of how the project generates revenue"
                    {...form.getInputProps('step5.revenue')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Treasury Holdings"
                    placeholder="Current assets and financial health of the project’s treasury"
                    {...form.getInputProps('step5.treasury')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Runway"
                    placeholder="Estimated financial runway based on current expenditures and treasury holdings"
                    {...form.getInputProps('step5.runway')}
                />
            </div>
        </>
    )
} 