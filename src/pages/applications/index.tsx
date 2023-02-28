import ApplicationOverview from '@/components/applications/ApplicationOverview';
import ListBox from '@/components/applications/ListBox';
import { PAGE_ACTION, Parts, SortOrders } from '@/types/ApplicationsType';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IData } from '@/components/applications/ApplicationData';
import useSWR from 'swr';
import qs from 'qs';
import ApplicationMenu from '@/components/applications/ApplicationMenu';
import Pagination from '@/components/applications/Pagination';

//페이지 화면에서 먼저 볼 회원 정보
const PARTS: Parts[] = [Parts.all, Parts.web, Parts.server, Parts.design];
const SORTOPTIONS: SortOrders[] = [
  SortOrders.createdDate_asc,
  SortOrders.createdDate_desc,
  SortOrders.name_asc,
  SortOrders.name_desc,
];

const index = () => {
  const [part, setPart] = useState<Parts>(Parts.all);
  const [sortOptions, setSortOptions] = useState<SortOrders>(
    SortOrders.createdDate_asc,
  );
  const [page, setPage] = useState(1);

  const router = useRouter();

  const enumValueToKey = (
    value: string,
    targetEnum: Record<string, number | string>,
  ) => {
    const keys = Object.keys(targetEnum);
    const result = keys.filter(key => targetEnum[key] === value)[0];
    return result;
  };

  const query = qs.stringify({
    page,
    sort: enumValueToKey(sortOptions, SortOrders),
    ...(enumValueToKey(part, Parts) !== 'all' && {
      part: enumValueToKey(part, Parts),
    }),
  });

  const { data, isLoading } = useSWR(`/api/applications?${query}`);

  const showDetail = (application: IData) => {
    router.push(
      {
        pathname: `/applications/${application.id}`,
        query: application,
      },
      `/applications/${application.id}`,
    );
    //state 같은 방법이 있는지..?
  };

  const handlePageChange = (pageAction: PAGE_ACTION) => {
    const totalPage = data?.meta.totalPage;
    if (!totalPage) return;

    switch (pageAction) {
      case PAGE_ACTION.increment:
        setPage(page + 1);
        break;
      case PAGE_ACTION.decrement:
        setPage(page - 1);
        break;
      default:
        return;
    }
  };
  //useReducer 사용해야 할지..?

  return (
    <div className="m-auto h-screen w-full p-4">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="flex">
            <div>
              <ListBox
                label="part"
                stateData={PARTS}
                state={part}
                setState={setPart}
              />
            </div>
            <div>
              <ListBox
                label="sort"
                stateData={SORTOPTIONS}
                state={sortOptions}
                setState={setSortOptions}
              />
            </div>
          </div>
          <ApplicationMenu />

          {/* 어떤 정보를 페이지네이션 화면에서 볼 지     */}
          {data.data.map((application: IData) => (
            <ApplicationOverview
              key={application.id}
              info={application}
              onClick={() => showDetail(application)}
            />
          ))}
          <Pagination
            page={page}
            handlePageChange={handlePageChange}
            totalPage={data.meta.totalPage}
          />
        </>
      )}
    </div>
  );
};

export default index;
