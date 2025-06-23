import React, { useState } from "react";
import {
    Radio,
    Group,
    TextInput,
    Textarea
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { FormValues } from '@/types/research';
import { Dropbox } from "@/views/submit/research/components/dropbox";




interface Step10Props {
    form: ReturnType<typeof useForm<FormValues>>;
}

// Additional Resources
export const Step10: React.FC<Step10Props> = ({ form }) => {

    return (
        <>
            <div className="mb-8">
                <Radio.Group
                    label="Whitepapers and Research"
                    {...form.getInputProps('step10.whitepaper')}
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

            {form.values.step10.whitepaper === 'link' && (
                <div className="mb-8">
                    <Textarea
                        placeholder="User-generated content, testimonials, or case studies"
                        {...form.getInputProps('step10.whitepaperLink')}
                    />
                </div>
            )}

            {form.values.step10.whitepaper === 'zip' && (
                <div className="mb-8">
                    <Dropbox
                        form={form}
                        name="step10.whitepaperZip"
                        bucket='researches-form'
                    />
                </div>
            )}

            <div className="mb-8">
                <Radio.Group
                    label="FAQs"
                    {...form.getInputProps('step10.faq')}
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

            {form.values.step10.faq === 'link' && (
                <div className="mb-8">
                    <Textarea
                        placeholder="User-generated content, testimonials, or case studies"
                        {...form.getInputProps('step10.faqLink')}
                    />
                </div>
            )}

            {form.values.step10.faq === 'zip' && (
                <div className="mb-8">
                    <Dropbox
                        form={form}
                        name="step10.faqZip"
                        bucket='researches-form'
                    />
                </div>
            )}

            <div className="mb-8">
                <Radio.Group
                    label="Educational Materials"
                    {...form.getInputProps('step10.materials')}
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

            {form.values.step10.materials === 'link' && (
                <div className="mb-8">
                    <Textarea
                        placeholder="User-generated content, testimonials, or case studies"
                        {...form.getInputProps('step10.materialsLink')}
                    />
                </div>
            )}

            {form.values.step10.materials === 'zip' && (
                <div className="mb-8">
                    <Dropbox
                        form={form}
                        name="step10.materialsZip"
                        bucket='researches-form'
                    />
                </div>
            )}
        </>
    )
} 