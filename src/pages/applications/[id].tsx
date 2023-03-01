import { useRouter } from 'next/router';
import { Tab } from '@headlessui/react';
import { IObj } from '@/components/applications/ApplicationData';
import Link from 'next/link';

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const ApplicationDetail = () => {
  const MENU = ['info', 'answer'];
  const router = useRouter();
  const Info = router?.query;
  const ApplyInfo: IObj = {
    part: Info?.part,
    phone: Info?.phone,
    email: Info?.email,
    sid: Info?.sid,
    enrollmentStatus: Info?.enrollmentStatus,
  };

  const ApplyAnswer: IObj = {
    firstAnswer: Info?.firstAnswer,
    secondAnswer: Info?.secondAnswer,
    thirdAnswer: Info?.thirdAnswer,
    fourthAnswer: Info?.fourthAnswer,
  };

  return (
    <>
      <div className="mx-auto my-3 mt-10 w-4/5 text-5xl">{Info.name}</div>
      <div className="mx-auto mb-4 w-4/5 p-2 text-2xl text-gray3">
        {Info.major}
      </div>
      <div className="mx-auto w-4/5">
        <Tab.Group>
          <Tab.List className="flex space-x-1 rounded-xl bg-gray1 p-1">
            {MENU.map(menu => (
              <Tab
                key={menu}
                className={({ selected }) =>
                  classNames(
                    'w-full rounded-lg py-2.5 text-xl font-medium leading-5 text-white',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-black-200 focus:outline-none focus:ring-2',
                    selected
                      ? 'text-black bg-white/[0.85] shadow '
                      : 'text-blue hover:bg-white/[0.12] hover:text-white',
                  )
                }
              >
                {menu}
              </Tab>
            ))}
          </Tab.List>
          <Tab.Panel key={'info'} className="rounded-xl bg-white/[0.85] p-3">
            <ul>
              {Object.keys(ApplyInfo).map(info => (
                <li key={info} className="h-11 text-lg text-black">
                  <span className="text-blue1/[0.85]">{info}</span> :{' '}
                  {ApplyInfo[info]}
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white/[0.85] p-3">
            <ul>
              {Info?.cvUrl && (
                <li key={'file'} className="mb-8 text-white/[0.9]">
                  <div className="my-2 ml-3 text-xl text-blue1/[0.85]">
                    File
                  </div>
                  <Link
                    href={typeof Info?.cvUrl === 'string' ? Info.cvUrl : 'as'}
                  >
                    <div className="flex h-10 w-40 items-center justify-center rounded-xl bg-gray2	">
                      다운로드
                    </div>
                  </Link>
                </li>
              )}
              {Object.keys(ApplyAnswer).map((answer, i) => (
                <li key={i}>
                  <div className="my-2 ml-3 text-xl text-blue1/[0.85]">
                    Answer {i + 1}
                  </div>
                  <div className="h-80 rounded-lg bg-gray2 p-3 text-black">
                    {ApplyAnswer[answer]}
                  </div>
                </li>
              ))}
              {Info?.fifthAnswer && (
                <li key={'fifthAnswer'}>
                  <div className="my-2 ml-3 text-xl text-blue1/[0.85]">
                    Answer 5
                  </div>
                  <div className="h-80 rounded-lg bg-gray2 p-3 text-black">
                    {Info.fifthAnswer}
                  </div>
                </li>
              )}
            </ul>
          </Tab.Panel>
        </Tab.Group>
      </div>
    </>
  );
};

export default ApplicationDetail;