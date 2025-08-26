import React, { useState } from "react";
import {
    Textarea,
    Select,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';



interface Step4Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step4: React.FC<Step4Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Textarea
                    label="Token Details"
                    placeholder="Name, ticker, and contract addresses on various blockchains"
                    {...form.getInputProps('step4.tokenDetails')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Utilities"
                    placeholder="Functions and use cases of the token within the ecosystem"
                    {...form.getInputProps('step4.utilities')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Supply Information"
                    placeholder="Total supply, circulating supply, and any mechanisms affecting supply (e.g., burning, minting)."
                    {...form.getInputProps('step4.supply')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Distribution"
                    placeholder="Allocation breakdown (e.g., team, investors, community) and vesting schedules"
                    {...form.getInputProps('step4.distribution')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Emission Schedule"
                    placeholder="Details on how and when new tokens are introduced into circulation"
                    {...form.getInputProps('step4.emission')}
                />
            </div>
        </>
    )
} 