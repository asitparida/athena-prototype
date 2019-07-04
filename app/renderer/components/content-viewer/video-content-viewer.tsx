import * as React from 'react';
import Plyr from 'plyr';
import { IContentItem, IPhotoContent, IVideoContent } from '../../constants/types';

export class VideoContentViewer extends React.Component<{ data: IContentItem<IVideoContent> }, {}> {
    ref;
    player;
    constructor(props) {
        super(props);
        this.ref = React.createRef();
    }
    componentDidMount() {
        const player = new Plyr('#player');
        if (player) {
            player.source = {
                type: 'video',
                sources: [
                    {
                        src: this.props.data.contentData.videoId,
                        provider: 'youtube',
                    },
                ],
            };
            player.on('ready', event => {
                player.play();
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                {
                    <div className='video-content-viewer' ref={this.ref}>
                        <div  className='video-player'id="player" data-plyr-provider="youtube" data-plyr-embed-id={this.props.data.contentData.videoId} />
                    </div>
                }
            </React.Fragment>
        );
    }
}
