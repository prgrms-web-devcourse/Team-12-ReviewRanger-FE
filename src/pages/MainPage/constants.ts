export const INTRO = {
  invited: {
    desc1: '이 곳은 ',
    title: '리뷰를 남길 수 있는 공간',
    desc2:
      '이야. \n 새롭게 초대된 리뷰를 클릭하면 자유롭게 의견을 남길 수 있지!',
    titleColor: 'text-sub-wine dark:text-sub-pink',
  },
  created: {
    desc1: '이 곳은 ',
    title: '우리가 만든 리뷰를 관리하는 공간',
    desc2:
      '이야. \n 피어 리뷰, 프로젝트 리뷰를 생성하거나 이미 생성한 리뷰를 관리할 수 있다고!',
    titleColor: 'text-sub-blue dark:text-sub-skyblue',
  },
  received: {
    desc1: '이 곳은 ',
    title: '우리에게 온 리뷰를 확인하는 공간',
    desc2:
      '이야. \n 누군가 우리를 대상으로 한 피어 리뷰를 제출했다면 결과를 확인할 수 있지!',
    titleColor: 'text-sub-orange dark:text-sub-yellow',
  },
}

export const STATUS_COLOR = {
  진행중: 'bg-sub-green',
  마감: 'bg-sub-brown',
  종료: 'bg-gray-300',
}

export const TAB_MENU = {
  invited: {
    title: '리뷰 응답',
    position: 'after:-translate-x-[33.5%]',
  },
  created: {
    title: '리뷰 생성',
    position: 'after:translate-x-0',
  },
  received: {
    title: '리뷰 결과',
    position: 'after:translate-x-[33.5%]',
  },
}
