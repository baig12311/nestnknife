import Colors from "../constants/colors";
const getStatusIcon = (orderStatus: string) => {
    switch (orderStatus) {
        case 'Processing':
            return {
                name: 'package-variant-closed',
                type: 'MaterialDesignIcons',
                color: Colors.primary,
                main: 'Order is being processed',
                sub: 'Your order is currently being processed for shipment.',
            };

        case 'Shipped':
            return {
                name: 'truck-fast-outline',
                type: 'MaterialDesignIcons',
                color: Colors.primary,
                main: 'Order is on the way',
                sub: 'Your package has been handed over to the courier for delivery.',
            };

        case 'Delivered':
            return {
                name: 'package-variant-closed-check',
                type: 'MaterialDesignIcons',
                color: Colors.primary,
                main: 'Order delivered',
                sub: 'Your order has been successfully delivered to your shipping address.',
            };

        case 'Cancelled':
            return {
                name: 'close-circle-outline',
                type: 'Ionicons',
                color: '#C84037',
                main: 'Order cancelled',
                sub: 'This order has been cancelled and will not be delivered.',
            };

        default:
            return {
                name: 'package-variant-closed',
                type: 'MaterialDesignIcons',
                color: Colors.primary,
                main: 'Order is being processed',
                sub: 'Your order is currently being processed.',
            };
    }
};

export default getStatusIcon;