import pytest
from playwright.sync_api import Page, expect

@pytest.fixture(scope="session")
def authenticate_user(browser):
    context = browser.new_context()
    page = context.new_page()
    
    # Perform login
    page.goto("http://localhost:3000/login")
    page.fill("input[name='username']", "moo")  # Replace with a valid username
    page.fill("input[name='password']", "moo")  # Replace with a valid password
    page.click("button[type='submit']")
    
    # Wait for navigation to the scan-plant page after login
    page.wait_for_url("http://localhost:3000/scan-plant")
    
    # Save login state
    context.storage_state(path="storage_state.json")
    context.close()

@pytest.fixture(scope="function")
def logged_in_page(browser, authenticate_user):
    context = browser.new_context(storage_state="storage_state.json")
    page = context.new_page()
    yield page
    context.close()

def test_scan_plant(logged_in_page: Page):
    page = logged_in_page

    # Navigate to the Scan Plant Page
    page.goto("http://localhost:3000/scan-plant")

    # Verify the title text to ensure the page loaded correctly
    expect(page.locator("h2")).to_have_text("Take Photo or Choose Existing Image for Plant")

    # Toggle the input method to show file upload option
    page.locator("button:text('Toggle Photo Upload Method')").click()

    # Simulate file upload
    with page.expect_file_chooser() as fc_info:
        page.locator("button:text('Choose Existing Photo')").click()
    file_chooser = fc_info.value
    file_chooser.set_files("C:\\SDD\\nature-id\\plant_images\\Persicaria_amphibia.jpg")  # Replace with a valid image path

    # Verify that the image was selected
    selected_image = page.locator("img[alt='Selected']")
    expect(selected_image).to_be_visible()

    # Upload the photo
    page.locator("button:text('Upload Photo')").click()

    # Check if the page navigates to the species information page
    page.wait_for_url("http://localhost:3000/species-information/*")
    assert page.url.startswith("http://localhost:3000/species-information/")

    # (Optional) Verify some content on the species information page
    # expect(page.locator("h1")).to_have_text("Species Information")

