import { IContentItem, ContentType, MediaSourceType, IVideoContent } from "../types";
import * as _ from 'lodash';
import { ItemHeight, ItemWidth } from "../constants";

// require('../../assets/dummy/
export const DummifiedVideoItems: Array<IContentItem<IVideoContent>> = [
    {
        id: 'video_6',
        title: 'Why DIY Sunscreen Doesn Not Work | Lab Muffin Beauty Science',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.39.09 PM.png'),
            videoId: 'aTNcbLHZusc',
            videoUrl: `https://www.youtube.com/watch?v=aTNcbLHZusc`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'chemical', 'mineral', 'sunscreen', 'DIY' ],
        annotation: 'DIY sunscreen uses uncoated zinc oxide which leads to poor coverage - therefore very dangerous. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_7',
        title: 'How Sunscreen Works',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.58.26 PM.png'),
            videoId: 'cC-d9ZsnLds',
            videoUrl: `https://www.youtube.com/watch?v=cC-d9ZsnLds`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'sunscreen', 'protection', 'UV rays'],
        annotation: 'no sunscreen completely blocks UV rays so you need to cover your body with clothing as well as additional protection that protects against both UVA and UVB rays. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_8',
        title: 'Physical vs Chemical Sunscreen - How To Choose The Best Sunscreen',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.42.33 PM.png'),
            videoId: 'c9z-MNOFCZIg',
            videoUrl: `https://www.youtube.com/watch?v=9z-MNOFCZIg`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'sunscreen'],
        annotation: 'Physical vs Chemical sunscreen product comparison',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_9',
        title: 'Mineral Sunscreen vs Chemical Sunscreen: Which is Best? | Beauty with Susan Yara',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.47.19 PM.png'),
            videoId: '9M4Lkx03QVw',
            videoUrl: `https://www.youtube.com/watch?v=9M4Lkx03QVw`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'chemical'],
        annotation: 'Best product review: Mineral vs Chemical sunscreen',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_10',
        title: 'LIP CARE 💋Moisturizing Lip Products for Dry, Chapped Lips & Angular Cheilitis',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.46.02 PM.png'),
            videoId: 'XUSLVPzgo6c',
            videoUrl: `https://www.youtube.com/watch?v=XUSLVPzgo6c`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'lip products'],
        annotation: 'Lip Products, Mosturizing',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_11',
        title: 'How To Get That Glow For Korean Glass Skin WITHOUT MAKEUP (feat. Sharmander)',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.49.12 PM.png'),
            videoId: 'usmxR965Kko',
            videoUrl: `https://www.youtube.com/watch?v=usmxR965Kko`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'skincare'],
        annotation: 'Glass skin glow',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_12',
        title: 'K Pop Idol Beauty Secrets Revealed! BTS & Red Velvet’s Tips for Glowing Skin! | Teen Beauty Bible',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.51.34 PM.png'),
            videoId: 'gzQCoQlOyFg',
            videoUrl: `https://www.youtube.com/watch?v=gzQCoQlOyFg`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'skincare'],
        annotation: 'Skincare Routine',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'video_13',
        title: 'BT21 Makeup Season 2- Did they get it right this time?',
        contentType: ContentType.Video,
        contentData: {
            videoThumbnailUrl: require('../../assets/dummy/Screen Shot 2019-07-15 at 1.54.55 PM.png'),
            videoId: 'EUceC1GcTH4',
            videoUrl: `https://www.youtube.com/watch?v=EUceC1GcTH4`,
            videoEndTick: 0,
            videoStartTick: 0,
            videoLength: _.sample(_.range(45, 200))
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Youtube,
        tags: [ 'makeup'],
        annotation: 'celebrity makeup',
        props: { height: ItemHeight, width: ItemWidth }
    }
];
