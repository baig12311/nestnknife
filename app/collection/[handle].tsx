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
import ProductSkelton from '../../components/skeleton/ProductSkeleton';
import CustomEmptyComponent from '../../components/common/CustomEmptyComponent';
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
    refetch
  } = useProductsByCollection(handle);

  if (isLoading) {
    return (
      <ProductSkelton/>
      
    );
  }

  if(error)
    {
        return(
            <SafeAreaView style={styles.container}>
                <Header title={title ?? 'Collection'} />
                <CustomEmptyComponent
                    illustration={require('../../assets/illustrations/mainError.png')}
                     mainText="Something Went Wrong"
                    subText="We couldn't retrieve products right now. Please try again."
                    buttonTitle="Try Again"
                    onPress={()=>refetch()}
                   
                />

            </SafeAreaView>
        )        
    }

  return (
    <SafeAreaView style={styles.container}>
      <Header title={title ?? 'Collection'} onSearchPress={() =>
    router.push({
      pathname: '/search/Search',
      params: {
        collectionHandle: handle,   // jo already useLocalSearchParams se mila hua hai
        title: title,               // collection ka naam
      },
    })
  } />
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
          <CustomEmptyComponent
          mainText='No Products Found'
          subText='There are no products available in this collection right now.'
          illustration={require('../../assets/illustrations/emptyProduct.png')}
          buttonTitle='Browse All Products'
          onPress={()=>router.replace('/categories')}
          />
        }
      />
    </SafeAreaView>
  );
}
export default CollectionScreen;

