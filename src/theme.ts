import { createTheme } from '@mantine/core';


export const theme = createTheme({
   fontFamily: 'Inter, sans-serif',
   headings: { fontFamily: 'Inter, sans-serif' },
   components: {
      Input: {
         styles: {
            input: {
               background: '#0F1011',
               height: '48px',
               border: 'none',
               color: 'white',
               // minWidth: '335px'
            }
         }
      },
      InputWrapper: {
         styles: {
            label: {
               color: '#949FA8',
               marginBottom: '12px'
            }
         }
      },
      
      Select: {
         styles: {
            dropdown: {
               border: 0,
               background: '#0F1011',
            }
         },
      },

      Textarea: {
         styles: {
            input: {
               minHeight: '150px',
               maxWidth: '560px',
               background: '#0F1011',
               border: 'none',
               padding: '16px',
               color: 'white',
               fontSize: '14px',
            }
         }
      },
      Radio: {
         styles: {
            radio: {
               backgroundColor: 'transparent',
               borderColor: '#949FA8',
               '&:checked': {
                  backgroundColor: 'green',
                  borderColor: 'green',
               },
            },
         }
      }
   }
});