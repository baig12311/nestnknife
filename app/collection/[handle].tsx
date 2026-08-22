import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import styles from './handleStyle'
import { SafeAreaView } from 'react-native-safe-area-context'
import ProductCard from '../../components/categories/ProductCard';
import Header from '../../components/categories/Header';
import { useProductsByCollection } from '../../hooks/useProductsByCollection';
import { useLocalSearchParams, router } from 'expo-router';
import FadeInView from '../../components/animations/FadeInView';

//import { useCollectionProducts } from '../../hooks/useProducts';

const CollectionScreen = () => {
  const { handle, title } =
    useLocalSearchParams<{
      handle: string;
      title?: string;

    }>();
  const {
    data: products,
    isLoading,
    error,
  } = useProductsByCollection(handle);

  if (isLoading) {
    return (
      <ActivityIndicator
        style={styles.loader}
        size="large"
        color="#1F5B3A"
      />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Unable to load products.
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title ?? 'Collection'} onSearchPress={() => router.push('/search/Search')} />
      {/* <Text style={styles.title}>
        {description ?? 'Collection'}
      </Text> */}

      <Text style={styles.count}>
        {products?.length ?? 0} Products
      </Text>

      <FlatList
        data={products}
        numColumns={2}
        keyExtractor={(item) => item.id}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        renderItem={({ item, index }) => (
          <FadeInView key={item.id} delay={index * 150}>
            <ProductCard
              key={item.id}
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
          <View style={styles.empty}>
            <Text style={styles.emptyTitle}>
              No products found
            </Text>

            <Text style={styles.emptyText}>
              This collection doesn't have any products yet.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}
export default CollectionScreen;

