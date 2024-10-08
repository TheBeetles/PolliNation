import pytest
from playwright.sync_api import expect, Page

#fixture that sets up browser page at our URL, provides a setup page for tests to use,
@pytest.fixture
def setup_page(page: Page):
    page.goto('http://localhost:3000/create-profile')
    return page

def test_successful_profile_creation(setup_page: Page):
    page = setup_page
    page.fill('input[placeholder="Username"]', 'new_username')
    page.fill('input[placeholder="Password"]', 'new_password')
    page.click('button:has-text("Create Profile")')
    expect(page).to_have_url('http://localhost:3000/login')
