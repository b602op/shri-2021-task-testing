const { assert } = require('chai');

describe('github', async function() {
    it('Тест, который пройдет', async function() {
        await this.browser.url('https://github.com/gemini-testing/hermione');
        await this.browser.assertView('plain', '#readme', {
            compositeImage: true,
        });

        const title = await this.browser.$('#readme h1').getText();
        assert.equal(title, 'Hermione');
    });
});

describe("Домашняя страница", () => {
    it("Мобила 414 - 1080", async function () {
        const browser = this.browser
        await browser.url("/hw/store/")

        await browser.setWindowSize(414, 1080)

        await browser.assertView("414xHome", ".navbar", {
        ignoreElements: [".Application-Brand"]
        })
    })
})

describe("страница каталога", () => {
    it("мобайл 414 - 1080", async function () {
      const browser = this.browser
      await browser.url("/hw/store/catalog")
  
      await browser.setWindowSize(414, 1080)
  
      await browser.assertView("414xCatalog", ".ProductItem", {
        ignoreElements: [".Image", ".ProductItem-Name", ".ProductItem-Price"]
      })
    })
  
    it("десктоп 1200 - 1080", async function () {
      const browser = this.browser
      await browser.url("/hw/store/catalog")
  
      await browser.setWindowSize(1200, 1080)
  
      await browser.assertView("1200xCatalog", ".ProductItem", {
        ignoreElements: [".Image", ".ProductItem-Name", ".ProductItem-Price"]
      })
    })
  
    it("десктоп клик по .ProductItem-DetailsLink", async function () {
      const browser = this.browser
      await browser.url("/hw/store/catalog")
  
      await browser.$(".ProductItem-DetailsLink").click()
      const url = await browser.url()
  
      assert.match(url, /catalog\/\d+$/)
    })
})

describe("страница корзины", () => {
    it("Screenshot Empty card page assert view", async function () {
      const browser = this.browser
      await browser.url("/hw/store/cart")
  
      await browser.setWindowSize(1200, 1080)
  
      await browser.assertView("1200xCartEmpty", ".Cart")
    })
  
    it("проверка корзины", async function () {
      const browser = this.browser
      await browser.url("/hw/store/cart")
  
      await browser.setWindowSize(1200, 1080)
  
      await browser.assertView("1200xCartInitial", ".Cart", {
        ignoreElements: [
          ".Cart-Name",
          ".Cart-OrderPrice",
          ".Cart-Price",
          ".Cart-Total"
        ]
      })
  
      await browser.url("/hw/store/delivery")
      await browser.url("/hw/store/contacts")
      await browser.url("/hw/store/cart")
  
      await browser.assertView("1200xCartResult", ".Cart", {
        ignoreElements: [
          ".Cart-Name",
          ".Cart-OrderPrice",
          ".Cart-Price",
          ".Cart-Total"
        ]
      })
    })
})

describe("Домашняя страница", async function () {
    it("десктоп 1200 - 1080", async function () {
      const browser = this.browser
      await browser.url("/hw/store/")
      await browser.setWindowSize(1200, 1080)
  
      await browser.assertView("1200xDelivery", ".Home", {
        compositeImage: true,
        allowViewportOverflow: true
      })
    })
})
  
describe("Страница доставки", async function () {
    it("десктоп 1200 - 1080", async function () {
      const browser = this.browser
      await browser.url("/hw/store/delivery")
  
      await browser.setWindowSize(1200, 1080)
  
      await browser.assertView("1200xDelivery", ".Delivery", {
        compositeImage: true,
        allowViewportOverflow: true,
        ignoreElements: [".Image"]
      })
    })
  
    it("десктоп 768 - 1080", async function () {
      const browser = this.browser
      await browser.url("/hw/store/delivery")
  
      await browser.setWindowSize(768, 1080)
  
      await browser.assertView("768xDelivery", ".Delivery", {
        compositeImage: true,
        allowViewportOverflow: true,
        ignoreElements: [".Image"]
      })
    })
  
    it("мобайл 414 - 1080", async function () {
      const browser = this.browser
      await browser.url("/hw/store/delivery")
  
      await browser.setWindowSize(414, 1080)
  
      await browser.assertView("414xDelivery", ".Delivery", {
        compositeImage: true,
        allowViewportOverflow: true,
        ignoreElements: [".Image"]
      })
    })
  
    it("мобайл 320 - 1080", async function () {
      const browser = this.browser
      await browser.url("/hw/store/delivery")
  
      await browser.setWindowSize(320, 1080)
  
      await browser.assertView("320xDelivery", ".Delivery", {
        compositeImage: true,
        allowViewportOverflow: true,
        ignoreElements: [".Image"]
      })
    })
  })
  
describe("страница Контакты", async function () {
    it("десктоп 1200 - 1080", async function () {
        const browser = this.browser
        await browser.url("/hw/store/contacts")

        await browser.setWindowSize(1200, 1080)

        await browser.assertView("1200xContacts", ".Contacts", {
        compositeImage: true,
        allowViewportOverflow: true
        })
    })

    it("мобильник 768 - 1080", async function () {
        const browser = this.browser
        await browser.url("/hw/store/contacts")

        await browser.setWindowSize(768, 1080)

        await browser.assertView("768xContacts", ".Contacts", {
        compositeImage: true,
        allowViewportOverflow: true
        })
    })

    it("мобильник 414 - 1080", async function () {
        const browser = this.browser
        await browser.url("/hw/store/contacts")

        await browser.setWindowSize(414, 1080)

        await browser.assertView("414xContacts", ".Contacts", {
        compositeImage: true,
        allowViewportOverflow: true
        })
    })

    it("мобильник 320 - 1080", async function () {
        const browser = this.browser
        await browser.url("/hw/store/contacts")

        await browser.setWindowSize(320, 1080)

        await browser.assertView("320xContacts", ".Contacts", {
        compositeImage: true,
        allowViewportOverflow: true
        })
    })

    it("бургер", async function() {
        const browser = this.browser
        await browser.url("/hw/store/contacts")

        await browser.setWindowSize(320, 1080)

        const menu = await browser.$(".navbar-toggler")
        await menu.click()
        
        await browser.assertView("320xNavbarFull", ".navbar", {
        compositeImage: true,
        allowViewportOverflow: true,
        ignoreElements: [".navbar-brand", ".nav-link"]
        })

        const currentPage = await browser.$(".active")
        await currentPage.click()

        await browser.assertView("320xNavbar", ".navbar", {
        compositeImage: true,
        allowViewportOverflow: true,
        ignoreElements: [".navbar-brand", ".nav-link"]
        })

        await browser
    })
})