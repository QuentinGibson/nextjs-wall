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
    post: {
      user: {
        avatar: "/uploads/avatars/test1.png",
        username: "Sam Smith",
      },
      subject: "Have a wonderful year!!!",
      content:
        "Coding is more than just writing lines of code. It is a way of expressing yourself, solving problems, and creating something amazing. Coding is also a way of showing love to others, by sharing your skills, ideas, and passion. Whether you are a beginner or a pro, keep coding with love! ❤️",
      likes: 4,
    },
    liked: false,
    likeDispatch: (payload: any) => {
      console.log(payload);
      if (!payload) {
        console.log("Like");
      } else {
        console.log("Unlike");
      }
    },
  },
};
