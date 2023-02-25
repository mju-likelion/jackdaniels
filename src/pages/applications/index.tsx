import ApplicationOverview from '@/components/applications/ApplicationOverview';
import ListBox from '@/components/applications/ListBox';
import { PAGE_ACTION, Parts } from '@/types/ApplicationsType';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  FirstApplicationData,
  IApplicationData,
  IData,
  SecondApplicationData,
} from '../../components/applications/applicationData';

const MENU = ['name', 'major', 'grade', 'part'];
//페이지 화면에서 먼저 볼 회원 정보

const index = () => {
  const [part, setPart] = useState<Parts>(Parts.all);
  const [applications, setApplications] = useState<IApplicationData>();
  const [page, setPage] = useState(1);

  const router = useRouter();

  useEffect(() => {
    //지원서 받아오는 요청
    console.log(`selected Part:${part} current page:${page}`);
    setApplications(FirstApplicationData);
  }, [part, page]);
  //sorting 방법, part, page가 바뀔 때마다 요청

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
    const totalPage = applications?.meta.totalPage;
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
      <ListBox part={part} setPart={setPart} />
      <div className="flex h-14 w-full items-center p-3 text-xl">
        {MENU.map((menu, i) => (
          <div key={i} className="flex-1 text-white">
            {menu}
          </div>
        ))}
      </div>
      {/* 어떤 정보를 페이지네이션 화면에서 볼 지     */}
      <div className="  mb-3 rounded-b-xl">
        {FirstApplicationData.data.map(application => (
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
          {page}/{applications?.meta.totalPage}
          <button onClick={() => handlePage(PAGE_ACTION.increment)}>
            {' >'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default index;
