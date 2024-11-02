// components/MetaTags.js
import Head from 'next/head';

const MetaTags = () => {
    return (
        <Head>
            {/* Open Graph / Facebook */}
            <meta property="og:type" content="website" />
            <meta property="og:title" content="Zop Studios" />
            <meta property="og:description" content="Welcome to Zop Studios, where we create stunning digital experiences." />
            <meta property="og:image" content="https://zopstudios.net/index/img/ZopLogo512.png" />
            <meta property="og:url" content="https://zopstudios.net" />
            <meta property="og:site_name" content="Zop Studios" />
            <meta property="og:image:alt" content="Zop Studios Logo" />
            <meta property="og:image:type" content="image/png" />
            {/* Twitter */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content="Zop Studios" />
            <meta name="twitter:description" content="Zop Studios." />
            <meta name="twitter:image" content="https://zopstudios.net/index/img/ZopLogo512.png" />
            <meta name="twitter:url" content="https://zopstudios.net" />
            {/* General */}
            <meta name="description" content="Welcome to Zop Studios, where we create stunning digital experiences." />
            <meta name="keywords" content="Zop Studios, digital experiences, web design, creative solutions" />
            <meta name="author" content="Zop Studios" />
            <meta name="theme-color" content="#ffca2b" />
            {/* Favicon */}
            <link rel="icon" href="https://zopstudios.net/img/ZopLogo512.png" type="image/x-icon" />
            {/* Embed Color for Discord and other platforms */}
            <meta name="color" content="#ffca2b" />
        </Head>
    );
};

export default MetaTags;
