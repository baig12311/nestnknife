import { useRef, useState} from 'react';
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
import CustomBottomSheet from '../../components/common/BottomSheet';
import BottomSheet from '@gorhom/bottom-sheet';

const CollectionScreen = () => {
  const bottomSheetRef = useRef<BottomSheet>(null)
  const [showBottomSheet, setShowBottomSheet] = useState(false)
  const [filterData, setFilterData] = useState<any>()
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
  const collection = products?.[0]?.collections?.node.title
  console.log(collection)

  
  const handleApplyFilters=(data:any)=>{
    console.log('Filters Data: ', data)
    setFilterData(data)
  }
  const filterProducts = !filterData
    ? products ?? []
    : products?.filter((product) => {
        const price = Number(product.price);

        return (
            price >= filterData.priceRange[0] &&
            price <= filterData.priceRange[1]
        );
    }) ?? [];
  if (isLoading) {
    return (
      <ProductSkelton />

    );
  }

  if (error) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={title ?? 'Collection'} />
        <CustomEmptyComponent
          illustration={require('../../assets/illustrations/mainError.png')}
          mainText="Something Went Wrong"
          subText="We couldn't retrieve products right now. Please try again."
          buttonTitle="Try Again"
          onPress={() => {refetch()
            console.log('Refetch Called')
          }}

        />

      </SafeAreaView>
    )
  }

  return (
    <View style={{flex:1}}>
    <SafeAreaView style={styles.container}>
      <Header title={title ?? 'Collection'} onSearchPress={() =>
        router.push({
          pathname: '/search/Search',
          params: {
            collectionHandle: handle,   // jo already useLocalSearchParams se mila hua hai
            title: title,               // collection ka naam
          },
        })
      }
        onFilterPress={() => {
            setShowBottomSheet(true); // ✅ پہلے state set کرو
            setTimeout(() => {
              bottomSheetRef.current?.snapToIndex(0); // پھر open کرو
            }, 100);
          }}
        />
      {/* <Text style={styles.title}>
        {description ?? 'Collection'}
      </Text> */}

      <Text style={styles.count}>
        {products?.length ?? 0} Products
      </Text>

      <FlatList
        data={filterProducts}
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
            onPress={() => router.replace('/categories')}
          />
        }
      />
     
    </SafeAreaView>
    {
      showBottomSheet && (
        <CustomBottomSheet
        bottomSheetRef={bottomSheetRef}
        category={title}
        Filters={handleApplyFilters}
      />
      ) 
    }
     
    </View >

    
  );
}
export default CollectionScreen;

