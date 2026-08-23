import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import Icon from '../../components/Icon';
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
  } = useCollections();




  if (isLoading) {
    return (
      <ProductSkelton/>
      // <ActivityIndicator
      //   style={styles.loader}
      //   size="large"
      //   color="#1F5B3A"
      // />
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          Unable to load collections.
        </Text>
      </View>
    );
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

