import React from "react"
import { render, screen } from "@testing-library/react"

import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import { Application } from "../../src/client/Application"
import { ExampleApi, CartApi } from "../../src/client/api"
import { initStore } from "../../src/client/store"

const extraUrl = "/hw/store";
const API_URL = new ExampleApi(extraUrl);
const CART_API = new CartApi();
const currentStore = initStore(API_URL, CART_API);

describe("Check for page-links and cart to be in navbar", () => {
  it("Should find cart and at least one page link", () => {
    const { container } = render(
      <BrowserRouter basename={extraUrl}>
        <Provider store={currentStore}>
          <Application />
        </Provider>
      </BrowserRouter>
    )

    const navLinkSelector = ".nav-link"

    const navPageLinks = container.querySelectorAll(navLinkSelector)
    const navCart = container.querySelectorAll(
      `${navLinkSelector}[href="${extraUrl}/cart"]`
    )

    expect(navPageLinks.length).toBeGreaterThan(1)
    expect(navCart.length).toBe(1)
  })

  it("проверка ссылки у navbar-brand", () => {
    const { container } = render(
      <BrowserRouter basename={extraUrl}>
        <Provider store={currentStore}>
          <Application />
        </Provider>
      </BrowserRouter>
    )

    const shopTitleSelector = ".navbar-brand"

    expect(
      container.querySelector(shopTitleSelector).getAttribute("href")
    ).toBe(extraUrl + "/")
  })

  it("Проверка ссылок в Application", () => {
    render(
      <BrowserRouter basename={extraUrl}>
        <Provider store={currentStore}>
          <Application />
        </Provider>
      </BrowserRouter>
    )

    const homeLink = screen.queryByText("Example store")
    const catalogLink = screen.queryByText("Catalog")
    const deliveryLink = screen.queryByText("Delivery")
    const contactsLink = screen.queryByText("Contacts")

    expect(homeLink).toBeInTheDocument()
    expect(catalogLink).toBeInTheDocument()
    expect(deliveryLink).toBeInTheDocument()
    expect(contactsLink).toBeInTheDocument()
  })
})