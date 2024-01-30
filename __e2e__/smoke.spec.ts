import { test, expect } from "@playwright/test";

test("has title", async ({ page }) => {
  await page.goto("/home");

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Quentin Gibson/);

  await expect(page.getByRole("heading", { name: "Thank you" })).toBeVisible();
});

test("get started link", async ({ page }) => {
  await page.goto("/login");

  // Click the get started link.
  await page.getByRole("link", { name: "Log In" }).click();

  // Expects page to have a heading with the name of Installation.
  await expect(
    page.getByRole("heading", { name: "Installation" })
  ).toBeVisible();
});
