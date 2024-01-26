import { Meta, StoryObj } from "@storybook/react";
import Song from "./Song";

const meta = {
  title: "component/song",
  component: Song,
} as Meta;

export default meta;

type Story = StoryObj<typeof Song>;

export const Default: Story = {
  args: {
    name: "H U N G E R . O N . H I L L S I D E",
    artist: "J-Cole",
    content:
      "Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Donec odio. Quisque volutpat mattis eros. Nullam malesuada erat ut turpis. Suspendisse urna nibh viverra non semper suscipit posuere a pede",
    cover: "/album/the_off_season.png",
    flipped: false,
  },
};
