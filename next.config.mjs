/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript:{
        ignoreBuildErrors:true
    },
    experimental:{
        serverActions: true,
        serverComponentsExternalPackages:['mongoose'],
    },
    images: {
        domains: [
            'img.clerk.com',
            'images.clerk.dev',
            'uploadthing.com',
            'placehold.co',
            'utfs.io' // Add this line
        ]
,
        remotePatterns:[
            {
                protocol: 'https',
                hostname: 'img.clerk.com',
            },
            {
                protocol: 'https',
                hostname: 'images.clerk.dev',

            },
            {
                protocol: 'https',
                hostname: 'uploadthing.com',

            },
            {
                protocol: 'https',
                hostname: 'placehold.co',

            }
        ]
    },
};

export default nextConfig;
