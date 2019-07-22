import { IBoardGroupWrapper, IGroupHeader } from "../types";
import { DummifiedArticleItems } from "./article-items";
import { DummifiedSocialMediaItems } from "./socialmedia-items";
import { DummifiedVideoItems } from "./video-items";
import { DummifiedPhotoItems } from "./photo-items";

export let BoardGroups: IBoardGroupWrapper[] = [
    {
        id: 'group_1',
        title: 'Zinc Oxide',
        props: { top: 0, left: 0 },
        items: [
            DummifiedArticleItems[1],
            DummifiedArticleItems[4],
            DummifiedPhotoItems[3]
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_2',
        title: 'Why Mineral ?',
        props: { top: 0, left: 0 },
        items: [
            DummifiedArticleItems[0],
            DummifiedSocialMediaItems[3]
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_3',
        title: 'Mineral Sunscreens and UV',
        props: { top: 0, left: 0 },
        items: [
            DummifiedArticleItems[3],
            DummifiedArticleItems[6],
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_4',
        title: 'Avobenzone',
        props: { top: 0, left: 0 },
        items: [
            DummifiedArticleItems[5],
            DummifiedSocialMediaItems[2],
            DummifiedPhotoItems[4]
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_5',
        title: 'Why Chemical? ',
        props: { top: 0, left: 0 },
        items: [
            DummifiedArticleItems[2],
            DummifiedSocialMediaItems[1],
            DummifiedVideoItems[1]
        ],
        annotation: 'The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. '
    },
    {
        id: 'group_6',
        title: 'DIY Sunscreen',
        props: { top: 0, left: 0 },
        items: [
            DummifiedSocialMediaItems[0],
            DummifiedVideoItems[0],
            DummifiedArticleItems[7]
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
