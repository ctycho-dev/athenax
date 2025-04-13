import React, { useState } from "react";
import {
    Textarea,
    Select,
    TextInput
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/audit';
import { ecosystemCategory, blochainList } from "@/store/index";


interface Step1Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step1: React.FC<Step1Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <div className="mb-8 grid grid-cols-2 gap-x-8">
                    <TextInput
                        label='Project Name'
                        placeholder="Enter Project Name"
                        {...form.getInputProps('step1.name')}
                    />
                    <TextInput
                        label='Official Website URL'
                        placeholder="Enter official URL"
                        {...form.getInputProps('step1.website')}
                    />
                </div>
                <div className="mb-8 grid grid-cols-2 gap-x-8">
                    <TextInput
                        label='Contact Person Name'
                        placeholder="Enter contact person name"
                        {...form.getInputProps('step1.contactName')}
                    />
                    <TextInput
                        label='Contact Email'
                        placeholder="Enter contact email"
                        {...form.getInputProps('step1.contactEmail')}
                    />
                </div>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-x-8">
                <TextInput
                    label={
                        <div className="flex gap-2 items-center">
                            <span>Telegram / Discord Handle</span>
                            <span className="text-gray-3 opacity-50">Optional</span>
                        </div>
                    }
                    placeholder="Enter one of the handles"
                    {...form.getInputProps('step1.telegram')}
                />
                <Select
                    label="Ecosystem Category"
                    placeholder="Select One"
                    error="Invalid name"
                    data={ecosystemCategory}
                    searchable
                    {...form.getInputProps('step1.ecosystem')}
                    className="w-full"
                />
            </div>
            <div className="mb-8 grid grid-cols-2 gap-x-8">
                <Select
                    label="Blockchains Used"
                    error
                    placeholder="Select One"
                    data={blochainList}
                    searchable
                    {...form.getInputProps('step1.blockchain')}
                    className="w-full"
                />
                <div></div>
            </div>
            <div className="mb-8">
                <Textarea
                    label={
                        <div className="flex gap-2 items-center">
                            <span>Brief Description of the Project</span>
                            <span className="text-gray-3 opacity-50">1–3 sentences</span>
                        </div>
                    }
                    placeholder="Enter the project description"
                    {...form.getInputProps('step1.description')}
                />
            </div>
        </>
    )
} 