import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';

export const client = sanityClient({
    projectId : '8atng45p',
    dataset : 'production',
    apiVersion: '2022-10-13',
    useCdn : true,
    token : process.env.REACT_APP_SANITY_AUTH_TOKEN
});

const builder = imageUrlBuilder(client);

export const urlFor = (source) => {
    return builder.image(source);
}