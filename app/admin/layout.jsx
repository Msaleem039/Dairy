import '../admin/admin.css';

export const metadata = {
  title: 'Dairy Delight Admin',
  description: ' for Dairy Delight',
};

export default function AdminLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}



