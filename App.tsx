

import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { StackNavigation } from './src/routes/StackNavigation';
import * as eva from '@eva-design/eva';
import { ApplicationProvider, IconRegistry } from '@ui-kitten/components';
import { EvaIconsPack } from '@ui-kitten/eva-icons';
import { useColorScheme } from 'react-native';
import { AuthProvider } from './src/providers/auth/AuthProvider';




export const App = () => {
  const colorScheme = useColorScheme();
  const theme = colorScheme === 'light' ? eva.dark : eva.light;
  const background = (colorScheme === 'light') ?
    theme['color-basic-800'] : theme['color-basic-100']

  return (
    <>
      <IconRegistry icons={EvaIconsPack} />
      <ApplicationProvider  {...eva} theme={theme}>
        <NavigationContainer
          theme={{
            dark: colorScheme === 'dark',
            colors: {
              primary: theme['color-primary-500'],
              background: background,
              card: theme['color-basic-100'],
              text: theme['color-basic-color'],
              border: theme['color-basic-800'],
              notification: theme['color-basic-primary-500']
            }
          }}
        >
          <AuthProvider>
            <StackNavigation />
          </AuthProvider>
        </NavigationContainer>
      </ApplicationProvider>
    </>


  )
}

