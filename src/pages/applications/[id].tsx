import { useRouter, withRouter } from 'next/router';

const ApplicationDetail = () => {
  const router = useRouter();
  const Info = router?.query;
  return (
    <>
      {Object.keys(Info).map((infoKey, i) => (
        <div key={i}>
          <div>{`${infoKey}:${Info[infoKey]}`}</div>
        </div>
      ))}
    </>
  );
};

export default ApplicationDetail;
