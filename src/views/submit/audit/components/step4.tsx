import React, { useState } from "react";
import {
    Radio,
    Group,
    TextInput,
    Textarea
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/audit';



interface Step4Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step4: React.FC<Step4Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8 grid grid-cols-2 gap-x-8">
                <TextInput
                    label="What development framework are you using?"
                    placeholder="Hardhat / Foundry / Truffle / Brownie / Other"
                    {...form.getInputProps('step4.framework')}
                />
                <div></div>
            </div>
            <div className="mb-8">
                <Radio.Group
                    label="Do you have automated tests written?"
                    {...form.getInputProps('step4.test')}
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

            {form.values.step4.test === 'yes' && (
                <div className="mb-8">
                    <Textarea
                        label="Test instructions"
                        placeholder="Please provide instructions on how to run them"
                        {...form.getInputProps('step4.testDesc')}
                    />
                </div>
            )}

            <div className="mb-8">
                <Radio.Group
                    label="Have you deployed on testnet?"
                    {...form.getInputProps('step4.testnet')}
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

            {form.values.step4.testnet === 'yes' && (
                <div className="mb-8 grid grid-cols-2 gap-x-8">
                    <TextInput
                        label="Testnet addresses"
                        placeholder="Please provide testnet addresses"
                        {...form.getInputProps('step4.testnetLink')}
                    />
                    <div></div>
                </div>
            )}
            <div className="">
                <Textarea
                    label="Is there a known threat model or list of concerns you want us to focus on?"
                    placeholder="Optional, but helpful"
                    {...form.getInputProps('step4.thread')}
                />
            </div>
        </>
    )
} 