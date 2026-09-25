import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import BottomSheet, {
    BottomSheetView,
    BottomSheetBackdrop
} from '@gorhom/bottom-sheet';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import { RangeSlider } from '@react-native-assets/slider';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Button from './Button';
interface Props {
    bottomSheetRef: React.RefObject<BottomSheet | null>;
    category?:string
    Filters:any
}

const CustomBottomSheet: React.FC<Props> = ({ bottomSheetRef, category, Filters}) => {
    const insets = useSafeAreaInsets()
    const [selectedSort, setSelectedSort] = useState<number | null>(null)
    const [selectedCategory, setSelectedCategory] = useState<number | null>(null)
    const [isPriceFiltered, setIsPriceFiltered] = useState(false)
    const [priceRange, setPriceRange] = useState<[number, number] | null>([
        100,
        10000,
    ]);
    const SortHeading = [
        'Relevance',
        'Price: Low to High',
        'Price: High to Low',
        'Newest'
    ]
    const Category = [
        'Shop All',
        'Featured Products',
        'Everyday Essentials',
        'Organize & Store',
        'Prep & Cook',
    ]
    const handleDataTransfer = () => {
    const sortValue =
        selectedSort === null
            ? null
            : SortHeading[selectedSort];

    const categoryValue =
        selectedCategory === null
            ? null
            : Category[selectedCategory];

    const priceSlider =
        isPriceFiltered
            ? priceRange
            : null;

    Filters({
        priceRange: priceSlider,
        sortValue,
        categoryValue,
    });
};
    const handlePress=()=>{
        handleDataTransfer()
        bottomSheetRef.current?.close()
    }
    
    
    // const min = 0;
    // const max = 10000;

    // const minPosition =
    //     ((priceRange[0] - min) / (max - min)) * 100;

    // const maxPosition =
    //     ((priceRange[1] - min) / (max - min)) * 100;

        const handleReset=()=>{
            setPriceRange([100, 10000]),
            setSelectedCategory(null),
            setSelectedSort(null),
            setIsPriceFiltered(false)

        }
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
                style={{padding: hp(2), paddingBottom: insets.bottom}}
            >
                <View style={styles.header}>
                    <Text style={styles.heading}>Filters</Text>
                    <Text 
                    style={styles.heading} 
                    onPress={handleReset}>
                        Reset
                    </Text>
                </View>
                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Price Range</Text>
                    <View style={styles.sliderContainer}>
                        <Text style={styles.priceLabel}>
                            {`Rs. ${priceRange?.[0]} - Rs. ${priceRange?.[1]}`}
                            </Text>
                        {/* <View >
                            <Text style={[styles.priceLabel,
                            { left: `${minPosition}%` },

                            ]}>Rs. {priceRange[0]}</Text>
                            <Text style={[styles.priceLabel,
                            { left: `${maxPosition}%` },
                            ]}>Rs. {priceRange[1]}</Text>
                        </View> */}
                        <RangeSlider
                            style={styles.slider}
                            range={priceRange}
                            minimumValue={100}
                            maximumValue={10000}
                            step={100}
                            inboundColor={Colors.primary}
                            outboundColor="#D9D9D9"
                            thumbStyle={styles.thumb}
                            trackHeight={wp(2)}
                        
                            //trackStyle={styles.track}

                            onValueChange={(range) => {
                                setPriceRange(range as [number, number]);
                                setIsPriceFiltered(true)
                            }}
                        />
                    </View>

                </View>

                <View style={styles.subContainer}>
                    <Text style={styles.heading}>Sort By</Text>
                    <View style={styles.sortContainer}>
                        {
                            SortHeading.map((sort, index) => {
                                const selected = index === selectedSort
                                return (
                                    <TouchableOpacity
                                        style={[styles.sortButton,
                                        selected && { backgroundColor: Colors.primary }
                                        ]}
                                        key={index}
                                        activeOpacity={0.7}
                                        onPress={() => setSelectedSort(index)}
                                    >
                                        <Text style={[styles.sortText,
                                        selected && { color: Colors.background }
                                        ]}>{sort}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                </View>
                {
                    category === 'Shop All' && (
                        <View style={styles.subContainer}>
                    <Text style={styles.heading}>Category</Text>
                    <View style={styles.sortContainer}>
                        {
                            Category.map((category, index) => {
                                const selected = index === selectedCategory
                                return (
                                    <TouchableOpacity
                                        style={[styles.sortButton,
                                        selected && { backgroundColor: Colors.primary }
                                        ]}
                                        key={index}
                                        activeOpacity={0.7}
                                        onPress={() => setSelectedCategory(index)}
                                    >
                                        <Text style={[styles.sortText,
                                        selected && { color: Colors.background }
                                        ]}>{category}</Text>
                                    </TouchableOpacity>
                                )
                            })
                        }
                    </View>

                </View>
                    )
                }
                
                <View style={{ marginTop: hp(2) }}>
                    <Button 
                    title='Apply Filters' 
                    onPress={handlePress}
                    />
                </View>

            </BottomSheetView>
        </BottomSheet>
    );
};

const styles = StyleSheet.create({
    sheet: {
        padding: hp(2)
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 0.3,
        borderColor: Colors.secondary,
        paddingBottom: hp(1)
    },
    subContainer: {
        paddingVertical: hp(1),
        borderBottomWidth: 0.3,
        borderColor: Colors.secondary,
    },
    sliderContainer: {

        // position: 'relative',
        // marginTop: hp(3)
    },
    slider: {
        width: '95%',
        alignSelf: 'center'
    },
    priceLabel: {
        fontFamily: fonts.regular,
        fontSize: wp(3.3),
        color: Colors.primary

    },
    thumb: {
        backgroundColor: Colors.secondaryBackground,
        borderWidth: 2,
        borderColor: Colors.primary,
        width: wp(4.5),
        height: wp(4.5),
        borderRadius: wp(4)
    },
    track: {
        backgroundColor: Colors.primary,
        height: 10
    },
    heading: {
        fontFamily: fonts.semibold,
        fontSize: wp(4),
        color: Colors.text,
        marginBottom: hp(0.5)
    },
    sortContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 10
    },
    sortButton: {
        paddingHorizontal: wp(2.5),
        paddingVertical: wp(1.5),
        borderRadius: 50,
        backgroundColor: Colors.secondary2
    },
    sortText: {
        fontFamily: fonts.regular,
        fontSize: wp(3),
        color: Colors.text
    }
});

//make this component available to the app
export default CustomBottomSheet;
