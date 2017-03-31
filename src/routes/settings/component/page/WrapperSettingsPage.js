import React, { PropTypes, Component } from 'react';
import pureRender from 'pure-render-decorator';

// material-ui
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';

// custom components
import UserSession from 'components/UserSession';
import PasswordReset from 'components/PasswordReset';
import PersonalInfo from 'components/PersonalInfo';

// styles
import styles from './styles';

@pureRender
export default class WrapperSettingsPage extends Component {
  static propTypes = {
    user: PropTypes.object,
    updateUser: PropTypes.func,
    session: PropTypes.object,
    initialRenderTime: PropTypes.number,
  };

  constructor(...args) {
    super(...args);
    this.state = {
      stepIndex: 0,
    };
  }

  getStepContent(stepIndex) {
    const {
      updateUser,
      session,
      initialRenderTime,
      user,
     } = this.props;

    const regexRules = [
      {
        regex: '(?=.{8,})',
        description: 'At least 8 characters',
      },
      {
        regex: '(?=.*[0-9])',
        description: 'At least 1 numerical character',
      },
      {
        regex: '(?=.*[a-z])|(?=.*[A-Z])',
        description: 'At least 1 alphabetical character',
      },
    ];

    switch (stepIndex) {
      case 0:
        return (
          [
            <PersonalInfo
              updateUser={updateUser}
              user={user}
            />,
            <PasswordReset
              updatePassword={updateUser}
              regexRules={regexRules}
            />,
          ]
      );
      case 1:
        return (
        <UserSession
          info={session}
          renderTime={initialRenderTime}
        />
      );
      default:
        return 'You\'re a long way from home sonny jim!';
    }
  }

  render() {
    const {
      stepIndex,
    } = this.state;

    return (
      <div className="flex layout vertical">
        <Toolbar style={{ background: 'white', borderBottom: '1px solid #aaaaaa' }}>
          <ToolbarGroup firstChild style={{ marginLeft: '5px' }}>
            <div
              style={stepIndex === 0 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 0 }); }}
            >
              Info
            </div>
            <div
              style={stepIndex === 1 ? styles.menuItemSelected : styles.menuItem}
              onClick={() => { this.setState({ stepIndex: 1 }); }}
            >
              Session
            </div>
          </ToolbarGroup>
        </Toolbar>
        <div style={styles.container}>
            {this.getStepContent(this.state.stepIndex)}
        </div>
      </div>
    );
  }
}