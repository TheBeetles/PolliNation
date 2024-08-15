from playwright.sync_api import Page, expect
import pytest

@pytest.fixture(scope='function')
def setup_page(page: Page):
    #log in before accessing the scan-species page
    page.goto('http://localhost:3000/login')
    
    #fill in login credentials
    page.fill('input[placeholder="Username"]', 'moo')
    page.fill('input[placeholder="Password"]', 'moo')
    page.click('button:has-text("Login")')
    
    #ensure login is successful
    expect(page).to_have_url('http://localhost:3000/scan-species')
    
    #proceed to scan-species page
    page.goto('http://localhost:3000/scan-species')
    return page

def test_display_scan_options(setup_page):
    page = setup_page
    
    #verify that "Scan a Plant" button exists and has the correct text
    scan_plant_button = page.locator('text=Scan a Plant')
    expect(scan_plant_button).to_be_visible()

    #verify that "Scan an Insect" button exists and has the correct text
    scan_insect_button = page.locator('text=Scan an Insect')
    expect(scan_insect_button).to_be_visible()

def test_navigate_to_scan_plant(setup_page):
    page = setup_page

    #click on "Scan a Plant" button
    page.locator('text=Scan a Plant').click()

    #verify the navigation
    expect(page).to_have_url('http://localhost:3000/scan-plant')

def test_navigate_to_scan_insect(setup_page):
    page = setup_page

    #click on "Scan an Insect" button
    page.locator('text=Scan an Insect').click()

    #verify the navigation
    expect(page).to_have_url('http://localhost:3000/scan-insect')

def test_navigate_to_saved_species(setup_page):
    page = setup_page

    #click on "Saved Species" button
    page.locator('text=Saved Species').click()

    #verify the navigation
    expect(page).to_have_url('http://localhost:3000/saved-species')

def test_logout_success(setup_page):
    page = setup_page

    #click on "Logout" button
    page.locator('text=Logout').click()

    #verify the navigation to the login page
    expect(page).to_have_url('http://localhost:3000/login')

def test_logout_failure(setup_page):
    page = setup_page

    #mock the logout API response to return an error
    page.route('http://localhost:3000/api/logout', lambda route: route.fulfill(status=500))

    #click on "Logout" button
    page.locator('text=Logout').click()

    #verify that the error message is displayed
    error_message = page.locator('text=Something went wrong')
    expect(error_message).to_be_visible()
