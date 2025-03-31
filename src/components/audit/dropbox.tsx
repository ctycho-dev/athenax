import { Group, Text } from '@mantine/core';
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from '@mantine/dropzone';
import zip from '@/assets/audit/zip.svg'

export function BaseDemo(props: Partial<DropzoneProps>) {
  return (
    <Dropzone
      onDrop={(files) => console.log('accepted files', files)}
      onReject={(files) => console.log('rejected files', files)}
      maxSize={5 * 1024 ** 2}
    //   accept={IMAGE_MIME_TYPE}
      className='border-[1px] border-dashed border-gray-3 rounded-[8px] hover:cursor-pointer'
      {...props}
    >
      <Group justify="center" gap="xl" mih={180} style={{ pointerEvents: 'none' }}>
        <div className='flex flex-col items-center'>
          <div className='mb-4'><img src={zip} alt="" /></div>
          <div className='text-center leading-8 text-sm'>Drag and drop the ZIP File<br />
          with your codebase, or <span className='text-light-blue-3'>Browse</span></div>
        </div>
      </Group>
    </Dropzone>
  );
}