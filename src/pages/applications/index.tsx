import ApplicationOverview from '@/components/applications/ApplicationOverview';
import ListBox from '@/components/applications/ListBox';
import { PAGE_ACTION, Parts, SortOrders } from '@/types/ApplicationsType';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { IData } from '../../components/applications/applicationData';
import useSWR from 'swr';
import qs from 'qs';

const MENU = ['name', 'major', 'grade', 'part', 'createdDate'];
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

  const handlePage = (page_Action: PAGE_ACTION) => {
    const totalPage = data?.meta.totalPage;
    if (!totalPage) return;

    switch (page_Action) {
      case PAGE_ACTION.increment:
        if (page >= totalPage) return;
        else {
          setPage(page + 1);
          break;
        }
      case PAGE_ACTION.decrement:
        if (page === 1) return;
        else {
          setPage(page - 1);
          break;
        }
      default:
        return;
    }
  };
  //useReducer 사용해야 할지..?

  return (
    <div className="m-auto h-screen w-2/3 p-4">
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
          <div className="flex h-14 w-full items-center p-3 text-xl">
            {MENU.map((menu, i) => (
              <div key={i} className="flex-1 text-white">
                {menu}
              </div>
            ))}
          </div>
          {/* 어떤 정보를 페이지네이션 화면에서 볼 지     */}
          <div className="  mb-3 rounded-b-xl">
            {data.data.map((application: IData) => (
              <ApplicationOverview
                key={application.id}
                info={application}
                menu={MENU}
                onClick={() => showDetail(application)}
              />
            ))}
            <div className="my-1 text-center">
              {/* 먼저 볼 회원 정보 렌더링 */}
              <button onClick={() => handlePage(PAGE_ACTION.decrement)}>
                {'< '}
              </button>
              {page}/{data?.meta.totalPage}
              <button onClick={() => handlePage(PAGE_ACTION.increment)}>
                {' >'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default index;
