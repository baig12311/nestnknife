export const orderInfo=(order:any)=>[
    {
        id:1,
        iconName: 'keypad-outline',
        iconType: 'Ionicons',
        title: 'Order Number',
        desc: order?.name
    },
    {
        id:2,
        iconName: 'calendar-outline',
        iconType: 'Ionicons',
        title: 'Order Date',
        desc: new Date(order?.processedAt).toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
        }),
        
    },
    {
        id:3,
        iconName: 'wallet-outline',
        iconType: 'Ionicons',
        title: 'Payment Method',
        desc: 'Cash on Delivery'
    },
    {
        id:4,
        iconName: 'cash-outline',
        iconType: 'Ionicons',
        title: 'Total Amount',
        desc: `PKR ${Number(order?.totalPrice?.amount).toLocaleString()}`
    }
]