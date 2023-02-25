export enum Parts {
  all = 'ALL',
  web = 'WEB',
  server = 'SERVER',
  design = 'DESIGN',
}

export interface Application {
  name: string;
  phone: string;
  email: string;
  major: string;
  sid: string;
  grade: '1' | '2' | '3' | '4';
  enrollmentStatus: '재학' | '휴학' | '졸업유예';
  part: 'web' | 'server' | 'design';
  cvUrl: string;
  firstAnswer: string;
  secondAnswer: string;
  thirdAnswer: string;
  fourthAnswer: string;
  fifthAnswer: string;
}

export enum PAGE_ACTION {
  increment = 'INCREMENT',
  decrement = 'DECREMENT',
}
