import * as React from 'react';
import RichTextEditor from 'react-rte';
import * as _ from 'lodash';
import './rte-editor.scss';

export default class RTEEditor extends React.Component<{value: any,
    closeEditor: () => {},
    gatherNotes: () => {},
    exportNotes: () => {},
    onChange: (value) => {}
}, any> {
    debouncedPropagate = _.debounce(this.propagateChange, 1000);
    constructor(props) {
        super(props);
        this.state = {
            value: this.props.value ? RichTextEditor.createValueFromString(this.props.value, 'html') : RichTextEditor.createEmptyValue()
        };
    }
    onChange = (value) => {
        this.setState({ value });
        this.debouncedPropagate();
    }
    propagateChange() {
        const value = this.state.value;
        this.props.onChange((value as any).toString('html'));
    }

    onClose() {
        this.props.closeEditor();
    }

    gatherNotes() {
        this.propagateChange();
        this.props.gatherNotes();
    }

    export() {
        this.propagateChange();
        this.props.exportNotes();
        console.log('export');
    }

    componentWillUpdate(props) {
        if (!_.isEqual(props.value, this.props.value)) {
            this.setState({
                value: props.value ? RichTextEditor.createValueFromString(props.value, 'html') : RichTextEditor.createEmptyValue()
            })
        }
    }

    componentWillUnmount() {
        this.propagateChange();
        this.debouncedPropagate.cancel();
    }

    render() {
        const toolbarConfig = {
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
            INLINE_STYLE_BUTTONS: [
                { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
                { label: 'Italic', style: 'ITALIC' },
                {label: 'Code', style: 'CODE'},
                { label: 'UL', style: 'unordered-list-item' },
                { label: 'OL', style: 'ordered-list-item' }
            ],
            BLOCK_TYPE_DROPDOWN: [
                { label: 'Normal', style: 'unstyled' },
                { label: 'Heading Large', style: 'header-one' },
                { label: 'Heading Medium', style: 'header-two' },
                { label: 'Heading Small', style: 'header-three' }
            ]
        };
        return (
            <div className="rte-wrapper">
                <div className='rte-header'>
                    <button onClick={this.gatherNotes.bind(this)}><span>Gather</span> <i className='material-icons'>exit_to_app</i></button>
                    <button onClick={this.export.bind(this)}><span>Export</span> <i className='material-icons'>save_alt</i></button>
                    <button onClick={this.onClose.bind(this)}><span>Close</span><i className='material-icons'>close</i></button>
                </div>
                <div className='rte-content'>
                    <RichTextEditor
                        toolbarConfig={toolbarConfig}
                        value={this.state.value}
                        onChange={this.onChange.bind(this)}
                    />
                </div>
            </div>
        );
    }
}
