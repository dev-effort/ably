import React from 'react';
import { Story, Meta } from '@storybook/react';
import { ReSettingPwVerify } from '@components/Auth';
import { BrowserRouter } from 'react-router-dom';

export default {
  component: ReSettingPwVerify,
  title: 'Auth/ReSettingPw',
} as Meta;

const Template: Story = args => (
  <BrowserRouter>
    <ReSettingPwVerify {...args} />
  </BrowserRouter>
);

export const Default = Template.bind({});
