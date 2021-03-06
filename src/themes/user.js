import * as Colors from 'material-ui/styles/colors';
import Spacing from 'material-ui/styles/spacing';
import { fade } from 'material-ui/utils/colorManipulator';

export default {
  spacing: Spacing,
  fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: Colors.green700,
    primary2Color: Colors.green500,
    primary3Color: Colors.green100,
    accent1Color: Colors.lightGreen500,
    accent2Color: Colors.white,
    accent3Color: Colors.grey500,
    textColor: Colors.darkBlack,
    alternateTextColor: Colors.white,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    disabledColor: fade(Colors.darkBlack, 0.3),
    pickerHeaderColor: Colors.green500,
    clockCircleColor: fade(Colors.darkBlack, 0.07),
    shadowColor: Colors.fullBlack,
  },
};
