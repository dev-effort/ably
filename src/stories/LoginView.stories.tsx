import React from 'react';
import { Story, Meta } from '@storybook/react';
import { Login } from '@components/Auth';

export default {
  component: Login,
  title: 'Auth/Login',
} as Meta;

const Template: Story = args => <Login {...args} />;

export const Default = Template.bind({});
