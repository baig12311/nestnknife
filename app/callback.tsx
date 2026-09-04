// import React, { useEffect } from 'react';
// import { View } from 'react-native';
// import { router } from 'expo-router';

// export default function CallbackScreen() {
//   useEffect(() => {
//     const timer = setTimeout(() => {
//       router.replace('/profile');
//     }, 500);

//     return () => clearTimeout(timer);
//   }, []);

//   return <View />;
// }

// import React, { useEffect } from 'react';
// import { View, ActivityIndicator } from 'react-native';
// import { router } from 'expo-router';
// import { useDispatch } from 'react-redux';
// import { AppDispatch } from '../store';
// import { startAuthCheck } from '../store/authSlice';
// import { restoreSession } from '../hooks/useAuth';

// export default function CallbackScreen() {
//   const dispatch = useDispatch<AppDispatch>();

//   useEffect(() => {
//     const restore = async () => {
//       dispatch(startAuthCheck());

//       await restoreSession(dispatch);

//       router.replace('/profile');
//     };

//     restore();
//   }, []);

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//       <ActivityIndicator />
//     </View>
//   );
// }



// new code claude 
import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { router } from 'expo-router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../store';
import { startAuthCheck, finishAuthCheck } from '../store/authSlice';
import { restoreSession } from '../hooks/useAuth';

export default function CallbackScreen() {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Session restore start - loading true kar do
        dispatch(startAuthCheck());

        // Token ko SecureStore se restore kar
        await restoreSession(dispatch);

        // Redirect kar profile pe - ab accessToken set hoga
        router.replace('/profile');
      } catch (error) {
        console.error('CALLBACK ERROR:', error);
        // Error ho to bhi loading finish kar aur profile ko bhej
        dispatch(finishAuthCheck());
        router.replace('/profile');
      }
    };

    handleCallback();
  }, [dispatch]);

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" />
    </View>
  );
}