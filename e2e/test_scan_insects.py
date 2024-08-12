from playwright.sync_api import Page, expect


def test_image_placement(page: Page):
    '''
    Change this to what is actually does
    '''
    page.goto("localhost:3000/")
    page.wait_for_url("**/login")

    locator = page.locator("h1")
    expect(locator).to_have_text("Welcome!")
