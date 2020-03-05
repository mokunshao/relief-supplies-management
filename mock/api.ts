import Mock from 'mockjs';

// const treeData: any[] = [
//   {
//     title: '',
//     key: '0-0',
//     children: [
//       {
//         title: '救灾物资',
//         key: '0-0-0',
//         children: [
//           { title: '居住类', key: '0-0-0-0' },
//           { title: '床上用品类', key: '0-0-0-1' },
//           { title: '衣着类', key: '0-0-0-2' },
//           { title: '救灾设备类', key: '0-0-0-3' },
//           { title: '基本生活类', key: '0-0-0-4' },
//           { title: '其他', key: '0-0-0-5' },
//         ],
//       },
//       {
//         title: '森林防火设备',
//         key: '0-0-1',
//         children: [{ title: '不知道', key: '0-0-1-0' }],
//       },
//     ],
//   },
// ];

const fakeItems: Array<any> = [];

for (let i = 0; i < 20; i++) {
  fakeItems.push({
    key: i,
    index: i + 1,
    name: `救援物资 ${i + 1}`,
    model: 32,
    type: '不知道',
    isValid: true,
    sort: 10,
  });
}

const fakeTypes: any[] = Mock.mock({
  'types|10': [{ title: '@ctitle(4)', key: '@id()' }],
});

export default {
  // '/api/tree': { treeData },
  // 'POST /api/tree': (req: any, res: any) => {
  //   treeData.push('test');
  //   res.end('ok');
  // },

  '/api/items': fakeItems,
  '/api/types': fakeTypes,
};
