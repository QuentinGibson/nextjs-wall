import type { Preview, ReactRenderer } from "@storybook/react";
import { withThemeByDataAttribute } from "@storybook/addon-themes";
import "../app/globals.css";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    decorators: [
      withThemeByDataAttribute<ReactRenderer>({
        themes: {
          light: "light",
          dark: "dark",
        },
        defaultTheme: "light",
        attributeName: "data-theme",
      }),
    ],
  },
};

export default preview;
