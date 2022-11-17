export default {
    title: 'Ordered Items',
    name : 'orderItems',
    type: 'object',
    fields : [
            {
                name: 'productTitle',
                title: 'product Title',
                type: 'string',
                required: true,
            },
            {
                name: 'productQty',
                title: 'product Qty',
                type: 'number',
                required: true
            },
            {
                name: 'productPrice',
                title: 'product Price',
                type: 'number',
                required: true
            }
    ],
    
};