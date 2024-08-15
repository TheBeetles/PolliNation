import pytest
from playwright.sync_api import expect, Page

@pytest.fixture
def setup_page(page: Page):
    page.goto('http://localhost:3000/login')
    return page

#have test fill in valid (existing) credentials
def test_successful_login(setup_page: Page):
    page = setup_page
    page.fill('input[placeholder="Username"]', 'moo')
    page.fill('input[placeholder="Password"]', 'moo')
    page.click('button:has-text("Login")')
    expect(page).to_have_url('http://localhost:3000/scan-species')

#have test fill in invalid credentials
def test_unsuccessful_login(setup_page: Page):
    page = setup_page
    page.fill('input[placeholder="Username"]', 'invalid_username')
    page.fill('input[placeholder="Password"]', 'invalid_password')
    page.click('button:has-text("Login")')
    expect(page.locator('h3')).to_have_text('Incorrect username or password')

#ensures after selecting create profile button, user gets directed to create profile page
def test_navigate_to_create_profile(setup_page: Page):
    page = setup_page
    page.click('button:has-text("Create Profile")')
    expect(page).to_have_url('http://localhost:3000/create-profile')
