import * as React from 'react';
import { IContentItem, INoteContent } from '../../constants/types';

export class StickyContentItem extends React.Component<{ data: IContentItem<INoteContent> }, { }> {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className='note-content content-marker'>
                <p className='note-text'>{this.props.data.contentData.noteText}</p>
            </div>
        );
    }
}
