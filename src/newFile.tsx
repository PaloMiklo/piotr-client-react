import { act, render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './store/store';

test('renders learn react link', async (): Promise<void> => {
    await act(async () => {
        render(
            <Provider store={store}>
                <App />
            </Provider>
        );
    });
    const linkElement = screen.getByText(/product/i);
    expect(linkElement).toBeInTheDocument();
});
