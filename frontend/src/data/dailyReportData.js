// DB 연결 전 화면 확인용 데이터입니다. API 응답도 이 형태로 맞추면 화면을 그대로 재사용할 수 있습니다.
export const dailyReportMock = {
  date: '2026년 9월 17일',
  summary:
    '오늘은 평소와 비슷한 시간에 하루를 시작하고 식사 활동은 늦은 걸로 확인됐어요. 물 섭취량은 평소보다 조금 적었으며, TV 시청시간은 평소보다 길었어요.',
  changes: [
    {
      id: 'breakfast-time',
      title: '아침 식사 시간이 평소보다 1시간 늦어요.',
      description: '오늘 식사 시각: 9시 10분  |  평균 식사 시각: 8시 10분',
    },
    {
      id: 'tv-time',
      title: 'TV를 평소보다 1시간 40분 많이 봤어요.',
      description: '오늘 시청 시간: 4시간 20분  |  평균 시청 시간: 6시간',
    },
    {
      id: 'refrigerator-pause',
      title: '냉장고를 연 뒤 다음 행동이 감지되지 않았어요.',
      description: '오늘 냉장고 앞에서 5분간 아무 행동 없이 서 있었어요.',
    },
  ],
  activities: [
    { id: 'first-motion', label: '첫 움직임', value: '7시 18분', comparison: '평소와 비슷해요.', tone: 'normal' },
    { id: 'breakfast', label: '아침 식사', value: '9시 10분', comparison: '평소보다 1시간 늦어요.', tone: 'warning' },
    { id: 'refrigerator', label: '냉장고 사용', value: '21회', comparison: '평소보다 3회 많아요.', tone: 'normal' },
    { id: 'water', label: '수분 섭취', value: '1.2L', comparison: '평소보다 0.3L 적어요.', tone: 'normal' },
    { id: 'tv', label: 'TV 시청', value: '6시간', comparison: '평소보다 1시간 40분 길어요.', tone: 'warning' },
  ],
};
