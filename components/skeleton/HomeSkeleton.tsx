import {
    StyleSheet,
    View,
} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Colors from '../../constants/colors';
import { fonts } from '../../constants/typography';
import SkeletonBox from './SkeletonBox';

const HomeSkeleton = () => {
    // Category circle
    const categorySize = wp(17);

    // 2-column product card width
    const productWidth = wp(44);
    return (
        <SafeAreaView style={styles.mainContainer}>
            <View style={styles.header}>
                <SkeletonBox width={wp(20)} height={wp(20)} borderRadius={wp(4)} />
                <View style={styles.headerIcons}>

                    <SkeletonBox width={wp(8)} height={wp(8)} borderRadius={wp(4)} style={{ marginRight: wp(3) }} />
                    <SkeletonBox width={wp(8)} height={wp(8)} borderRadius={wp(4)} />
                </View>
            </View>

            <SkeletonBox height={hp(6)} borderRadius={wp(4)} style={{ marginBottom: hp(2) }} />
            <SkeletonBox height={hp(25)} borderRadius={wp(4)} style={{ marginBottom: hp(2) }} />


            <View>

                <View style={styles.section}>
                    <View style={styles.CategoryHeader}>
                        <SkeletonBox width={wp(30)} height={hp(3)} borderRadius={wp(2)} />
                        <SkeletonBox width={wp(15)} height={hp(3)} borderRadius={wp(2)} />

                    </View>
                    <View style={styles.categories}>

                        {Array.from({ length: 4 }).map((_, index) => (
                            <View
                                key={index}
                                style={styles.category}
                            >

                                {/* Category Image */}
                                <SkeletonBox
                                    width={categorySize}
                                    height={categorySize}
                                    borderRadius={categorySize / 2}
                                />

                                {/* Category Name */}
                                <SkeletonBox
                                    width={wp(14)}
                                    height={hp(1.5)}
                                    borderRadius={4}
                                    style={styles.categoryName}
                                />

                            </View>
                        ))}

                    </View>
                </View>
                <View style={styles.section}>
                    <SkeletonBox width={wp(30)} height={hp(3)} borderRadius={wp(2)} style={{ marginBottom: hp(1) }} />
                    <View style={styles.productGrid}>

                        {Array.from({ length: 4 }).map((_, index) => (
                            <View
                                key={index}
                                style={{
                                    width: productWidth,
                                }}
                            >

                                {/* Product Image */}
                                <SkeletonBox
                                    width={productWidth}
                                    height={productWidth}
                                    borderRadius={12}
                                />

                                {/* Product Name */}
                                <SkeletonBox
                                    width={productWidth * 0.85}
                                    height={hp(2)}
                                    borderRadius={4}
                                    style={styles.productTitle}
                                />

                                {/* Product Price */}
                                <SkeletonBox
                                    width={productWidth * 0.45}
                                    height={hp(1.8)}
                                    borderRadius={4}
                                    style={styles.productPrice}
                                />

                            </View>
                        ))}

                    </View>
                </View>



            </View>

        </SafeAreaView>
    )
}

export default HomeSkeleton;

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: Colors.background,
        padding: hp(2),
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: hp(2)
    },
    headerIcons: {
        flexDirection: 'row',
        alignSelf: 'center'
    },
    categories: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    category: {
        alignItems: 'center'
    },
    categoryName: {
        marginTop: hp(1)
    },
    productGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        rowGap: hp(2.5),
    },
    productTitle: {
        marginTop: hp(1.2),
    },

    productPrice: {
        marginTop: hp(0.8),
    },
    CategoryHeader: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: hp(1)
    },
    section: {

        marginBottom: hp(2),
        //padding: hp(2)
        //paddingLeft: 20,
    },

    // container: {
    //     flex: 1,
    //     backgroundColor: Colors.background,
    // },
    // content: {
    //     paddingBottom: hp(2),
    // },

    // sectionTitle: {
    //     marginBottom: hp(1),
    //     fontSize: wp(5.5),
    //     fontFamily: fonts.displaySemibold,
    //     //fontWeight: '600',
    //     color: Colors.text,
    // },
    // // Stylesheet changes
    // shadowContainer: {
    //     marginRight: wp(3),
    //     marginBottom: hp(1),
    // },
    // cardShadowWrapper: {
    //     width: wp(30),
    //     height: hp(15),
    //     borderRadius: 16,
    //     backgroundColor: '#FFFFFF', // Solid background stops shadow bleed through
    //     // REMOVED: elevation, shadowColor, shadowOpacity, shadowRadius, shadowOffset
    // },
    // card: {
    //     flex: 1,
    //     borderRadius: 16,
    //     overflow: 'hidden', // Cleanly clips the image
    //     backgroundColor: '#FFFFFF',
    // },
    // image: {
    //     width: wp(30),
    //     height: hp(9),
    //     //marginBottom: hp(0.5),

    // },
    // cardTitleContainer: {

    //     flex: 1,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },

    // cardTitle: {
    //     fontSize: wp(4),
    //     color: Colors.text,
    //     fontFamily: fonts.medium,
    //     fontWeight: '500',
    //     textAlign: 'center'
    // },

    // sectionHeader: {
    //     flexDirection: 'row',
    //     justifyContent: 'space-between',
    //     alignItems: 'center',
    // },
    // sectionHeaderText: {
    //     color: Colors.primary,
    //     fontSize: wp(4),
    //     fontFamily: fonts.semibold,
    //     //textDecorationLine: 'underline',
    // },
    // searchContainer: {
    //     marginBottom: hp(2)
    // }

});

