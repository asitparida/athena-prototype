import { IContentItem, ContentType, MediaSourceType, ISocialMediaContent } from "../types";
import * as _ from 'lodash';
import { ItemHeight, ItemWidth } from "../constants";

export const DummifiedSocialMediaItems: Array<IContentItem<ISocialMediaContent>> = [
    {
        id: 'socialmedia_1',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/adult-boy-casual-220453.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 2.02.18 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/BzF-fhWnWhG/',
            handle: '@labmuffinbeautyscience'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ 'chemical', 'mineral', 'sunscreen', 'zinc oxide', 'DIY' ],
        annotation: 'don\'t smear diaper cream on your face as a way to "DIY sunscreen"',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_2',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/beautiful-brunette-cute-774909.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.43.00 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/BqDD9C5HlUC/',
            handle: '@skincaregoalsaf'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ 'sunscreen' ],
        annotation: '@bioreus spf50+',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_3',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/beautiful-brunette-cute-774909.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.38.34 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/Bz8VHwmHFkj/',
            handle: '@made_u_blush'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ ],
        annotation: 'Dynamic Skin Recovery SPF 50 with Kale + Green Tea Spinach Cleanser, Hyaluronic Acid Serum Booster',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_4',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/blur-casual-close-up-462680.jpg'),
            tweetText: `Chemicals in #sunscreen can be harmful to corals and other marine life. #Hawaii has officially banned oxybenzone and octinoxate ...`,
            tweetUrl: 'https://twitter.com/4oceanbracelets/status/1014931415224471552',
            handle: '@4oceanbracelets'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Twitter,
        tags: [ 'chemical', 'sunscreen', 'environment' ],
        annotation: 'Hawaii banned oxybenzone and octinoxate in sunscreen because it\'s harmful to the ocean, particularly coral reefs',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_5',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/beautiful-brunette-cute-774909.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.27.34 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/BtyVv2vHPGs/',
            handle: '@skincaregoalsaf'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ ],
        annotation: '',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_6',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/beautiful-brunette-cute-774909.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.34.19 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/BtyVv2vHPGs/',
            handle: '@skincaregoalsaf'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ 'body' ],
        annotation: 'Top body shimmer product for summer ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_7',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/beautiful-brunette-cute-774909.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.44.26 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/Bpri2KCAWCk/',
            handle: '@skincaregoalsaf'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ ],
        annotation: 'Ascorbyl Glucoside Solution 12% (Okay)⁣, Moisturizing Eye Bomb (Recommend) ⁣, Protini Polypeptide Cream (Not recommend)',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_8',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/beautiful-brunette-cute-774909.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.50.41 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/Bzct2-WgQe3/',
            handle: '@skincaregoalsaf'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ 'K-beauty', 'lip products' ],
        annotation: 'Espoir Moonlit shade',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_9',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/beautiful-brunette-cute-774909.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.54.05 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/Be_s97BDtrK/',
            handle: '@skincaregoalsaf'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ 'K-beauty', 'lip products' ],
        annotation: 'new mlbb espoir velvet lipsticks for spring 2018 ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'socialmedia_10',
        title: '',
        contentType: ContentType.SocialMedia,
        contentData: {
            profileImgUrl: require('../../assets/dummy/beautiful-brunette-cute-774909.jpg'),
            instragramImageUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 2.00.39 PM.png'),
            instagramPostUrl: 'https://www.instagram.com/p/Bz52fw_gVRw/',
            handle: '@skincaregoalsaf'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Instagram,
        tags: [ 'K-beauty', 'foundations' ],
        annotation: 'Peripera\'s Blurring Skin Tint (tried the cc and will recommend) ',
        props: { height: ItemHeight, width: ItemWidth }
    }
];
