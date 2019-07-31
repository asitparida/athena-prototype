import { IContentItem, ContentType, MediaSourceType, IArticleContent } from "../types";
import * as _ from 'lodash';
import { ItemHeight, ItemWidth } from "../constants";

export const DummifiedArticleItems: Array<IContentItem<IArticleContent>> = [
    {
        id: 'article_1',
        title: 'https://www.piedmont.org/living-better/the-difference-between-physical-and-chemical-sunscreen',
        contentType: ContentType.Article,
        contentData: {
            articleLink: 'https://www.piedmont.org/living-better/the-difference-between-physical-and-chemical-sunscreen',
            authorName: 'Piedmont Healthcare',
            articleTitle: 'The difference between physical and chemical sunscreen',
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['chemical', 'mineral', 'sunscreen'],
        annotation: 'chemical sunscreen more water-resistant, but mineral sunscreen more moisturizing',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_2',
        title: 'https://www.thecut.com/2019/05/sunscreens-bloodstream-fda-study.html',
        contentType: ContentType.Article,
        contentData: {
            articleLink: 'https://www.thecut.com/2019/05/sunscreens-bloodstream-fda-study.html',
            authorName: 'Erica Smith',
            articleTitle: 'The Chemicals in Your Sunscreen Are Being Absorbed Into Your Blood',
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['mineral', 'sunscreen', 'zinc oxide', 'safety'],
        annotation: 'Chemical sunscreens absorbed into bloodstream at low concentrations, still better than no sunscreen',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_3',
        title: 'https://www.nytimes.com/2019/06/10/upshot/how-safe-is-sunscreen.html',
        contentType: ContentType.Article,
        contentData: {
            articleLink: 'https://www.nytimes.com/2019/06/10/upshot/how-safe-is-sunscreen.html',
            authorName: 'Aaron E. Carroll',
            articleTitle: 'How Safe Is Sunscreen?',
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['skin cancer', 'sunscreen'],
        annotation: 'chemical sunscreens might be bad but skin cancer is worse!!!',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_4',
        title: 'https://academic.oup.com/toxsci/article/123/1/264/1644613',
        contentType: ContentType.Article,
        contentData: {
            articleLink: 'https://academic.oup.com/toxsci/article/123/1/264/1644613',
            authorName: 'N.A. Monteiro-Riviere etc.',
            articleTitle: 'Safety Evaluation of Sunscreen Formulations Containing Titanium Dioxide and Zinc Oxide Nanoparticles in UVB Sunburned Skin: An In Vitro and In Vivo Study',
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['zinc oxide', 'mineral', 'sunscreen'],
        annotation: 'Zinc/Titanium not absorbed through skin even if sunburned',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_5',
        title: 'https://onlinelibrary.wiley.com/doi/full/10.1046/j.1524-4725.2000.99237.x',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://onlinelibrary.wiley.com/doi/full/10.1046/j.1524-4725.2000.99237.x',
            authorName: 'Sheldon R. Pinnell MD',
            articleTitle: 'Microfine Zinc Oxide is a Superior Sunscreen Ingredient to Microfine Titanium Dioxide'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['zinc oxide', 'titanium dioxide', 'mineral', 'sunscreen'],
        annotation: 'Zinc a better mineral material than Titanium (not as white, absorbs more UVA)',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_6',
        title: 'http://www.skintherapyletter.com/sunscreen/advances-update/',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'http://www.skintherapyletter.com/sunscreen/advances-update/',
            authorName: 'R. Bissonnette, MD, FRCPC',
            articleTitle: 'Update on Sunscreens'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['chemical', 'mineral', 'sunscreen'],
        annotation: 'General discussion of sunscreen, importance of UVA protection',
        props: { height: ItemHeight, width: ItemWidth }
    },
        {
        id: 'article_7',
        title: 'https://link.springer.com/article/10.2165/11537050-000000000-00000',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://link.springer.com/article/10.2165/11537050-000000000-00000',
            authorName: 'Donathan G. Beasley',
            articleTitle: 'Characterization of the UVA Protection Provided by Avobenzone, Zinc Oxide, and Titanium Dioxide in Broad-Spectrum Sunscreen Products'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['chemica', 'mineral', 'sunscreen'],
        annotation: 'Comparison of Zinc/avobenzone in UVA protection (chemical vs. mineral)',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_8',
        title: 'https://onezero.medium.com/pinterest-has-a-fake-news-problem-about-sunscreen-c3f21f87c6b1',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://onezero.medium.com/pinterest-has-a-fake-news-problem-about-sunscreen-c3f21f87c6b1',
            authorName: 'Angela Lashbrook',
            articleTitle: 'Dangerous DIY Sunscreen Recipes Are Spreading on Pinterest'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Medium,
        tags: ['safety', 'DIY', 'sunscreen'],
        annotation: 'Most people think homemade sunscreens are good for you (they are not)',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_9',
        title: 'https://www.healthline.com/health/beauty-skin-care/nose-pores',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://www.healthline.com/health/beauty-skin-care/nose-pores',
            authorName: 'Healthline',
            articleTitle: 'What Causes Large Nose Pores and What Can You Do?'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['face', 'clean', 'pores'],
        annotation: 'How to clean englarged nose pores',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_10',
        title: 'https://www.medicalnewstoday.com/articles/322421.php',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://www.medicalnewstoday.com/articles/322421.php',
            authorName: 'Zawn Villnes',
            articleTitle: 'Six natural ways to whiten teeth'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['natural', 'teeth', 'tooth care'],
        annotation: 'Pay attention to tip #2 and #3',
        props: { height: ItemHeight, width: ItemWidth }
    },
        {
        id: 'article_11',
        title: 'https://www.businessinsider.com/dangerous-chemicals-in-beauty-products-makeup-list-2019-6',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://www.businessinsider.com/dangerous-chemicals-in-beauty-products-makeup-list-2019-6',
            authorName: 'Zawn Villnes',
            articleTitle: 'Cancer-causing toxins were just found in foundation and sparkly makeup — here are 11 chemicals that could lurk in your lipstick, lotion, and eye powder'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['clean makeup', 'chemicals', 'asbestos'],
        annotation: 'Parabens are also common in shampoo, shaving cream, moisturizers, and other makeup - good to check for',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_12',
        title: 'https://www.whowhatwear.com/how-to-unclog-pores',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://www.whowhatwear.com/how-to-unclog-pores',
            authorName: 'Micaela English',
            articleTitle: '5 Skincare Experts Share the Best Products and Tips for Unclogging Pores'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['cleansing'],
        annotation: 'some tips on cleanser. Dont agree with #3',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_13',
        title: 'https://patents.google.com/patent/US5593662A/en',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://patents.google.com/patent/US5593662A/en',
            authorName: 'George E Deckner',
            articleTitle: 'Moisturizing lipstick compositions'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['water-free moisturizing'],
        annotation: 'interesting lipstick innovation - look to see how used',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_14',
        title: 'https://www.researchgate.net/publication/51714131_Topical_effectiveness_of_a_cosmetic_skincare_treatment_for_acne-prone_skin_A_clinical_study',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://www.researchgate.net/publication/51714131_Topical_effectiveness_of_a_cosmetic_skincare_treatment_for_acne-prone_skin_A_clinical_study',
            authorName: 'Igor Bartenjev',
            articleTitle: 'Topical effectiveness of a cosmetic skincare treatment for acne-prone skin: A clinical study'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['acne'],
        annotation: 'Normaderm had significant impact on pore appearance',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_15',
        title: 'https://patents.google.com/patent/US20070202060A1/en',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://patents.google.com/patent/US20070202060A1/en',
            authorName: 'Arne Ptock',
            articleTitle: 'Retinoid-Containing Preparations'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['retinoid'],
        annotation: '',
        props: { height: ItemHeight, width: ItemWidth }
    },
    {
        id: 'article_16',
        title: 'https://patents.google.com/patent/US5876736A/en',
        contentType: ContentType.Article,
        contentData: {
            articleLink:  'https://patents.google.com/patent/US5876736A/en',
            authorName: 'Kenneth A Cohen',
            articleTitle: 'Skin revitalizing makeup'
        },
        sourcePreviewAvailable: false,
        sourceType: MediaSourceType.Quora,
        tags: ['antioxidant', 'makeup'],
        annotation: 'makeup that could actually be good for your skin',
        props: { height: ItemHeight, width: ItemWidth }
    }
];
