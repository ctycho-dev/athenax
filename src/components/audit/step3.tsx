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


interface Step3Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step3: React.FC<Step3Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Radio.Group
                    label="Whitepaper or Litepaper"
                    {...form.getInputProps('three.whitepaper')}
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

            {form.values.three.whitepaper === 'link' && (
                <div className="mb-8">
                    <InputWrapper
                        label="Link your whitepaper or litepaper"
                        className="min-w-80"
                    >
                        <Input
                            placeholder="https://github.com/repo/xxx"
                            {...form.getInputProps('three.whitepaperLink')}
                        />
                    </InputWrapper>
                </div>
            )}

            {form.values.three.whitepaper === 'zip' && (
                <div className="mb-8">
                    <BaseDemo
                    // onFilesSelected={(files) => {
                    //     form.setFieldValue('three.uploadedDocument', files);
                    // }}
                    />
                </div>
            )}

            <div className="mb-8">
                <Radio.Group
                    label="Technical specification docs"
                    {...form.getInputProps('three.techDocs')}
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

            {form.values.three.techDocs === 'link' && (
                <div className="mb-8">
                    <InputWrapper
                        label="Link your technical docs"
                        className="min-w-80"
                    >
                        <Input
                            placeholder="Please link your technical docs"
                            {...form.getInputProps('three.techDocsLink')}
                        />
                    </InputWrapper>
                </div>
            )}

            {form.values.three.techDocs === 'zip' && (
                <div className="mb-8">
                    <BaseDemo
                    // onFilesSelected={(files) => {
                    //     form.setFieldValue('three.uploadedDocument', files);
                    // }}
                    />
                </div>
            )}


            <div className="mb-8">
                <Radio.Group
                    label="Tokenomics"
                    {...form.getInputProps('three.tokenomics')}
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

            {form.values.three.tokenomics === 'link' && (
                <div className="mb-8">
                    <InputWrapper
                        label="Link your tokenomics"
                        className="min-w-80"
                    >
                        <Input
                            placeholder="Please link your technical docs"
                            {...form.getInputProps('three.tokenomicsLink')}
                        />
                    </InputWrapper>
                </div>
            )}

            {form.values.three.tokenomics === 'zip' && (
                <div className="mb-8">
                    <BaseDemo
                    // onFilesSelected={(files) => {
                    //     form.setFieldValue('three.uploadedDocument', files);
                    // }}
                    />
                </div>
            )}

            <div className="mb-8">
                <Radio.Group
                    label="Smart contract architecture diagrams"
                    {...form.getInputProps('three.smartContract')}
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

            {form.values.three.smartContract === 'link' && (
                <div className="mb-8">
                    <InputWrapper
                        label="Link your smart contract diagram"
                        className="min-w-80"
                    >
                        <Input
                            placeholder="Please link your smart contract diagram"
                            {...form.getInputProps('three.smartContractLink')}
                        />
                    </InputWrapper>
                </div>
            )}

            {form.values.three.smartContract === 'zip' && (
                <div className="mb-8">
                    <BaseDemo
                    // onFilesSelected={(files) => {
                    //     form.setFieldValue('three.uploadedDocument', files);
                    // }}
                    />
                </div>
            )}
        </>
    )
} 