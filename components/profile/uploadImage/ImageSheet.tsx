import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '../../../constants/colors';
import { fonts } from '../../../constants/typography';
import { RangeSlider } from '@react-native-assets/slider';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import SheetElement from './SheetElement';
interface Props {
    bottomSheetRef: React.RefObject<BottomSheet | null>
    isEdit?: boolean
    onAction:(action: 'camera' | 'gallery' | 'remove')=>void
}

const ImageSheet: React.FC<Props> = ({ bottomSheetRef, isEdit, onAction}) => {
    const inset = useSafeAreaInsets()
    return (
        <BottomSheet
            ref={bottomSheetRef}
            //index={-1}
            //snapPoints={['65%']}
            enablePanDownToClose
            enableDynamicSizing={true}
            backdropComponent={(props) => (
                <BottomSheetBackdrop
                    {...props}
                    appearsOnIndex={0}
                    disappearsOnIndex={-1}
                    opacity={0.6}
                    pressBehavior="close"
                />
            )}
            backgroundStyle={{
                backgroundColor: Colors.background,
            }}
        >
            <BottomSheetView
                style={[styles.sheet, {paddingBottom:inset.bottom}]}
            >
                <SheetElement
                    iconName='camera-outline'
                    iconType='Ionicons'
                    title={isEdit ? 'Change Photo' : 'Take Photo'}
                    Color={Colors.primary}
                    bgColor={Colors.secondaryBackground}
                    onPress={()=>onAction('camera')}
                />
                <SheetElement
                    iconName='images-outline'
                    iconType='Ionicons'
                    title='Choose From Gallery'
                    Color={Colors.primary}
                    bgColor={Colors.secondaryBackground}
                    onPress={()=>onAction('gallery')}
                />
                {
                    isEdit && (
                        <SheetElement
                            iconName='trash-outline'
                            iconType='Ionicons'
                            title='Remove Photo'
                            Color={Colors.red}
                            bgColor={Colors.redBG}
                            onPress={()=>onAction('remove')}
                        />
                    )
                }
                <Text
                    style={styles.cancel}
                    onPress={() => bottomSheetRef.current?.close()}
                >Cancel</Text>

            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    sheet: {
        padding: hp(2)
    },
    cancel: {
        fontFamily: fonts.medium,
        fontSize: wp(4),
        color: Colors.primary,
        textAlign: 'center',
        marginTop: hp(1),
        padding: wp(2),

    }

});

export default ImageSheet;
