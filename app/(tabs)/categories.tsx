import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import CustomEmptyComponent from '../../components/common/CustomEmptyComponent';
import { SafeAreaView } from 'react-native-safe-area-context'
import styles from '../styles/CStyle';
import FadeInView from '../../components/animations/FadeInView';
import Header from '../../components/categories/Header';
import CategoryCard from '../../components/categories/CategoryCard';
import { router } from 'expo-router';
import { useCollections } from '../../hooks/useProducts';
import ProductSkelton from '../../components/skeleton/ProductSkeleton';
export default function CategoriesScreen() {
  const {
    data: collections,
    isLoading,
    error,
    refetch
  } = useCollections();




  if (isLoading) {
    return (
      <ProductSkelton/>
    );
  }

  if(error)
    {
        return(
            <SafeAreaView style={styles.mainContainer}>
                <Header title='Collections' />
                <CustomEmptyComponent
                    illustration={require('../../assets/illustrations/mainError.png')}
                    mainText="Something Went Wrong"
                    subText="We couldn't retrieve categories data right now. Please try again."
                    buttonTitle="Try Again"
                    onPress={()=>refetch()}
                   
                />

            </SafeAreaView>
        )        
    }

  return (
    <SafeAreaView style={styles.mainContainer}>
       <Header title='Collections' />
      <ScrollView
        style={styles.container}
        showsVerticalScrollIndicator={false}
      >

       

        <Text style={styles.subtitle}>
          Explore Our Collections
        </Text>

        <View style={styles.grid}>
          {collections?.map((collection, index) => (
            <FadeInView key={collection.id} delay={index * 100}>
              <CategoryCard
                image={collection.image?.url}
                cardTitle={collection.title}
                onPress={() => router.push({
                  pathname: '/collection/[handle]',
                  params: {
                    handle: collection.handle,
                    title: collection.title
                  }
                })}
              />
            </FadeInView>


          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

