import { IContentItem, IPhotoContent, ContentType, MediaSourceType } from "../types";
import * as _ from 'lodash';
import { ItemWidth, ItemHeight } from "../constants";

export const DummifiedPhotoItems: Array<IContentItem<IPhotoContent>> = [
    {
        id: 'photo_1',
        title: 'Sunscreen SPF 50',
        contentType: ContentType.Photo,
        contentData: {
           imgUrl: require('../../assets/dummy/a0e63d5c263029849dde1918e5f99930.jpg')
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Browser,
        tags: [ 'sunscreen', 'sensitive skin' ],
        annotation: 'SPF 50 for sensitive skin',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'photo_2',
        title: 'Makeup Collection',
        contentType: ContentType.Photo,
        contentData: {
           imgUrl: require('../../assets/dummy/e56d1f2cd2c3c7cf3e41240b40d9b291.jpg')
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Browser,
        tags: [ 'makeup'],
        annotation: 'All makeup collection photo',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'photo_3',
        title: 'All Natural Face Mask',
        contentType: ContentType.Photo,
        contentData: {
           imgUrl: require('../../assets/dummy/8898550740df58d37ffa251b13faef2c.jpg')
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Browser,
        tags: [ 'skincare', 'facemask' ],
        annotation: 'Best selling face mask. All natural ingredient',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'photo_4',
        title: 'Sunscreen Comparison',
        contentType: ContentType.Photo,
        contentData: {
           imgUrl: require('../../assets/dummy/sunscreen-white-cast-3.jpg')
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Browser,
        tags: [ 'mineral', 'zinc oxide', 'white cast', 'sunscreen' ],
        annotation: 'Comparing types of sunscreen and the white cast they give on face; Sunsense has least white cast and Invisible Zinc has the most (Neutrogena in the middle)',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'photo_5',
        title: 'Ingredients for UVA/UVB',
        contentType: ContentType.Photo,
        contentData: {
           imgUrl: require('../../assets/dummy/Sunscreen-Ingredients-UVA-UVB-protection.jpg')
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Browser,
        tags: [ 'chemical', 'avobenzone', 'sunscreen'],
        annotation: 'Avobenzone covers both UVB and UVA at the same level as zinc oxide, but is simply the chemical version',
        props: { height: ItemHeight, width: ItemWidth }
    }
];
