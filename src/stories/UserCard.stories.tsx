import React from 'react';
import { Story, Meta } from '@storybook/react';
import { UserCardView } from '@components/MyInfo';
import { Props } from '@components/MyInfo/UserCard/UserCardView';

export default {
  component: UserCardView,
  title: 'MyInfo/UserCardView',
  args: {
    name: {
      control: {
        type: 'string',
      },
    },
    emailAddress: {
      control: {
        type: 'string',
      },
    },
    profileImg: {
      control: {
        type: 'string',
      },
    },
  },
} as Meta;

const Template: Story<Props> = args => <UserCardView {...args} />;

export const Default = Template.bind({});
Default.args = {
  emailAddress: 'dregonc@naver.com',
  name: '김승준',
  profileImg: 'default',
};
