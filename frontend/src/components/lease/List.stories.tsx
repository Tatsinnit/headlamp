import { Meta, Story } from '@storybook/react/types-6-0';
import { KubeObject } from '../../lib/k8s/cluster';
import { Lease } from '../../lib/k8s/lease';
import { TestContext } from '../../test';
import { LeaseList } from './List';
import { LEASE_DUMMY_DATA } from './storyHelper';

Lease.useList = () => {
  const objList = LEASE_DUMMY_DATA.map((data: KubeObject) => new Lease(data));

  return [objList, null, () => {}, () => {}] as any;
};

export default {
  title: 'Lease/LeaseListView',
  component: LeaseList,
  argTypes: {},
  decorators: [
    Story => {
      return (
        <TestContext>
          <Story />
        </TestContext>
      );
    },
  ],
} as Meta;

const Template: Story = () => {
  return <LeaseList />;
};

export const Items = Template.bind({});
