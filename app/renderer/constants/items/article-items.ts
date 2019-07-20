import { IContentItem, ContentType, MediaSourceType, IArticleContent } from "../types";
import * as _ from 'lodash';
import { ItemHeight, ItemWidth } from "../constants";

export const DummyArticleItems: Array<IContentItem<IArticleContent>> = [
    {
        id: 'article_1',
        title: 'https://dl.acm.org/citation.cfm?id=1357127',
        contentType: ContentType.Article,
        contentData: {
            articleLink: 'https://dl.acm.org/citation.cfm?id=1357127',
            authorName: 'Aniket K',
            articleTitle: 'Crowdsourcing user studies with Mechanical Turk',
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['tag-1', 'tag-2'],
        annotation: '1The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_2',
        title: 'https://dl.acm.org/citation.cfm?id=1357127',
        contentType: ContentType.Article,
        contentData: {
            articleLink: 'https://dl.acm.org/citation.cfm?id=1357127',
            authorName: 'Napol R',
            articleTitle: 'Towards a Universal Knowledge Accelerator',
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['tag-1', 'tag-2'],
        annotation: '2The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_3',
        title: 'https://dl.acm.org/citation.cfm?id=1357127',
        contentType: ContentType.Article,
        contentData: {
            articleLink: 'https://dl.acm.org/citation.cfm?id=1357127',
            authorName: 'Nathan H',
            articleTitle: 'Market in Your Social Network: The Effects of Extrinsic Rewards on Friendsourcing and Relationships',
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['tag-1', 'tag-2'],
        annotation: '3The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_4',
        title: 'https://dl.acm.org/citation.cfm?id=1357127',
        contentType: ContentType.Article,
        contentData: {
            articleLink: 'https://dl.acm.org/citation.cfm?id=1357127',
            authorName: 'Niko N',
            articleTitle: 'Encouraging “Outside- the- box” Thinking in Crowd Innovation Through Identifying Domains of Expertise',
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['tag-1', 'tag-2'],
        annotation: '4The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_5',
        title: 'https://dl.acm.org/citation.cfm?id=1357127',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://dl.acm.org/citation.cfm?id=1357127',
            authorName: 'Niko N',
            articleTitle: 'A Contingency View of Transferring and Adapting Best Practices within Online Communities'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['tag-1', 'tag-2'],
        annotation: '5The toppings you may chose for that TV dinner pizza slice when you forgot to shop for foods, the paint you may slap on your face to impress the new boss is your business. ',
        props: { height: ItemHeight, width: ItemWidth }
    }
];
