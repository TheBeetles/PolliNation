from playwright.sync_api import Page, expect
import pytest

@pytest.fixture(scope='function')
def setup_page(page: Page):
    #log in before accessing the saved-species page
    page.goto('http://localhost:3000/login')
    
    #fill in login credentials
    page.fill('input[placeholder="Username"]', 'moo')
    page.fill('input[placeholder="Password"]', 'moo')
    page.click('button:has-text("Login")')
    
    #ensure login is successful
    expect(page).to_have_url('http://localhost:3000/scan-species')
    
    #proceed to saved-species page
    page.goto('http://localhost:3000/saved-species')
    return page

def test_saved_species_page(setup_page):
    page = setup_page
    
    #verify that the "Plants" and "Insects" buttons exist
    plant_button = page.locator('text=Plants')
    insect_button = page.locator('text=Insects')
    expect(plant_button).to_be_visible()
    expect(insect_button).to_be_visible()
    
    #click on the "Plants" button and verify navigation
    plant_button.click()
    expect(page).to_have_url('http://localhost:3000/saved-species')
    
    #click on the "Insects" button and verify navigation
    insect_button.click()
    expect(page).to_have_url('http://localhost:3000/saved-species')