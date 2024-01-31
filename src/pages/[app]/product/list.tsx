import useUrlParams from '@/hooks/useUrlParams.ts';

function ProductList() {
  const { app } = useUrlParams();

  return (
    <div>
      Dynamic <b>{app}</b> specific product list page
    </div>
  );
}

export default ProductList;
