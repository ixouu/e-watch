export default {
    name: 'order',
    title: 'Order',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            required: true,
            description: 'Order Title'
        },
        {
            name: 'orderId',
            title: 'Order Id',
            type: 'number',
            required: true,
        },
        {
            name: 'orderedProducts',
            title: 'ordered Products',
            type: 'array',
            of: [
                {
                    type: 'orderItems',
                },
            ],
        },
        {
            name: 'orderTotalPrice',
            title: 'Total Price',
            type: 'number',
            required: true,
        },
        {
            name: 'customerLastName',
            title: 'customer Last Name',
            type: 'string',
            required: true
        },
        {
            name: 'customerFirstName',
            title: 'customer First Name',
            type: 'string',
            required: true
        },
        {
            name: 'customerEmail',
            title: 'customer Email',
            type: 'string',
            required: true
        },
        {
            name: 'customerStreet',
            title: 'customer Street',
            type: 'string',
            required: true
        },
        {
            name: 'customeraddressComplementary',
            title: 'customer address Complementary',
            type: 'string'
        },
        {
            name: 'customerPostalCode',
            title: 'customer PostalCode',
            type: 'number',
            required: true
        },
        {
            name: 'customerCity',
            title: 'customer City',
            type: 'string',
            required: true
        },
        {
            name: "pending",
            title: "Status : pending",
            type: 'boolean',
        }, {
            name: 'sent',
            title: 'Status : sent',
            type: 'boolean',
        },
        {
            name: 'delivred',
            title: 'Status :  delivred',
            type: 'boolean',
        },
        {
            name: 'isPaid',
            title: "Paid ",
            type: 'boolean'
        }

    ], initialValue: {
        pending: true
    }
}