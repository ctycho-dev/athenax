import React, { useState } from "react";
import {
    TextInput
} from '@mantine/core';
import { DateInput } from '@mantine/dates';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';


const channels = [
    {
        label: 'Discord',
        value: 'discord'
    },
    {
        label: 'X',
        value: 'x'
    },
    {
        label: 'Telegram',
        value: 'telegram'
    }
]


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
                        placeholder="Official name of the project"
                        {...form.getInputProps('step1.name')}
                    />
                    <TextInput
                        label='Tagline'
                        placeholder="Summarize the project’s purpose"
                        {...form.getInputProps('step1.tagline')}
                    />
                </div>
                <div className="mb-8 grid grid-cols-2 gap-x-8">
                    <DateInput
                        {...form.getInputProps('step1.launchDate')}
                        label="Date input"
                        placeholder="Date input"
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
                    label='Primary Contact Name'
                    placeholder="Name of a key contact person"
                    {...form.getInputProps('step1.primaryContactName')}
                />
                <TextInput
                    label='Primary Contact Role'
                    placeholder="Role of a key contact person"
                    {...form.getInputProps('step1.primaryContactRole')}
                />
            </div>
            <div className="mb-8 grid grid-cols-2 gap-x-8">
                <TextInput
                    label={
                        <div className="flex gap-2 items-center">
                            <span>X Handle</span>
                            <span className="text-gray-3 opacity-50">Optional</span>
                        </div>
                    }
                    placeholder="Enter the handles"
                    {...form.getInputProps('step1.twitter')}
                />
                <TextInput
                    label={
                        <div className="flex gap-2 items-center">
                            <span>Discord Channel</span>
                            <span className="text-gray-3 opacity-50">Optional</span>
                        </div>
                    }
                    placeholder="Enter the handles"
                    {...form.getInputProps('step1.discord')}
                />
            </div>
            <div className="mb-8 grid grid-cols-2 gap-x-8">
                <TextInput
                    label={
                        <div className="flex gap-2 items-center">
                            <span>Telegram Channel</span>
                            <span className="text-gray-3 opacity-50">Optional</span>
                        </div>
                    }
                    placeholder="Enter the handles"
                    {...form.getInputProps('step1.telegram')}
                />
                <TextInput
                    label={
                        <div className="flex gap-2 items-center">
                            <span>Github Handle</span>
                            <span className="text-gray-3 opacity-50">Optional</span>
                        </div>
                    }
                    placeholder="Enter the handles"
                    {...form.getInputProps('step1.github')}
                />
            </div>
        </>
    )
} 