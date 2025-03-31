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



interface Step2Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step2: React.FC<Step2Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Radio.Group
                    label="Your Codebase"
                    {...form.getInputProps('two.codebase')}
                >
                    <Group mt="xs">
                        <Radio
                            value="github"
                            label="GitHub Repository Link"
                        />
                        <Radio
                            value="zip"
                            label="Upload Code ZIP File"
                        />
                    </Group>
                </Radio.Group>
            </div>
            {form.values.two.codebase == 'github' &&
                <div className="mb-8">
                    <div className="mb-8 flex gap-x-8">
                        <InputWrapper label='Add Github Link'
                            className="min-w-80"
                        >
                            <Input
                                placeholder="https://github.com/repo/xxx"
                                {...form.getInputProps('two.gitLink')}
                            />
                        </InputWrapper>
                        <InputWrapper
                            label='Branch Hash for Audit'
                            className="min-w-80"
                        >
                            <Input
                                placeholder="https://github.com/repo/xxx"
                                {...form.getInputProps('two.gitHash')}
                            />
                        </InputWrapper>
                    </div>
                    <div className="flex">
                        <InputWrapper
                            label='Branch / Commit Hash for Audit'
                            className="min-w-80"
                        >
                            <Input
                                placeholder="Enter the branch ot commit hash"
                                {...form.getInputProps('two.gitBranch')}
                            />
                        </InputWrapper>
                    </div>
                </div>
            }
            {form.values.two.codebase == 'zip' &&
                <div className="mb-8">
                    <BaseDemo />
                </div>
            }
            <div className="mb-8">
                <Textarea
                    label="List of Smart Contracts to Audit"
                    placeholder="Enter the list of smart contracts that you want audited"
                    {...form.getInputProps('two.listOfSmartContracts')}
                />
            </div>
            <div className="mb-8">
                <Radio.Group
                    label="Are any of the contracts upgradeable?"
                    {...form.getInputProps('two.contractUpgradeable')}

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
            {form.values.two.contractUpgradeable == 'yes' &&
                <div className="mb-8">
                    <Textarea
                        label="Please explain the upgradeability pattern used"
                        placeholder="Describe the upgradeability pattern please"
                        {...form.getInputProps('two.contractUpgradeableDesc')}
                    />
                </div>}
            <div className="mb-8">
                <Radio.Group
                    label="Are any contracts already deployed?"
                    {...form.getInputProps('two.deployed')}
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
            {form.values.two.deployed == 'yes' &&
                <div className="mb-8">
                    <Textarea
                        label="Provide the deployed addresses and chain"
                        placeholder="Enter the deployed addresses and chain please"
                        {...form.getInputProps('two.deployedDesc')}
                    />
                </div>}
            <div className="mb-8">
                <Textarea
                    label="Does your project use third-party dependencies?"
                    placeholder="Please enter the third-party services, if any are used"
                    {...form.getInputProps('two.thirdParty')}
                />
            </div>
        </>
    )
} 