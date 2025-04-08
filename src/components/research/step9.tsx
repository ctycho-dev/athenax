import React, { useState } from "react";
import {
    Radio,
    Group,
    TextInput,
    Textarea
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';
import { Dropbox } from "../research/dropbox";



interface Step9Props {
    form: ReturnType<typeof useForm<FormValues>>;
}

// Media and Branding
export const Step9: React.FC<Step9Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Textarea
                    label="Media Coverage"
                    placeholder="Links to notable press releases, articles, and media mentions"
                    {...form.getInputProps('step9.mediaCoverage')}
                />
            </div>
            <div className="mb-8">
                <Textarea
                    label="Community Content"
                    placeholder="User-generated content, testimonials, or case studies"
                    {...form.getInputProps('step9.communityContent')}
                />
            </div>
            <div className="mb-8">
                <Radio.Group
                    label="Brand Assets"
                    {...form.getInputProps('step9.brand')}
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
                    </Group>
                </Radio.Group>
            </div>

            {form.values.step9.brand === 'link' && (
                <div className="mb-8">
                    <Textarea
                        placeholder="User-generated content, testimonials, or case studies"
                        {...form.getInputProps('step9.brandLink')}
                    />
                </div>
            )}

            {form.values.step9.brand === 'zip' && (
                <div className="mb-8">
                    <Dropbox
                        form={form}
                        name="step9.brandZip"
                        bucket='researches-form'
                    />
                </div>
            )}
        </>
    )
} 