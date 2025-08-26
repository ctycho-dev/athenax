import React, { useEffect, useState } from 'react';
import { Group, Text } from '@mantine/core';
import { Dropzone, MIME_TYPES, FileRejection } from '@mantine/dropzone';
import { useForm } from '@mantine/form';
import { FormValues, FileFields } from '@/types/research';
import { FileType } from '@/types';
import zip from '@/assets/audit/zip.svg'
import fileGradient from '@/assets/audit/file-gradient.png'
import fileIcon from '@/assets/audit/file-icon.svg'
import { toast } from 'sonner';
import clsx from 'clsx';
import { useUploadToS3Mutation } from '@/services/storjApi';


interface DropboxProps {
  form: ReturnType<typeof useForm<FormValues>>;
  name: keyof FileFields;
  bucket: string
}

export const Dropbox: React.FC<DropboxProps> = ({ form, name, bucket }) => {
  const [currentFile, setCurrentFile] = useState<FileType | null>(null);
  const [isError, setIsError] = useState(false);
  const [uploadFile, { isLoading: isUploading }] = useUploadToS3Mutation();

  // Get the error state for this field
  const error = form.getInputProps(name)?.error;

  useEffect(() => {
    const [parent, field] = name.split('.');

    if (parent && field && form.values[parent as keyof typeof form.values]) {
      const parentObject = form.values[parent as keyof typeof form.values];

      if (typeof parentObject === 'object' && parentObject !== null && field in parentObject) {
        setCurrentFile(parentObject[field as keyof typeof parentObject] as FileType | null);
      }
    }
  }, []);

  // Update error state when validation changes
  useEffect(() => {
    setIsError(!!error);
  }, [error]);

  const handleDrop = async (files: File[]) => {
    try {
      if (files.length > 0) {
        const file = files[0];
        // const response = await storjService.uploadToS3(bucket, file);
        const response = await uploadFile({ bucket, file }).unwrap();

        const [parent, field] = name.split('.');
        form.setFieldValue(`${parent}.${field}`, response);
        form.clearFieldError(name); // Clear error when file is uploaded
        setCurrentFile(response);
      }
    } catch (e) {
      toast.error(`Failed to upload file: ${e}`);
      form.setFieldError(name, 'File upload failed'); // Set error if upload fails
    }
  };

  const handleReject = (files: FileRejection[]) => {
    const file = files[0];
    if ('errors' in file && file.errors) {
      if (file.errors[0].message) {
        toast.error(file.errors[0].message);
        form.setFieldError(name, file.errors[0].message);
      }
    }
  };

  return (
    <div>
      <Dropzone
        onDrop={(files) => handleDrop(files)}
        onReject={(files) => handleReject(files)}
        maxSize={5 * 1024 ** 2}
        accept={[MIME_TYPES.pdf]}
        className={clsx(
          'border-[1px] border-dashed rounded-[8px] hover:cursor-pointer',
          isError ? 'border-red-500' : 'border-gray-3'
        )}
      >
        {currentFile ? (
          <Group gap="xl" p={9} style={{ pointerEvents: 'none' }}>
            <div className='relative max-w-[114px]'>
              <div className='mb-2'><img src={fileIcon} alt="" /></div>
              <div className='mb-1 text-sm font-normal'>{currentFile.original_filename}</div>
              <div className='absolute bottom-0 left-0 right-0'><img src={fileGradient} alt="" /></div>
            </div>
          </Group>
        ) : (
          <Group justify="center" gap="xl" mih={180} style={{ pointerEvents: 'none' }}>
            <div className='flex flex-col items-center'>
              <div className='mb-4'><img src={zip} alt="" /></div>
              <div className='text-center leading-8 text-sm'>
                Drag and drop the ZIP File<br />
                or <span className='text-light-blue-3'>Browse</span>
              </div>
            </div>
          </Group>
        )}
      </Dropzone>
      {isError && (
        <div className='absolute text-sm text-red-500 mt-2'>{error}</div>
      )}
    </div>
  );
};
