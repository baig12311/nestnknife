// import React from 'react';
// import { useWindowDimensions, View, StyleSheet } from 'react-native';
// import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
// import Colors from '../constants/colors';
// import { fonts } from '../constants/typography';
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

// interface Props {
//   html: string;
// }
// const customFonts = [...defaultSystemFonts, fonts.regular, fonts.bold, fonts.semibold, fonts.medium, fonts.displayBold, fonts.displaySemibold];
// const FormattedDescription = ({ html }: Props) => {
//   const { width } = useWindowDimensions();

//   // Custom styling to match your dark/light theme seamlessly
//   const tagsStyles = {
//     body: {
//       color: Colors.text,
//       fontSize: wp(3.8),
//       fontFamily:fonts.regular,
//       lineHeight: 22,
//     },
//     h1: {
//       borderWidth:1,
//       fontSize: wp(5),
//       fontWeight: 'bold' as const,
//       color: Colors.text,
//       marginTop: hp(1.5),
//       marginBottom: hp(0.5),
//     },
//     h2: {
//        borderWidth:1,
//       fontSize: wp(4.5),
//       fontWeight: 'bold' as const,
//       color: Colors.text,
//       marginTop: hp(1.5),
//       marginBottom: hp(0.5),
//     },
//     p: {
//       borderWidth:1,
//       marginBottom: hp(1),
//       color: Colors.text,
//     },
//     ul: {
//        borderWidth:1,
//       paddingLeft: wp(2),
//       marginBottom: hp(1),
//     },
//     li: {
//       fontFamily: fonts.regular,
//       marginBottom: hp(0.5),
//       color: Colors.text,
//     },
//     strong: {
//        borderWidth:1,
//       //fontWeight: 'bold' as const,
//       color: Colors.text,
//       fontFamily:fonts.displaySemibold

//     },
//     b: {
//        borderWidth:1,
//       fontWeight: 'bold' as const,
//       color: Colors.text,
//     },
//   };

//   if (!html) return null;

//   return (
//     <View style={styles.container}>
//       <RenderHtml
//         contentWidth={width}
//         source={{ html }}
//         tagsStyles={tagsStyles}
//         systemFonts={customFonts} // REQUIRED: Enables custom fonts inside RenderHtml
//         enableUserAgentStyles={true} // REQUIRED: Prevents inline Shopify HTML styles from overriding your fonts/colors
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingVertical: hp(1),
//   },
// });

// export default FormattedDescription;


import React from 'react';
import { useWindowDimensions, View, StyleSheet } from 'react-native';
import RenderHtml, { defaultSystemFonts } from 'react-native-render-html';
import Colors from '../constants/colors';
import { fonts } from '../constants/typography';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";

interface Props {
  html: string;
}

const customFonts = [
  ...defaultSystemFonts,
  fonts.regular,
  fonts.bold,
  fonts.semibold,
  fonts.medium,
  fonts.displayBold,
  fonts.displaySemibold,
];

// Strip inline `style="..."` attributes injected by Shopify
const cleanHtml = (rawHtml: string) => {
  if (!rawHtml) return '';
  return rawHtml.replace(/style="[^"]*"/gi, '');
};

const FormattedDescription = ({ html }: Props) => {
  const { width } = useWindowDimensions();

  const tagsStyles = {
    body: {
      
      color: Colors.text,
      fontSize: wp(3.8),
      fontFamily: fonts.regular,
      lineHeight: 22,
    },
    h1: {
      borderWidth:1,
      fontSize: wp(5.5),
      fontFamily: fonts.displayBold,
      color: Colors.text,
      marginTop: hp(2),
      marginBottom: hp(1),
    },
    h2: {
       borderWidth:1,
      fontSize: wp(4.8),
      fontFamily: fonts.displayBold,
      color: Colors.text,
      marginTop: hp(2),
      marginBottom: hp(1),
    },
    h3: {
      //borderWidth:1,
      fontSize: wp(4.5),
      fontFamily: fonts.displaySemibold,
      color: Colors.text,
      marginTop: hp(1.5),
      marginBottom: hp(0.5),
    },
    p: {
     
      fontSize: wp(3.8),
      fontFamily: fonts.regular,
      marginBottom: hp(1),
      color: Colors.text,
      lineHeight: 22,
    },
    ul: {
     
      paddingLeft: wp(4),
      marginBottom: hp(1),
    },
    li: {
     
      fontSize: wp(3.8),
      fontFamily: fonts.regular,
      marginBottom: hp(0.5),
      color: Colors.text,
    },
    strong: {
    
      fontSize: wp(4.2), // Makes bold titles visibly larger
      fontFamily: fonts.displaySemibold,
      color: Colors.text,
    },
    b: {
     
      fontSize: wp(4.2),
      fontFamily: fonts.displayBold,
      color: Colors.text,
    },
  };

  if (!html) return null;

  return (
    <View style={styles.container}>
      <RenderHtml
        contentWidth={width}
        // Pass cleaned HTML here:
        source={{ html: cleanHtml(html) }}
        tagsStyles={tagsStyles}
        systemFonts={customFonts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: hp(1),
  },
});

export default FormattedDescription;