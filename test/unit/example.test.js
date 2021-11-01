import React from "react"
import { BrowserRouter } from "react-router-dom"
import { Provider } from "react-redux"

import "@testing-library/jest-dom/extend-expect"
import { render, screen } from "@testing-library/react"
import events from "@testing-library/user-event"

import { ExampleApi } from "../../src/client/api"
import { Application } from "../../src/client/Application"
import { CartApi } from "../../src/client/api"
import { initStore } from "../../src/client/store"
import { Catalog } from "../../src/client/pages/Catalog"
import { Home } from "../../src/client/pages/Home"
import { ProductDetails } from "../../src/client/components/ProductDetails"


const mockItems = [
  {
    id: 1,
    name: "test-item-0",
    description: "Test description 0",
    price: 1337,
    color: "red",
    material: "steel"
  },
  {
    id: 2,
    name: "test-item-1",
    description: "Test description 1",
    price: 7331,
    color: "green",
    material: "plastic"
  },
  {
    id: 3,
    name: "test-item-2",
    description: "Test description 2",
    price: 3137,
    color: "blue",
    material: "texture"
  }
]
class MockApi extends ExampleApi {
  async getProducts() {
    return {
      data: mockItems
    }
  }

  async getProductById(id) {
    return {
      data: mockItems[id]
    }
  }

  async checkout(form, cart) {
    return {
      data: {
        id: 1
      }
    }
  }
}


const MockProvider = ({ children }) => {
  const cart = new CartApi()
  const store = initStore(new MockApi("/"), cart)

  return <Provider store={store}>{children}</Provider>
}

describe("Домашняя страница", () => {
  it("снэпшет", () => {
    const { asFragment } = render(<Home />)
    expect(asFragment()).toMatchSnapshot()
  })
})


describe("проверка link элементов в store", () => {
  const basename = "/hw/store"

  it("проверка итемов в каталоге при помощи моков", async () => {
    const { getAllByRole, getByText } = await render(
      <BrowserRouter basename={basename}>
        <MockProvider>
          <Catalog />
        </MockProvider>
      </BrowserRouter>
    )

    const items = getAllByRole("link", { name: /details/i })

    expect(getByText(mockItems[0].name)).toBeInTheDocument()
    expect(getByText(mockItems[1].name)).toBeInTheDocument()
    expect(getByText(mockItems[2].name)).toBeInTheDocument()

    expect(getByText(`$${mockItems[0].price}`)).toBeInTheDocument()
    expect(getByText(`$${mockItems[1].price}`)).toBeInTheDocument()
    expect(getByText(`$${mockItems[2].price}`)).toBeInTheDocument()

    expect(items.length).toBe(3)
  })

  it("есть на странице cart", () => {
    const { container } = render(
      <BrowserRouter basename={basename}>
        <MockProvider>
          <Application />
        </MockProvider>
      </BrowserRouter>
    )

    const navLinkSelector = ".nav-link"

    const navPageLinks = container.querySelectorAll(navLinkSelector)
    const navCart = container.querySelectorAll(
      `${navLinkSelector}[href="${basename}/cart"]`
    )

    expect(navPageLinks.length).toBeGreaterThan(1)
    expect(navCart.length).toBe(1)
  })

  it("атрибуты href", () => {
    const { container } = render(
      <BrowserRouter basename={basename}>
        <MockProvider>
          <Application />
        </MockProvider>
      </BrowserRouter>
    )

    const shopTitleSelector = ".navbar-brand"

    expect(
      container.querySelector(shopTitleSelector).getAttribute("href")
    ).toBe(basename + "/")
  })

  it("проверка что есть на странице", () => {
    render(
      <BrowserRouter basename={basename}>
        <MockProvider>
          <Application />
        </MockProvider>
      </BrowserRouter>
    )

    const homeLink = screen.getByRole("link", { name: /Example store/i })
    const catalogLink = screen.getByRole("link", { name: /Catalog/i })
    const deliveryLink = screen.getByRole("link", { name: /Delivery/i })
    const contactsLink = screen.getByRole("link", { name: /Contacts/i })

    expect(homeLink).toBeInTheDocument()
    expect(catalogLink).toBeInTheDocument()
    expect(deliveryLink).toBeInTheDocument()
    expect(contactsLink).toBeInTheDocument()
  })
})

describe("Правильные данные на странице details", () => {
  it("Цена продукта", () => {
    const mockProduct = mockItems[0]

    render(
      <MockProvider>
        <ProductDetails product={mockProduct} />
      </MockProvider>
    )

    expect(screen.getByText(`$${mockProduct.price}`)).toBeInTheDocument()
  })

  it("Цвет продукта", () => {
    const mockProduct = mockItems[0]

    render(
      <MockProvider>
        <ProductDetails product={mockProduct} />
      </MockProvider>
    )

    expect(screen.getByText(mockProduct.color)).toBeInTheDocument()
  })

  it("Материал продукта", () => {
    const mockProduct = mockItems[0]

    render(
      <MockProvider>
        <ProductDetails product={mockProduct} />
      </MockProvider>
    )

    expect(screen.getByText(mockProduct.material)).toBeInTheDocument()
  })

  it("Имя продукта", () => {
    const mockProduct = mockItems[0]

    render(
      <MockProvider>
        <ProductDetails product={mockProduct} />
      </MockProvider>
    )

    expect(screen.getByText(mockProduct.name)).toBeInTheDocument()
  })

  it("описание продукта", () => {
    const mockProduct = mockItems[0]

    render(
      <MockProvider>
        <ProductDetails product={mockProduct} />
      </MockProvider>
    )

    expect(screen.getByText(mockProduct.description)).toBeInTheDocument()
  })

  it("есть кнопка у продукта", () => {
    const mockProduct = mockItems[0]

    render(
      <MockProvider>
        <ProductDetails product={mockProduct} />
      </MockProvider>
    )

    expect(
      screen.getByRole("button", { name: /add to cart/i })
    ).toBeInTheDocument()
  })

  it("клик по добавить в корзину", () => {
    const id = 0
    const product = mockItems[id]
    const cart = new CartApi()

    cart.setState({ 0: { name: "qwerty", price: 1337, count: 1 } })
    render(
      <MockProvider>
        <ProductDetails product={product} />
      </MockProvider>
    )

    const cartState = cart.getState()

    expect(cartState).toHaveProperty(id.toString())
  })

  it("товар увеличился?", async () => {
    const id = 0
    const product = mockItems[id]
    const cart = new CartApi()
    cart.setState({})

    render(
      <MockProvider>
        <ProductDetails product={product} />
      </MockProvider>
    )
    const add = screen.getByRole("button", { name: /Add to Cart/i })

    await events.click(add)
    await events.click(add)

    const count = cart.getState()[id + 1].count
    expect(count).toBe(2)
  })
})