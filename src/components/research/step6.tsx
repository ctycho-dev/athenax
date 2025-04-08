import React, { useState } from "react";
import {
    Textarea,
    Select,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';



interface Step6Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step6: React.FC<Step6Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Textarea
                    label="User Metrics"
                    placeholder="Data on active users, transaction volumes, and other relevant user engagement statistics"
                    {...form.getInputProps('step6.metrics')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Total Value Locked (TVL)"
                    placeholder="Amount of assets locked within the project’s protocols, if applicable"
                    {...form.getInputProps('step6.tvl')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Partnerships"
                    placeholder="List of strategic partnerships and collaborations"
                    {...form.getInputProps('step6.partnerships')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Community Engagement"
                    placeholder="Overview of community size, growth, and engagement across platforms"
                    {...form.getInputProps('step6.community')}
                />
            </div>
        </>
    )
} 