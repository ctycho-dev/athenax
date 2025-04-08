import React, { useState } from "react";
import {
    Radio,
    Group,
    TextInput,
    Textarea
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/audit';
import { Dropbox } from "./dropbox";


interface Step3Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step3: React.FC<Step3Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Radio.Group
                    label="Whitepaper or Litepaper"
                    {...form.getInputProps('step3.whitepaper')}
                >
                    <Group mt="xs">
                        <Radio
                            value="link"
                            label="I’ll add the link"
                        />
                        <Radio
                            value="zip"
                            label="I’ll upload document"
                        />
                        <Radio
                            value="none"
                            label="I don’t have it"
                        />
                    </Group>
                </Radio.Group>
            </div>

            {form.values.step3.whitepaper === 'link' && (
                <div className="mb-8">
                    <TextInput
                        label="Link your whitepaper or litepaper"
                        placeholder="https://github.com/repo/xxx"
                        {...form.getInputProps('step3.whitepaperLink')}
                    />
                </div>
            )}

            {form.values.step3.whitepaper === 'zip' && (
                <div className="mb-8">
                    <Dropbox
                        form={form}
                        name="step3.whitepaperZip"
                        bucket='audit-form'
                    />
                </div>
            )}

            <div className="mb-8">
                <Radio.Group
                    label="Technical specification docs"
                    {...form.getInputProps('step3.techDocs')}
                >
                    <Group mt="xs">
                        <Radio
                            value="link"
                            label="I’ll add the link"
                        />
                        <Radio
                            value="zip"
                            label="I’ll upload document"
                        />
                        <Radio
                            value="none"
                            label="I don’t have it"
                        />
                    </Group>
                </Radio.Group>
            </div>

            {form.values.step3.techDocs === 'link' && (
                <div className="mb-8">
                    <TextInput
                        label="Link your technical docs"
                        placeholder="Please link your technical docs"
                        {...form.getInputProps('step3.techDocsLink')}
                    />
                </div>
            )}

            {form.values.step3.techDocs === 'zip' && (
                <div className="mb-8">
                    <Dropbox
                        form={form}
                        name="step3.techDocsZip"
                        bucket='audit-form'
                    />
                </div>
            )}


            <div className="mb-8">
                <Radio.Group
                    label="Tokenomics"
                    {...form.getInputProps('step3.tokenomics')}
                >
                    <Group mt="xs">
                        <Radio
                            value="link"
                            label="I’ll add the link"
                        />
                        <Radio
                            value="zip"
                            label="I’ll upload document"
                        />
                        <Radio
                            value="none"
                            label="I don’t have it"
                        />
                    </Group>
                </Radio.Group>
            </div>

            {form.values.step3.tokenomics === 'link' && (
                <div className="mb-8">
                    <TextInput
                        label="Link your tokenomics"
                        placeholder="Please link your technical docs"
                        {...form.getInputProps('step3.tokenomicsLink')}
                    />
                </div>
            )}

            {form.values.step3.tokenomics === 'zip' && (
                <div className="mb-8">
                    <Dropbox
                        form={form}
                        name="step3.tokenomicsZip"
                        bucket='audit-form'
                    />
                </div>
            )}

            <div className="mb-8">
                <Radio.Group
                    label="Smart contract architecture diagrams"
                    {...form.getInputProps('step3.smartContract')}
                >
                    <Group mt="xs">
                        <Radio
                            value="link"
                            label="I’ll add the link"
                        />
                        <Radio
                            value="zip"
                            label="I’ll upload document"
                        />
                        <Radio
                            value="none"
                            label="I don’t have it"
                        />
                    </Group>
                </Radio.Group>
            </div>

            {form.values.step3.smartContract === 'link' && (
                <div className="mb-8">
                    <TextInput
                        label="Link your smart contract diagram"
                        placeholder="Please link your smart contract diagram"
                        {...form.getInputProps('step3.smartContractLink')}
                    />
                </div>
            )}

            {form.values.step3.smartContract === 'zip' && (
                <div className="mb-8">
                    <Dropbox
                        form={form}
                        name="step3.smartContractZip"
                        bucket='audit-form'
                    />
                </div>
            )}
        </>
    )
} 