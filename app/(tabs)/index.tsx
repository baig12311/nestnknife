import { ScrollView, StyleSheet, Text, View, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context'
import { useEffect } from 'react';
import { router } from 'expo-router';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import { ShadowCard } from '../../components/common/ShadowCard';
import { getProducts } from '../../services/shopify/products';
import HomeHeader from '../../components/home/HomeHeader';
import SearchBar from '../../components/home/SearchBar';
import HeroBanner from '../../components/home/HeroBanner';
import CategoryCard from '../../components/home/CategoryCard';
import ProductCard from '../../components/home/ProductCard';
import { products } from '../../services/products';
import { useProducts, useFeaturedProducts } from '../../hooks/useProducts';
import { useCollections } from '../../hooks/useProducts';
import FadeInView from '../../components/animations/FadeInView';
import { Shadow } from 'react-native-shadow-2';
import HomeSkeleton from '../../components/skeleton/HomeSkeleton';
import styles from '../styles/HStyle';
import ProductCardSkeleton from '../../components/skeleton/ProductCardSkeleton';

const categories = [
  'Prep & Cook',
  'Organize & Store',
  'Everyday Essentials',
  'Shop All',
];

const HomeScreen = () => {
 const {
  data: products = [],
  isLoading: productsLoading,
} = useFeaturedProducts();

const {
  data: collections = [],
  isLoading: collectionsLoading,
} = useCollections();

const isLoading = productsLoading || collectionsLoading;

if (isLoading) {
  return <HomeSkeleton />;
}

  return (
    <SafeAreaView style={styles.mainContainer}>
      <HomeHeader />
      <FadeInView delay={150}>
        <TouchableOpacity
  activeOpacity={0.8}
  onPress={() => router.push('/search/Search')}
  style={styles.searchContainer}
>
  <View pointerEvents="none">
    <SearchBar placeholderText="Seacrh for products..." />
  </View>
</TouchableOpacity>
      </FadeInView>

      
        <ScrollView
          style={styles.container}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          <FadeInView delay={300}>
            <HeroBanner />
          </FadeInView>

          {/* REMOVED outer FadeInView here to prevent double-animating shadows */}
          <FadeInView delay={450}>
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Shop by Category</Text>
                <TouchableOpacity onPress={() => router.push('/categories')}>
                  <Text style={styles.sectionHeaderText}>View All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
              //contentContainerStyle={styles.horizontalListContent}
              >
                {collections?.map((collection, index) => (
                  <FadeInView key={collection.id} delay={450 + index * 100}>
                    {/* <Shadow
                      distance={6}
                      startColor="rgba(0, 0, 0, 0.06)"
                      endColor="rgba(0, 0, 0, 0.00)"
                      offset={[0, 3]}
                      style={styles.cardShadowWrapper}
                      containerStyle={styles.shadowContainer}
                    > */}
                      <TouchableOpacity 
                      style={styles.card} 
                      activeOpacity={0.85} 
                      // onPress={() => router.push(`/collection/${collection.handle}`)}
                      onPress={() => router.push({
    pathname: '/collection/[handle]',
    params: {
      handle: collection.handle,
      title: collection.title
    }
  })}>
                        {collection.image && (
                          <Image
                            source={{ uri: collection.image.url }}
                            style={styles.image}
                            resizeMode="cover"
                          />
                        )}
                        <View style={styles.cardTitleContainer}>
                          <Text style={styles.cardTitle}>{collection.title}</Text>
                        </View>
                      </TouchableOpacity>
                    {/* </Shadow> */}
                  </FadeInView>
                ))}
              </ScrollView>
            </View>
          </FadeInView>

          <FadeInView delay={600}>
            <View style={styles.section}>
             <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Everyday Essentials</Text>
                <TouchableOpacity onPress={() => router.push('/collection/featured-products')}>
                  <Text style={styles.sectionHeaderText}>View All</Text>
                </TouchableOpacity>
              </View>

              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {products.map((product, index) => (
                  <FadeInView key={product.id} delay={600 + index * 100}>
                    <ProductCard
                      product={{
                        id: product.id,
                        title: product.title,
                        price: Number(product.price),
                        image: product.image ?? 'https://placehold.co/600x600',
                      }}
                    />
                  </FadeInView>
                ))}
              </ScrollView>
            </View>
          </FadeInView>
          {/* Apply the same fix to Everyday Favourites section */}
        
        </ScrollView>
      
    </SafeAreaView>
  );
};

export default HomeScreen;
