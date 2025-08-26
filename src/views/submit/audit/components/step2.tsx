import React, { useState } from "react";
import {
    Radio,
    Group,
    TextInput,
    Textarea
} from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/audit';
import { Dropbox } from "@/views/submit/audit/components/dropbox";



interface Step2Props {
    form: ReturnType<typeof useForm<FormValues>>;
}


export const Step2: React.FC<Step2Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Radio.Group
                    label="Your Codebase"
                    {...form.getInputProps('step2.codebase')}
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
            {form.values.step2.codebase == 'github' &&
                <div>
                    <div className="mb-8 grid grid-cols-2 gap-x-8">
                        <TextInput
                            label='Add Github Link'
                            placeholder="https://github.com/repo/xxx"
                            {...form.getInputProps('step2.gitLink')}
                            error={form.errors['step2.gitLink']}
                        />
                        <TextInput
                            label='Branch Hash for Audit'
                            placeholder="https://github.com/repo/xxx"
                            {...form.getInputProps('step2.gitHash')}
                            error={form.errors['step2.gitHash']}
                        />
                    </div>
                    <div className="mb-8 grid grid-cols-2 gap-x-8">
                        <TextInput
                            label='Branch / Commit Hash for Audit'
                            placeholder="Enter the branch ot commit hash"
                            {...form.getInputProps('step2.gitBranch')}
                            error={form.errors['step2.gitBranch']}
                        />
                    </div>
                </div>
            }
            {form.values.step2.codebase == 'zip' &&
                <div className="mb-8">
                    <Dropbox form={form} name="step2.codebaseZip" bucket='audit-form' />
                </div>
            }
            <div className="mb-8">
                <Textarea
                    label={
                        <div className="flex gap-2 items-center">
                            <span>List of Smart Contracts to Audit</span>
                            <span className="text-gray-3 opacity-50">Contract names + File paths</span>
                        </div>
                    }
                    placeholder="Enter the list of smart contracts that you want audited"
                    {...form.getInputProps('step2.listOfSmartContracts')}
                />
            </div>
            <div className="mb-8">
                <Radio.Group
                    label="Are any of the contracts upgradeable?"
                    {...form.getInputProps('step2.contractUpgradeable')}

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
            {form.values.step2.contractUpgradeable == 'yes' &&
                <div className="mb-8">
                    <Textarea
                        label="Please explain the upgradeability pattern used"
                        placeholder="Describe the upgradeability pattern please"
                        {...form.getInputProps('step2.contractUpgradeableDesc')}
                    />
                </div>}
            <div className="mb-8">
                <Radio.Group
                    label="Are any contracts already deployed?"
                    {...form.getInputProps('step2.deployed')}
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
            {form.values.step2.deployed == 'yes' &&
                <div className="mb-8">
                    <Textarea
                        label="Provide the deployed addresses and chain"
                        placeholder="Enter the deployed addresses and chain please"
                        {...form.getInputProps('step2.deployedDesc')}
                    />
                </div>}
            <div className="mb-8">
                <Textarea
                    label={
                        <div className="flex gap-2 items-center">
                            <span>Does your project use third-party dependencies?</span>
                            <span className="text-gray-3 opacity-50">e.g., Chainlink, Uniswap</span>
                        </div>
                    }
                    placeholder="Please enter the third-party services, if any are used"
                    {...form.getInputProps('step2.thirdParty')}
                />
            </div>
        </>
    )
} 