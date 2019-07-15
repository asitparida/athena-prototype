import * as React from 'react';
import RichTextEditor from 'react-rte';
import './rte-editor.scss';

export default class RTEEditor extends React.Component<any, any> {
    constructor(props) {
        super(props);
        this.state = {
            value: RichTextEditor.createEmptyValue()
        };
    }
    onChange = (value) => {
        this.setState({ value });
        // if (this.props.onChange) {
        //   this.props.onChange(
        //     value.toString('html')
        //   );
        // }
    };

    render() {
        const toolbarConfig = {
            // Optionally specify the groups to display (displayed in the order listed).
            display: ['INLINE_STYLE_BUTTONS', 'BLOCK_TYPE_DROPDOWN'],
            INLINE_STYLE_BUTTONS: [
                { label: 'Bold', style: 'BOLD', className: 'custom-css-class' },
                { label: 'Italic', style: 'ITALIC' },
                // {label: 'Underline', style: 'UNDERLINE'},
                // {label: 'Strikethrough', style: 'STRIKETHROUGH'},
                // {label: 'Code', style: 'CODE'},
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
                    <button><span>Gather</span> <i className='material-icons'>exit_to_app</i></button>
                    <button><span>Export</span> <i className='material-icons'>save_alt</i></button>
                    <button><span>Close</span><i className='material-icons'>close</i></button>
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
