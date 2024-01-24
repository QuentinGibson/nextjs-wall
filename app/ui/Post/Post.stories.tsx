import { Meta, StoryObj } from "@storybook/react";
import { Post } from "./Post";

const meta = {
  title: "component/Post",
  component: Post,
} as Meta;

export default meta;

type Story = StoryObj<typeof Post>;

export const Unliked: Story = {
  args: {
    avatar: "/uploads/avatars/test1.png",
    subject: "Have a wonderful year!!!",
    content:
      "Coding is more than just writing lines of code. It is a way of expressing yourself, solving problems, and creating something amazing. Coding is also a way of showing love to others, by sharing your skills, ideas, and passion. Whether you are a beginner or a pro, keep coding with love! ❤️",
    hearts: 4,
    liked: false,
  },
};
