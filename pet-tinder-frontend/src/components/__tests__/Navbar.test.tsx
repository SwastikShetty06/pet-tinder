import { render, screen } from '@testing-library/react';
import Navbar from '../Navbar';
import '@testing-library/jest-dom';

const mockUseRouter = jest.fn();
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockUseRouter,
  }),
  usePathname: () => '/',
}));

const mockRefreshUser = jest.fn();
const mockUseAuth = jest.fn();
jest.mock('@/hooks/useSafeState', () => ({
  useAuth: () => mockUseAuth(),
}));

describe('Navbar', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('when user is not authenticated', () => {
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user: null,
        isLoading: false,
        refreshUser: mockRefreshUser,
      });
    });

    it('renders the PawMatch logo', () => {
      render(<Navbar />);
      expect(screen.getByText('PawMatch')).toBeInTheDocument();
    });

    it('renders Sign in and Get started links', () => {
      render(<Navbar />);
      expect(screen.getByText('Sign in')).toBeInTheDocument();
      expect(screen.getByText('Get started')).toBeInTheDocument();
    });
  });

  describe('when user is authenticated', () => {
    const user = { name: 'Jules' };
    beforeEach(() => {
      mockUseAuth.mockReturnValue({
        user,
        isLoading: false,
        refreshUser: mockRefreshUser,
      });
    });

    it('renders the PawMatch logo', () => {
      render(<Navbar />);
      expect(screen.getByText('PawMatch')).toBeInTheDocument();
    });

    it('renders user greeting and Sign out button', () => {
      render(<Navbar />);
      expect(screen.getByText(`Hi, ${user.name}!`)).toBeInTheDocument();
      expect(screen.getByText('Sign out')).toBeInTheDocument();
    });
  });
});
