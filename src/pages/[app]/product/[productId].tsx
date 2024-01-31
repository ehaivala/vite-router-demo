import useUrlParams from '@/hooks/useUrlParams.ts';

function Product() {
  const { app, productId } = useUrlParams();

  return (
    <div>
      Dynamic product page in <b>{app}</b> app with id <b>{productId}</b>
    </div>
  );
}

export default Product;
