import { Meta, StoryObj } from "@storybook/react";
import Algorithm from "./Algorithm";

const meta = {
  title: "component/Algorithm",
  component: Algorithm,
  decorators: [
    (Story) => (
      <div className="flex justify-center pt-10">
        <Story />
      </div>
    ),
  ],
} as Meta;

export default meta;

type Story = StoryObj<typeof Algorithm>;

export const BFS: Story = {
  args: {
    name: "BFS",
    icon: "/algorithms/bfs.svg",
  },
};
