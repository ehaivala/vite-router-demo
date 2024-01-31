import useUrlParams from '@/hooks/useUrlParams.ts';

function AppPage() {
  const { app } = useUrlParams();

  return (
    <div>
      Dynamic <b>{app}</b> app specific page
    </div>
  );
}

export default AppPage;
