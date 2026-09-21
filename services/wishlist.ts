import AsyncStorage from '@react-native-async-storage/async-storage';

const WISHLIST_KEY = 'wishlist';

export const getWishlist = async () => {
    const wishlist = await AsyncStorage.getItem(WISHLIST_KEY);

    return wishlist ? JSON.parse(wishlist) : [];
};

export const addToWishlist = async (product: any) => {
    const wishlist = await getWishlist();

    const alreadyExists = wishlist.some(
        (item: any) => item.id === product.id
    );

    if (alreadyExists) {
        return;
    }

    const updatedWishlist = [...wishlist, product];

    await AsyncStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(updatedWishlist)
    );
};

export const removeFromWishlist = async (productId: string) => {
    const wishlist = await getWishlist();

    const updatedWishlist = wishlist.filter(
        (item: any) => item.id !== productId
    );

    await AsyncStorage.setItem(
        WISHLIST_KEY,
        JSON.stringify(updatedWishlist)
    );
};