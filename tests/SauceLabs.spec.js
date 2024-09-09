const { test, expect } = require('@playwright/test');

// Test 1: Check Page Title
test('Swag Labs - Page Title', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await expect(page).toHaveTitle('Swag Labs');
});

// Test 2: Check Login Functionality
test('Swag Labs - Valid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user'); 
  await page.fill('#password', 'secret_sauce'); 
  await page.click('#login-button');
  await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html'); // Verify URL after login
});

// Test 3: Invalid Login Attempt
test('Swag Labs - Invalid Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'invalid_user'); // Invalid username
  await page.fill('#password', 'wrong_password'); // Invalid password
  await page.click('#login-button');
  const errorMessage = await page.locator('.error-message-container').textContent(); 
  await expect(errorMessage).toContain('Username and password do not match');
});

// Test 4: Add Product to Cart
test('Swag Labs - Add Product to Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  const cartCount = await page.locator('.shopping_cart_badge').textContent(); 
  await expect(cartCount).toBe('1'); // Verify cart count
});

// Test 5: Verify Cart Contents
test('Swag Labs - Verify Cart Contents', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link'); 
  const cartItemName = await page.locator('.inventory_item_name').textContent();
  await expect(cartItemName).toContain('Sauce Labs Backpack'); // Verify item in cart
});

// Test 6: Complete Purchase Flow
test('Swag Labs - Complete Purchase', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link'); 
  await page.click('[data-test="checkout"]');
  await page.fill('[data-test="firstName"]', 'John');
  await page.fill('[data-test="lastName"]', 'Doe');
  await page.fill('[data-test="postalCode"]', '12345');
  await page.click('[data-test="continue"]');
  await page.click('[data-test="finish"]');
  const successMessage = await page.locator('.complete-header').textContent();
  await expect(successMessage).toBe('Thank you for your order!'); // Verify purchase success
});
// Test 7: Sort Items by Price (Low to High)
test('Swag Labs - Sort Items by Price', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.selectOption('.product_sort_container', 'lohi'); // Select "Price (low to high)"
  const firstItemPrice = await page.locator('.inventory_item_price').first().textContent();
  await expect(firstItemPrice).toBe('$7.99'); // Verify the first item has the lowest price
});

// Test 8: Log Out Functionality
test('Swag Labs - Log Out', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('#react-burger-menu-btn'); 
  await page.click('#logout_sidebar_link');
  await expect(page).toHaveURL('https://www.saucedemo.com/'); // Verify redirection to login page
});

// Test 9: Attempt to Add Product Without Login
test('Swag Labs - Add to Cart Without Login', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  const errorMessage = await page.locator('.error-message-container').textContent();
  await expect(errorMessage).toContain('Epic sadface'); // Verify that an error message appears
});

// Test 10: Verify Product Description
test('Swag Labs - Verify Product Description', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  const productDescription = await page.locator('.inventory_item_desc').first().textContent();
  await expect(productDescription).toContain('carry.allTheThings()'); // Verify product description
});

// Test 11: Remove Item from Cart
test('Swag Labs - Remove Item from Cart', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]');
  await page.click('.shopping_cart_link'); 
  await page.click('[data-test="remove-sauce-labs-backpack"]'); // Remove the item
  const cartCount = await page.locator('.shopping_cart_badge').count();
  await expect(cartCount).toBe(0); 
});

// Test 12: Check Social Media Links
test('Swag Labs - Social Media Links', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  const twitterLink = await page.locator('.social_twitter a').getAttribute('href');
  const facebookLink = await page.locator('.social_facebook a').getAttribute('href');
  const linkedinLink = await page.locator('.social_linkedin a').getAttribute('href');
  await expect(twitterLink).toBe('https://twitter.com/saucelabs');
  await expect(facebookLink).toBe('https://www.facebook.com/saucelabs');
  await expect(linkedinLink).toBe('https://www.linkedin.com/company/sauce-labs/');
});

// Test 13: Reset App State
test('Swag Labs - Reset App State', async ({ page }) => {
  await page.goto('https://www.saucedemo.com/');
  await page.fill('#user-name', 'standard_user');
  await page.fill('#password', 'secret_sauce');
  await page.click('#login-button');
  await page.click('[data-test="add-to-cart-sauce-labs-backpack"]'); 
  await page.click('#react-burger-menu-btn'); 
  await page.click('#reset_sidebar_link'); 
  const cartCount = await page.locator('.shopping_cart_badge').count();
  await expect(cartCount).toBe(0); // Verify cart is empty after reset
});