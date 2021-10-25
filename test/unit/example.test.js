import React from "react"
import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"

import "@testing-library/jest-dom/extend-expect"
import { render } from "@testing-library/react"

import { Catalog } from "../../src/client/pages/Catalog"
import { CartApi, ExampleApi } from "../../src/client/api"
import { initStore } from "../../src/client/store"

const extraUrl = "/hw/store";
const API_URL = new ExampleApi(extraUrl);
const CART_API = new CartApi();
const currentStore = initStore(API_URL, CART_API);

describe("Каталог здесь? Спартак здесь?", () => {
  it("Каталооооооооооооооог", async () => {
    const { getByText } = await render(
      <BrowserRouter basename={extraUrl}>
        <Provider store={currentStore}>
          <Catalog />
        </Provider>
    </BrowserRouter>
    )

    const textFirst = getByText('Catalog');

    expect(textFirst).toBeInTheDocument()
  })
})