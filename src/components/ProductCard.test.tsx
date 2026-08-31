import { render, screen } from '@testing-library/react'
import { MemoryRouter } from "react-router-dom"
import ProductCard from './ProductCard'

import { useCart } from "../context/CartContext"
import { useDeleteProduct, useProduct } from '../hooks/useProducts'
import { TextEncoder, TextDecoder } from 'util';
import userEvent from '@testing-library/user-event'

Object.assign(globalThis, {
    TextEncoder,
    TextDecoder,
})

jest.mock('../context/CartContext.tsx', () => ({
    useCart: jest.fn(),
}));

jest.mock('../hooks/useProducts.ts', () => ({
    useDeleteProduct: jest.fn(),
}));

test("renders the product information", () => {
    const mockAddtoCart = jest.fn();
    const mockDelete = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
        addToCart: mockAddtoCart,
    });

    (useDeleteProduct as jest.Mock).mockReturnValue({
        mutate: mockDelete,
    });

    const fakeProduct = {
        id: "1",
        title: "Nike Shoes",
        price: 99.99,
        category: "Shoes",
        image: "nike.jpg"
    };

    render(
        <MemoryRouter>
            <ProductCard product={fakeProduct} />
        </MemoryRouter>
    );

    expect(
        screen.getByText("Nike Shoes")
    ).toBeInTheDocument();

    expect(
        screen.getByText("$99.99")
    ).toBeInTheDocument();

    expect(
        screen.getByText("Shoes")
    ).toBeInTheDocument();
})

test("calls addtoCart when Add to Cart is clicked", async () => {
    const user = userEvent.setup();

    const mockAddToCart = jest.fn();
    const mockDelete = jest.fn();

    (useCart as jest.Mock).mockReturnValue({
        addToCart: mockAddToCart,
    });

    (useDeleteProduct as jest.Mock).mockReturnValue({
        mutate: mockDelete,
    })

    const fakeProduct = {
        id: "1",
        title: "Nike Shoes",
        price: 99.99,
        category: "Shoes",
        image: "nike.jpg",
    };

    render(
        <MemoryRouter>
            <ProductCard product={fakeProduct} />
        </MemoryRouter>
    );

    await user.click(
        screen.getByRole("button",
            {
                name: /add to cart/i
            }
        )
    );

    expect(mockAddToCart).toHaveBeenCalled();

});