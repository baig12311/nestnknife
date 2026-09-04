// // import { Slot } from 'expo-router';
// // import { Provider } from 'react-redux';
// // import { QueryClientProvider } from '@tanstack/react-query';

// // import { store } from '../store';
// // import { queryClient } from '../services/queryClient';


// // export default function RootLayout() {
// //   return (
// //     <Provider store={store}>
// //       <QueryClientProvider client={queryClient}>
// //         <Slot />
// //       </QueryClientProvider>
// //     </Provider>
// //   );
// // }

// import { useEffect } from 'react';
// import { Slot } from 'expo-router';
// import { Provider } from 'react-redux';
// import { QueryClientProvider } from '@tanstack/react-query';
// import { useFonts } from 'expo-font';
// import * as SplashScreen from 'expo-splash-screen';

// import {
//   Poppins_400Regular,
//   Poppins_500Medium,
//   Poppins_600SemiBold,
//   Poppins_700Bold,
// } from '@expo-google-fonts/poppins';
// import { Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';

// import { store } from '../store';
// import { queryClient } from '../services/queryClient';

// SplashScreen.preventAutoHideAsync();

// export default function RootLayout() {
//   const [fontsLoaded, fontError] = useFonts({
//     Poppins_400Regular,
//     Poppins_500Medium,
//     Poppins_600SemiBold,
//     Poppins_700Bold,
//     Fraunces_600SemiBold,
//     Fraunces_700Bold,
//   });

//   useEffect(() => {
//     if (fontsLoaded || fontError) {
//       SplashScreen.hideAsync();
//     }
//   }, [fontsLoaded, fontError]);

//   if (!fontsLoaded && !fontError) {
//     return null;
//   }

//   return (
//     <Provider store={store}>
//       <QueryClientProvider client={queryClient}>
//         <Slot />
//       </QueryClientProvider>
//     </Provider>
//   );
// }



import { useEffect } from 'react';
import { Slot } from 'expo-router';
import { Provider, useDispatch } from 'react-redux';
import { QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import {
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from '@expo-google-fonts/poppins';
import { Fraunces_600SemiBold, Fraunces_700Bold } from '@expo-google-fonts/fraunces';

import { store, AppDispatch } from '../store';
import { queryClient } from '../services/queryClient';
import { restoreSession } from '../hooks/useAuth';
import { loadCartId } from '../store/cartSlice';
SplashScreen.preventAutoHideAsync();

/*
|--------------------------------------------------------------------------
| Inner component — Provider ke andar hai, isliye yahan useDispatch
| use kar sakte hain taake app start pe login session restore ho.
|--------------------------------------------------------------------------
*/
const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    restoreSession(dispatch);
    dispatch(loadCartId() as any);
  }, []);

  return <Slot />;
};

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Fraunces_600SemiBold,
    Fraunces_700Bold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </Provider>
  );
}