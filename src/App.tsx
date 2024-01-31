import { Link, Outlet } from 'react-router-dom';

type Page = {
  title: string;
  path: string;
  children?: Page[];
};

const pageStructure: Page[] = [
  {
    title: 'Business',
    path: '/business',
    children: [
      {
        title: 'Business products',
        path: '/business/product/list',
        children: [
          {
            title: 'Business product 1',
            path: '/business/product/1',
          },
          {
            title: 'Business product 2',
            path: '/business/product/2',
            children: [
              {
                title: 'Unhandled product child route',
                path: '/business/product/2/something',
              },
            ],
          },
        ],
      },
      {
        title: 'Unhandled business route',
        path: '/business/something',
      },
    ],
  },
  {
    title: 'Consumer',
    path: '/consumer',
    children: [
      {
        title: 'Consumer products',
        path: '/consumer/product/list',
        children: [
          {
            title: 'Consumer product 4',
            path: '/consumer/product/4',
          },
          {
            title: 'Consumer product 5',
            path: '/consumer/product/5',
          },
        ],
      },
    ],
  },
  {
    title: 'Admin',
    path: '/admin',
    children: [
      {
        title: 'Admin product list...?',
        path: '/admin/product/list',
      },
      {
        title: 'Admin product page...?',
        path: '/admin/product/6',
      },
      {
        title: 'Unhandled admin route',
        path: '/admin/unhandled',
      },
    ],
  },
  {
    title: 'Something that should be catched by dynamic route but ends up with 404',
    path: '/whatever',
  },
];

function App() {
  const renderNavNode = (node: Page[]) => (
    <>
      {node.map(({ title, path, children }) => (
        <li key={path}>
          <Link to={`${import.meta.env.VITE_ROOT_PATH}${path}`}>{title}</Link>
          {children && <ul>{renderNavNode(children)}</ul>}
        </li>
      ))}
    </>
  );

  return (
    <div className="App">
      <header>
        <h1>Header</h1>
        <nav>
          <ul>{renderNavNode(pageStructure)}</ul>
        </nav>
      </header>
      <hr />
      <main>
        <Outlet />
      </main>
      <hr />
      <footer>
        <h2>Footer</h2>
        <a href="https://github.com/ehaivala/vite-router-demo/" target="_blank" rel="noreferrer">
          Source code
        </a>
      </footer>
    </div>
  );
}

export default App;
