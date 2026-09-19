export const getOrderStatus = (order: any) => {
     if (order.cancelledAt) {
        return 'Cancelled';
    }
    
    const fulfillmentStatus = order.fulfillmentStatus;

    const shipmentStatus =
        order.fulfillments?.edges?.[0]?.node?.latestShipmentStatus;

    if (shipmentStatus === 'DELIVERED') {
        return 'Delivered';
    }

    if (
        shipmentStatus === 'CONFIRMED' ||
        shipmentStatus === 'IN_TRANSIT' ||
        shipmentStatus === 'OUT_FOR_DELIVERY'
    ) {
        return 'Shipped';
    }

    if (
        fulfillmentStatus === 'IN_PROGRESS' ||
        fulfillmentStatus === 'UNFULFILLED'
    ) {
        return 'Processing';
    }

    return 'Processing';
};