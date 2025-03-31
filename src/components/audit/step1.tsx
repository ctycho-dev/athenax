import React, { useState } from "react";
import {
    Input,
    InputWrapper,
    Textarea,
    Select
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types';



interface Step1Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step1: React.FC<Step1Props> = ({ form }) => {

    // const inputStyles = {
    //     input: {
    //         background: '#0F1011',
    //         height: '48px',
    //         border: 'none',
    //         color: 'white'
    //     }
    // };

    // const labelStyles = {
    //     label: {
    //         color: '#949FA8',
    //         marginBottom: '12px'
    //     }
    // };

    // const dropDownStyles = {
    //     dropdown: {
    //         background: '#0F1011',
    //     }
    // }

    // const textareaStyles = {
    //     input: {
    //         minHeight: '150px',
    //         background: '#0F1011',
    //         border: 'none',
    //         padding: '16px',
    //         color: 'white',
    //         fontSize: '14px'
    //     }
    // }

    return (
        <>
            <div className="mb-8">
                <div className="mb-8 grid grid-cols-2 gap-x-8">
                    <InputWrapper label='Project Name'
                        // styles={labelStyles}
                        className="min-w-80"
                    >
                        <Input
                            placeholder="Athena"
                            // styles={inputStyles}
                            {...form.getInputProps('one.name')}
                        />
                    </InputWrapper>
                    <InputWrapper
                        label='Official Website URL'
                        // styles={labelStyles}
                        className="min-w-80"
                    >
                        <Input
                            placeholder="athena.co"
                            // styles={inputStyles}
                            {...form.getInputProps('one.website')}
                        />
                    </InputWrapper>
                </div>
                <div className="mb-8 grid grid-cols-2 gap-x-8">
                    <InputWrapper
                        label='Contact Person Name'
                        description=''
                        // styles={labelStyles}
                        className="min-w-80"
                    >
                        <Input
                            placeholder="Enter contact person name"
                            // styles={inputStyles}
                            {...form.getInputProps('one.contactName')}
                        />
                    </InputWrapper>
                    <InputWrapper
                        label='Contact Email'
                        description=''
                        // styles={labelStyles}
                        className="min-w-80"
                    >
                        <Input
                            placeholder="Enter contact email"
                            // styles={inputStyles}
                            {...form.getInputProps('one.contactEmail')}
                        />
                    </InputWrapper>
                </div>
            </div>
            <div className="mb-8 grid grid-cols-2 gap-x-8">
                <InputWrapper
                    label='Telegram / Discord Handle'
                    description=''
                    // styles={labelStyles}
                    className="min-w-80"
                >
                    <Input
                        placeholder="Enter one of the handles"
                        // styles={inputStyles}
                        {...form.getInputProps('one.telegram')}
                    />
                </InputWrapper>
                <Select
                    label="Ecosystem Category"
                    placeholder="Select One"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    // styles={{
                    //     ...labelStyles,
                    //     ...inputStyles,
                    //     ...dropDownStyles
                    // }}
                    {...form.getInputProps('one.ecosystem')}
                    className="w-full"
                />
            </div>
            <div className="mb-8 grid grid-cols-2 gap-x-8">
                <Select
                    label="Blockchains Used"
                    placeholder="Select One"
                    data={['React', 'Angular', 'Vue', 'Svelte']}
                    // styles={{
                    //     ...labelStyles,
                    //     ...inputStyles,
                    //     ...dropDownStyles
                    // }}
                    {...form.getInputProps('one.blockchain')}
                    className="w-full"
                />
                <div></div>
            </div>
            <div className="mb-8">
                <Textarea
                    label="Brief Description of the Project"
                    placeholder="Enter the project description"
                    // styles={{
                    //     ...labelStyles,
                    //     ...textareaStyles
                    // }}
                    {...form.getInputProps('one.description')}
                />
            </div>
        </>
    )
} 