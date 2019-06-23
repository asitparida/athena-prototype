import * as React from 'react';
import { Workspace } from '../../constants/types';
import WorkspacePreview from './workspace-preview';
import './workspace-previewer.scss';

class WorkspacePreviewer extends React.Component<any, any> {

    render() {
        return (
            <div className='app-workspace-preview'>
                {
                    this.props.workspaces.map((w: Workspace, i) => {
                        console.log('here', w);
                        return <WorkspacePreview key={i} data={w} />
                    })
                }
            </div>
        );
    }
}

export default WorkspacePreviewer;
