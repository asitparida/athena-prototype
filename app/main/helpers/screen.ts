import { screen } from 'electron';
import * as _ from 'lodash';

export function GetExternalDisplay() {
  const displays = screen.getAllDisplays()
  const externalDisplays = displays.filter((display) => {
    return display.bounds.x !== 0 || display.bounds.y !== 0
  });
}
const onMainWindowMoved = (mainWindow) => {
  const winBounds = mainWindow.getBounds();
  const whichScreen = screen.getDisplayNearestPoint({ x: winBounds.x, y: winBounds.y });
  mainWindow.setBounds(whichScreen.bounds, true);
}
export const onMovedDebounced = _.debounce(onMainWindowMoved, 200);
