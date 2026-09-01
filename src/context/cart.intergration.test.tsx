import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';

import ProductCard from '../components/ProductCard';
import Navbar from '../components/Navbar';
import { CartProvider } from '../context/CartContext';

import { useAuth } from "../context/AuthContext"
import { useDeleteProduct } from '../hooks/useProducts';

jest.mock("../context/AuthContext", () => ({
    useAuth: jest.fn(),
}));

jest.mock("../hooks/useProducts", () => ({
    useDeleteProduct: jest.fn(),
}));

jest.mock("../services/authService", () => ({
    useAuth: jest.fn(),
}));

test("updates the cart when a product is added", async () => {
    const user = userEvent.setup();

    (useAuth as jest.Mock).mockReturnValue({
        user:null,
    });

    (useDeleteProduct as jest.Mock).mockReturnValue({
        mutate: jest.fn(),
    });

    const fakeProduct = {
        id: "1",
        title: 'Nike Shoes',
        price: 99.99,
        category: 'Shoes',
        image: 'nike.jpg',
        description: "Comfortable running shoes",
    };

    render(
        <MemoryRouter>
            <CartProvider>
                <Navbar />
                <ProductCard product={fakeProduct} />
            </CartProvider>
        </MemoryRouter>
    )

    expect(
        screen.getByText(/cart \(0\)/i)
    ).toBeInTheDocument();

    await user.click(
        screen.getByRole("button", {
            name: /add to cart/i,
        })
    );

    expect(
        screen.getByText(/cart \(1\)/i)
    ).toBeInTheDocument();
});