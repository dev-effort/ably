import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Login } from '@components/Auth';
import { BrowserRouter } from 'react-router-dom';

export default {
  component: Login,
  title: 'Auth/Login',
} as Meta;

const Template: Story = args => (
  <BrowserRouter>
    <Login {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
