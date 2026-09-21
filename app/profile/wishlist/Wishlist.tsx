import { useState, useEffect } from 'react';
import { FlatList, View} from 'react-native';
import styles from './WishlistStyle';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../../../components/profile/Header';
import { router } from 'expo-router';
import CustomEmptyComponent from '../../../components/common/CustomEmptyComponent';
import FadeInView from '../../../components/animations/FadeInView';
import ProductCard from '../../../components/categories/ProductCard';
import { getWishlist, removeFromWishlist } from '../../../services/wishlist';
import ProductSkelton from '../../../components/skeleton/ProductSkeleton';

const Wishlist = () => {
    const [wishlist, setWishlist] = useState<any[]>([])
    const [loading, setLoading] = useState(true)
  
    const getData = async () => {
        const wishlistData = await getWishlist()
        setWishlist(wishlistData)
        setLoading(false)
    }
    
    
    useEffect(() => {
        getData()
    }, [])
    
    return (
        <View style={{flex:1}}>
            {
                loading ? (<ProductSkelton/>):(
                    <SafeAreaView style={styles.container}>
            <Header title='Wishlist' onPress={() => router.replace('/profile')} />
            <FlatList
                data={wishlist}
                numColumns={2}
                keyExtractor={(item) => item.id}
                columnWrapperStyle={styles.row}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.list}
                renderItem={({ item, index }) => (
                    <FadeInView key={item.id} delay={index * 150}>
                        <ProductCard
                            key={item.id}
                            isWishlistScreen={true}
                            onWishlistRemove={(productId) => {
                                setWishlist((prev) =>
                                    prev.filter((item) => item.id !== productId)
                                );
                            }}
                            product={{
                                id: item.id,
                                title: item.title,
                                price: Number(item.price),
                                image: item.image ?? 'https://placehold.co/600x600',
                            }}
                        />
                    </FadeInView>

                )} 
                ListEmptyComponent={
                <CustomEmptyComponent
                buttonTitle='Discover Products'
                onPress={()=>router.replace('/categories')}
                illustration={require('../../../assets/illustrations/emptyWish.png')}
                mainText='Your Wihslist is Empty'
                subText='Save your favourite products and find them here whenever you need.'
                />}
                />
        </SafeAreaView>
                )
            }
        </View>
        
    );
};



export default Wishlist;
