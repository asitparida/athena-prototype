import * as React from 'react';
import { IContentItem, IPhotoContent, ISocialMediaContent } from '../../constants/types';

export class InstagramContentViewer extends React.Component<{ data: IContentItem<ISocialMediaContent> }, { instagramHTML: string }> {

    constructor(props) {
        super(props);
        this.state = {
            instagramHTML: null
        };
    }

    fetchInstagramContent() {
        const url = `https://api.instagram.com/oembed?url=${this.props.data.contentData.instagramPostUrl}&OMITSCRIPT=true`;
        fetch(url).then(res => res.json())
        .then((res) => {
            this.setState({
                instagramHTML: res.html
            });
            setTimeout(() => {
                if ((window as any).instgrm) {
                    ((window as any).instgrm as any).Embeds.process()
                }
            }, 100);
        })
    }
    componentDidMount() {
        this.fetchInstagramContent();
    }

    render() {
        return (
            <React.Fragment>
                {
                    <div className="instagram-wrapper" dangerouslySetInnerHTML={{__html: this.state.instagramHTML}} />
                }
            </React.Fragment>
        );
    }
}
