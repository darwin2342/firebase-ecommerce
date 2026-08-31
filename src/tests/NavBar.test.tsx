import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'

import Navbar from '../components/Navbar'
import { useAuth } from '../context/AuthContext'
import { useCart } from '../context/CartContext'



jest.mock('../context/AuthContext', () => ({
    useAuth: jest.fn(),
}));

jest.mock("../services/authService", () => ({
    logoutUser: jest.fn(),
}));

jest.mock('../context/CartContext', () => ({
    useCart: jest.fn(),
}));

test('shows login and register when user is logged out', () => {
    (useAuth as jest.Mock).mockReturnValue({
        user: null,
    });
    
    (useCart as jest.Mock).mockReturnValue({
        cart: [{ 'id': '1'},{'id':'2'}]
    });

    render(
        <MemoryRouter>
            <Navbar />
        </MemoryRouter>
    );

    expect(
        screen.getByRole('link', {name: /login/i})
    ).toBeInTheDocument();

    expect(
        screen.getByRole('link', {name: /register/i})
    ).toBeInTheDocument();

    expect(
        screen.getByText(/cart \(2\)/i)
    ).toBeInTheDocument();

    expect(
        screen.queryByRole("button", { name: /logout/i })
    ).not.toBeInTheDocument();
});