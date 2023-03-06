import { PAGE_ACTION, Parts, SortOrders } from '@/types/ApplicationsType';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IData } from '@/types/ApplicationsType';
import useSWR from 'swr';
import qs from 'qs';
import {
  Pagination,
  ApplicationMenu,
  ListBox,
  ApplicationOverview,
} from '@/components/applications';

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

  const { data, isLoading, error } = useSWR(`/api/applications?${query}`);

  const showDetail = (application: IData) => {
    router.push(
      {
        pathname: `/applications/${application.id}`,
        query: application,
      },
      `/applications/${application.id}`,
    );
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
    <div className='m-auto h-screen w-full p-4'>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className='flex justify-end'>
            <div className='mr-3'>
              <ListBox
                label='part'
                stateData={PARTS}
                state={part}
                setState={setPart}
              />
            </div>
            <div>
              <ListBox
                label='sort'
                stateData={SORTOPTIONS}
                state={sortOptions}
                setState={setSortOptions}
              />
            </div>
          </div>
          <ApplicationMenu />
          {error ? (
            <div>잠시후 다시 시도해 주세요</div>
          ) : (
            <>
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
        </>
      )}
    </div>
  );
};

export default index;
