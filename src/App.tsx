import '@mantine/core/styles.css'
import { MantineProvider, RingProgress, Text } from '@mantine/core'
import { theme } from './theme'

export default function App() {
   return (
      <MantineProvider theme={theme}>
         <RingProgress
            label={
               <Text size="xs" ta="center">
                  Application data usage
               </Text>
            }
            sections={[{ value: 70, color: 'green', tooltip: '70%' }]}
         />
      </MantineProvider>
   )
}
