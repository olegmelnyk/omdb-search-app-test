/*
 * SignInForm Messages
 *
 * This contains all the text for the SignInForm container.
 */

import { defineMessages } from 'react-intl';

export const scope = 'app.containers.SignInForm';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'Sign In',
    tagName: 'h3'
  },
});
