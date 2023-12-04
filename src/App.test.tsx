import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';

test('renders navbar links', async (): Promise<void> => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

  await waitFor(() => {
    const productsLink = screen.getByTestId('products');
    const aboutLink = screen.getByTestId('about');
    const contactLink = screen.getByTestId('contact');
    const cartLink = screen.getByTestId('cart');

    expect(productsLink).toBeInTheDocument();
    expect(aboutLink).toBeInTheDocument();
    expect(contactLink).toBeInTheDocument();
    expect(cartLink).toBeInTheDocument();
  })
});
