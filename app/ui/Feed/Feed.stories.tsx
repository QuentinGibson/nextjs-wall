import { Meta, StoryObj } from "@storybook/react";
import Feed from "./Feed";

const meta = {
  title: "component/Feed",
  component: Feed,
  decorators: [
    (Story) => (
      <div className="flex w-screen justify-center">
        <Story />
      </div>
    ),
  ],
} as Meta;

export default meta;

type Story = StoryObj<typeof Feed>;

export const Default: Story = {
  args: {
    posts: [
      {
        id: "1",
        subject: "Post 1",
        content: "Content 1",
        avatar: "https://picsum.photos/200/300",
        liked: false,
        hearts: 0,
      },
      {
        id: "2",
        subject: "Post 2",
        content:
          "Hi there, I'm a front-end developer who loves creating beautiful and functional websites. I have experience with HTML, CSS, JavaScript, and various frameworks and libraries. I always strive to deliver high-quality code and design that meet the needs and expectations of my clients. If you like my work, please share your feedback and support me. It means a lot to me and helps me grow as a developer. Thank you!  ",
        avatar: "https://picsum.photos/200/300",
        liked: true,
        hearts: 8,
      },
      {
        id: "3",
        subject: "Post 3",
        content:
          "Hello, I'm a front-end developer with a passion for web design. I enjoy creating websites that are user-friendly and visually appealing. If you like my work, please share your feedback and support me!",
        avatar: "uploads/avatars/test1.png",
        liked: true,
        hearts: 10,
      },
      {
        id: "4",
        subject: "Holdin it down",
        content:
          "Coding is more than just writing lines of code. It is a way of expressing yourself, solving problems, and creating something amazing. Coding is also a way of showing love to others, by sharing your skills, ideas, and passion. Whether you are a beginner or a pro, keep coding with love! ❤️",
        avatar: "uploads/avatars/test2.png",
        liked: true,
        hearts: 132,
      },
    ],
  },
};
