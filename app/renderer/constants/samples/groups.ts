import { IBoardGroupWrapper, IGroupHeader } from "../types";
import { DummyArticleItems } from "../items/article-items";
import { DummyLinkItems } from "../items/link-items";
import { DummyPhotoItems } from "../items/photo-items";
import { DummyVideoItems } from "../items/video-items";
import { DummySocialMediaItems } from "../items/socialmedia-items";

export let BoardGroups: IBoardGroupWrapper[] = [
    {
        id: 'group_1',
        title: 'Zinc Oxide',
        props: { top: 0, left: 0 },
        items: [
            DummyArticleItems[0],
            DummyLinkItems[0],
            DummyPhotoItems[0],
            DummyVideoItems[0],
            DummySocialMediaItems[0],
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_2',
        title: 'Why Mineral ?',
        props: { top: 0, left: 0 },
        items: [
            DummyArticleItems[1],
            DummyLinkItems[1],
            DummyPhotoItems[1],
            DummyVideoItems[1],
            DummySocialMediaItems[1],
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_3',
        title: 'Mineral Sunscreens and UV',
        props: { top: 0, left: 0 },
        items: [
            DummyArticleItems[2],
            DummyPhotoItems[2],
            DummyVideoItems[2],
            DummySocialMediaItems[2],
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_4',
        title: 'Avobenzone',
        props: { top: 0, left: 0 },
        items: [
            DummyArticleItems[3],
            DummyPhotoItems[3],
            DummyVideoItems[3],
            DummySocialMediaItems[3],
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_5',
        title: 'Why Chemical? ',
        props: { top: 0, left: 0 },
        items: [
            DummyArticleItems[3],
            DummyPhotoItems[3],
            DummyVideoItems[3],
            DummySocialMediaItems[3],
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_6',
        title: 'DIY Sunscreen',
        props: { top: 0, left: 0 },
        items: [
            DummyArticleItems[3],
            DummyPhotoItems[3],
            DummyVideoItems[3],
            DummySocialMediaItems[3],
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    }
];

export let GroupHeaders: IGroupHeader[] = [
    { id: 'header_1', name: 'Mineral Sunscreens', groups: [
        {
            id: BoardGroups[0].id,
        },
        {
            id: BoardGroups[1].id,
        },
        {
            id: BoardGroups[2].id,
        }
    ]},
    { id: 'header_2', name: 'Chemical Sunscreens', groups: [
        {
            id: BoardGroups[3].id,
        },
        {
            id: BoardGroups[4].id,
        }
    ]}
];
