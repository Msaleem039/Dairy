import StoreContextProvider from '../src/components/context/StoreContext';
import ClientWrapper from './ClientWrapper';
import '../src/index.css';

export const metadata = {
  title: 'Dairy Delight - Premium Shredded Cheese',
  description: 'Premium quality shredded cheese available in half kg, 1KG, and 2KG packages. Fresh delivery in Mugalpura, Lahore. Call: 0325-0080999',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <StoreContextProvider>
          <ClientWrapper>
            {children}
          </ClientWrapper>
        </StoreContextProvider>
      </body>
    </html>
  );
}
