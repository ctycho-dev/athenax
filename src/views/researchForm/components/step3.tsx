import React, { useState } from "react";
import {
    Textarea,
    Select,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';



interface Step3Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step3: React.FC<Step3Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Textarea
                    label="Product Description"
                    placeholder="Detailed explanation of the products or services offered"
                    {...form.getInputProps('step3.productDesc')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Use Cases"
                    placeholder="Specific problems the project aims to solve and its applications"
                    {...form.getInputProps('step3.useCases')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Technical Architecture"
                    placeholder="Information on the technology stack, including protocols, platforms, and any unique technological innovations"
                    {...form.getInputProps('step3.techArchitecture')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Integrations"
                    placeholder="Details on integrations with other platforms or services"
                    {...form.getInputProps('step3.integrations')}
                />
            </div>
        </>
    )
} 