export default {
    name: 'product',
    title: 'Product',
    type: 'document',
    fields: [
        {
            name: 'title',
            title: 'Title',
            type: 'string',
            required: true,
            description: 'Product name'
        },
        {
            name: 'brand',
            title: 'Brand',
            type: 'string',
            required: true,
        },
        {
            name: 'image',
            title: 'Image',
            type: 'array',
            of: [{ type: 'image' }],
            options: {
                hotstop: true
            }
        },
        {
            name: 'slug',
            title: 'Slug',
            type: 'slug',
            options: {
                source: 'title',
                maxLength: 90,
            }
        },
        {
            name: 'price',
            title: 'Price',
            type: 'number',
        },
        {
            name: 'details',
            title: 'Details',
            type: 'string',
        },
        {
            name: 'availableStock',
            title: 'Available Stocks',
            type: 'number',
            min: 0,
        },
        {
            name: 'category',
            title: 'Category',
            type: 'array',
            of: [{type: 'string'}],
            validation: Rule => Rule.unique(),
            options: {
                list: [
                    {title: 'Child', value:'child'},
                    {title: 'Female', value:'female'},
                    {title: 'Male', value:'male'}
                ]
            }
        },
        {
            name : 'popularity',
            title : 'populairty',
            type: 'number',
            max: 5
        }
    ]
}