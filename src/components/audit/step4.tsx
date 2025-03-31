import React, { useState } from "react";
import {
    Radio,
    Group,
    Input,
    InputWrapper,
    Textarea
} from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types';
import { BaseDemo } from "./dropbox";



interface Step4Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step4: React.FC<Step4Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8 grid grid-cols-2 gap-x-8">
                <InputWrapper
                    label="What development framework are you using?"
                    className="min-w-80"
                >
                    <Input
                        placeholder="Hardhat / Foundry / Truffle / Brownie / Other"
                        {...form.getInputProps('four.framework')}
                    />
                </InputWrapper>
                <div></div>
            </div>
            <div className="mb-8">
                <Radio.Group
                    label="Do you have automated tests written?"
                    {...form.getInputProps('four.test')}
                >
                    <Group mt="xs">
                        <Radio
                            value="yes"
                            label="Yes"
                        />
                        <Radio
                            value="no"
                            label="No"
                        />
                    </Group>
                </Radio.Group>
            </div>

            {form.values.four.test === 'yes' && (
                <div className="mb-8">
                    <Textarea
                        label="Test instructions"
                        placeholder="Please provide instructions on how to run them"
                        {...form.getInputProps('four.testDesc')}
                    />
                </div>
            )}

            <div className="mb-8">
                <Radio.Group
                    label="Have you deployed on testnet?"
                    {...form.getInputProps('four.testnet')}
                >
                    <Group mt="xs">
                        <Radio
                            value="yes"
                            label="Yes"
                        />
                        <Radio
                            value="no"
                            label="No"
                        />
                    </Group>
                </Radio.Group>
            </div>

            {form.values.four.testnet === 'yes' && (
                <div className="mb-8 grid grid-cols-2 gap-x-8">
                    <InputWrapper
                        label="Testnet addresses"
                        className="min-w-80"
                    >
                        <Input
                            placeholder="Please provide testnet addresses"
                            {...form.getInputProps('four.testnetLink')}
                        />
                    </InputWrapper>
                    <div></div>
                </div>
            )}
            <div className="">
                <Textarea
                    label="Is there a known threat model or list of concerns you want us to focus on?"
                    placeholder="Optional, but helpful"
                    {...form.getInputProps('four.thread')}
                />
            </div>
        </>
    )
} 