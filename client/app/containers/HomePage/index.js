/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 *
 */

import React from 'react';
import { FormattedMessage } from 'react-intl';

import SignInForm from 'containers/SignInForm';


export default function HomePage() {
  return (
    <SignInForm />
  );
}
