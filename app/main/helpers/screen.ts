import  { screen } from 'electron';
import * as _ from 'lodash';

export function GetExternalDisplay() {
    let displays = screen.getAllDisplays()
    let externalDisplays = displays.filter((display) => {
      return display.bounds.x !== 0 || display.bounds.y !== 0
    });
    console.log(displays);
}
const onMainWindowMoved = (mainWindow) => {
  let winBounds = mainWindow.getBounds();
  let whichScreen = screen.getDisplayNearestPoint({x: winBounds.x, y: winBounds.y});
  mainWindow.setBounds(whichScreen.bounds, true);
}
export const onMovedDebounced = _.debounce(onMainWindowMoved, 200);