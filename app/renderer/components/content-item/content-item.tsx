import * as React from 'react';
import { IContentItem, ContentType, MediaSourceType } from '../../constants/types';
import { PhotoContentItem } from './photo-content';
import './content-item.scss'
import { VideoContentItem } from './video-content';
import { ArticleContentItem } from './article-content';
import { LinkContentItem } from './link-content';
import { SocialMediaContentItem } from './socialmedia-item';
import { ContentViewerData } from '../../access/observables/observables';
import { InView } from 'react-intersection-observer';
import { StickyContentItem } from './sticky-content';
import { MediaTypeImages } from '../../constants/constants';

export class ContentItemWrapper extends React.Component<{
    data: IContentItem<any>,
    menuInvoked?: ($event: MouseEvent) => {},
    inheritDimensions?: boolean,
    root?: Element,
    propsChanged?: () => {}
}, {
    annotationAndNotesShown: boolean,
    showEntity: boolean
}> {
    constructor(props) {
        super(props);
        this.state = {
            annotationAndNotesShown: false,
            showEntity: false
        };
    }
    invokeMenu($event) {
        this.props.menuInvoked($event);
    }
    showAnnotationAndNotes() {
        const { annotationAndNotesShown } = this.state;
        this.setState({
            annotationAndNotesShown: !annotationAndNotesShown
        });
    }
    openContent() {
        if (this.props.data.contentType === ContentType.Photo || this.props.data.contentType === ContentType.Video) {
            ContentViewerData.next(this.props.data);
        }
    }
    onViewChange(inView, entry) {
        const notInView = this.state.showEntity;
        if (inView && !notInView) {
            this.setState({
                showEntity: true
            });
        }
    }
    render() {
        const type = this.props.data.contentType;
        let label = '';
        let currentContentImage = null;
        let currentContentImageClass = 'content-type-image ';
        switch (type) {
            case ContentType.Article: {
                currentContentImage = MediaTypeImages.news;
                currentContentImageClass = 'content-type-image no-shadow';
                if (this.props.data.sourceType === MediaSourceType.ACM) {
                    label = 'ACM'
                } else if (this.props.data.sourceType === MediaSourceType.Scholar) {
                    label = 'Scholar'
                } else if (this.props.data.sourceType === MediaSourceType.Medium) {
                    label = 'Medium'
                    currentContentImage = MediaTypeImages.medium;
                } else if (this.props.data.sourceType === MediaSourceType.Quora) {
                    label = 'Quora';
                    currentContentImage = MediaTypeImages.quora;
                    currentContentImageClass = currentContentImageClass + ' small';
                }
                break;
            }
            case ContentType.Sticky: {
                label = 'Note';
                currentContentImageClass = 'content-type-image no-shadow';
                currentContentImage = MediaTypeImages.notes;
                break;
            }
            case ContentType.Link: {
                label = 'Link';
                currentContentImage = MediaTypeImages.link;
                currentContentImageClass = 'content-type-image no-shadow';
                currentContentImageClass = currentContentImageClass + ' small';
                break;
            }
            case ContentType.Photo: {
                label = 'Photo'; currentContentImage = MediaTypeImages.photo;
                break;
            }
            case ContentType.Video: {
                label = this.props.data.sourceType === MediaSourceType.Vimeo ? 'Vimeo' : 'Youtube';
                if (this.props.data.sourceType === MediaSourceType.Vimeo) {
                    currentContentImage = MediaTypeImages.vimeo;
                } else if (this.props.data.sourceType === MediaSourceType.Youtube) {
                    currentContentImage = MediaTypeImages.youtube;
                    currentContentImageClass = currentContentImageClass + ' youtube';
                } else {
                    currentContentImage = MediaTypeImages.videoPlayer;
                }
                break;
            }
            case ContentType.SocialMedia: {
                if (this.props.data.sourceType === MediaSourceType.Twitter) {
                    label = 'Twitter';
                    currentContentImageClass = 'content-type-image no-shadow';
                    currentContentImage = MediaTypeImages.twitter;
                } else if (this.props.data.sourceType === MediaSourceType.Instagram) {
                    label = 'Instagram';
                    currentContentImage = MediaTypeImages.instagram;
                }
                break;
            }
        }
        let currentContent = <React.Fragment><h1>Content</h1><h2>...</h2></React.Fragment>;
        switch (type) {
            case ContentType.Photo: {
                currentContent = <PhotoContentItem data={this.props.data} />
                break;
            }
            case ContentType.Video: {
                currentContent = <VideoContentItem data={this.props.data} />
                break;
            }
            case ContentType.Article: {
                currentContent = <ArticleContentItem data={this.props.data} />
                break;
            }
            case ContentType.Link: {
                currentContent = <LinkContentItem data={this.props.data} />
                break;
            }
            case ContentType.SocialMedia: {
                currentContent = <SocialMediaContentItem data={this.props.data} />
                break;
            }
            case ContentType.Sticky: {
                currentContent = <StickyContentItem data={this.props.data} />
                break;
            }
            default: {
                currentContent = <React.Fragment><h1>Content</h1><h2>...</h2></React.Fragment>
                break;
            }
        }
        const contentImageStyle = {
            backgroundImage: `url(${currentContentImage})`
        };
        return (
            <React.Fragment>
                <div className={`inner-content-holder ${this.props.inheritDimensions ? 'inherit-dimensions' : ''}`}>
                    <div className='inner-content'>
                        <InView onChange={this.onViewChange.bind(this)} className='inview-wrapper'>
                            <div className={`inner-content-wrapper ${this.state.annotationAndNotesShown ? 'notes-open' : ''}`} onClick={this.openContent.bind(this)}>
                                {
                                    currentContentImage &&
                                    <div className={currentContentImageClass}><div className='image' style={contentImageStyle} /></div>
                                }
                                {
                                    this.state.showEntity &&
                                    currentContent
                                }
                                {
                                    this.props.data.title &&
                                    <div className='inner-overlay-content-wrapper'>
                                        <label className='inner-content-title'>{this.props.data.title}</label>
                                    </div>
                                }
                            </div>
                        </InView>
                        {
                            this.state.annotationAndNotesShown &&
                            <div className='inner-content-meta'>
                                <div className='inner-content-meta-tags'>
                                    <ul>
                                        {
                                            this.props.data.tags.map((tag, i) => <li key={i}>{tag}</li>)
                                        }
                                        <li className='new-tag'><i className='material-icons'>add</i> New</li>
                                    </ul>
                                </div>
                                <div className='inner-content-meta-notes'>
                                    {
                                        this.props.data.annotations.map((note, i) => <p key={i}>{note.message}</p>)
                                    }
                                </div>
                            </div>
                        }
                    </div>
                    <div className='inner-content-item-actions'>
                        {
                            this.state.annotationAndNotesShown && <i className='material-icons' onClick={this.showAnnotationAndNotes.bind(this)}>keyboard_arrow_up</i>
                        }
                        {
                            !this.state.annotationAndNotesShown && <i className='material-icons smaller' onClick={this.showAnnotationAndNotes.bind(this)}>notes</i>
                        }
                        <i className='material-icons' onClick={this.invokeMenu.bind(this)}>more_horiz</i>
                    </div>
                </div>
            </React.Fragment>);
    }
}
