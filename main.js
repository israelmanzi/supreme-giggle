const puppetter = require("puppeteer");
const generator = require("generate-password");

(async () => {
  const browser = await puppetter.launch({
    headless: false,
    executablePath:
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  });

  var [page] = await browser.pages();

  page.goto("http://192.168.8.1/html/index.html");

  await page.setDefaultNavigationTimeout(0);

  await page.waitForSelector("#login_password");
  await page.waitForSelector("#login_btn");

  await page.focus("#login_password");

  await page.keyboard.type("eVPNiVq$");

  //   await page.type("#login_password", "eVPNiVq$");

  await page.click("#login_btn");

  //   const error_div = await page.$("#login_error_info");

  //   if (error_div) {
  //     console.log(
  //       "Error: ",
  //       await page.evaluate((el) => el.textContent, error_div)
  //     );
  //     page.close();
  //     return;
  //   }

  await page.waitForSelector("#menu_top_wifisettings");
  await page.goto("http://192.168.8.1/html/content.html#wifieasy");

  await page.waitForSelector("#wifi_singlechip_wpa_key");

  console.log(
    "OLD_SSID: ",
    await page.evaluate(
      () => document.querySelector("#wifi_singlechip_wpa_key").value
    )
  );

  const newSSID = generator.generate({
    length: 8,
    numbers: true,
    excludeSimilarCharacters: true,
    lowercase: true,
    symbols: true,
    uppercase: true,
    strict: true,
  });

  await page.evaluate(() =>
    document.querySelector("#wifi_singlechip_wpa_key").focus()
  );

  await page.click("#wifi_singlechip_wpa_key", { clickCount: 3 });

  await page.type("#wifi_singlechip_wpa_key", newSSID);

  console.log(
    "NEW_SSID: ",
    await page.evaluate(
      () => document.querySelector("#wifi_singlechip_wpa_key").value
    )
  );

  await page.waitForSelector("#wifi_btn_save");

  await page.click("#wifi_btn_save");
})();
