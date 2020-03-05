import Mock from 'mockjs';
import { randomNum } from '../src/utils';

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

const fakeTypes: any = Mock.mock({
  'types|10': [{ title: '@ctitle(4)', key: '@id()' }],
});

const fakeItems: any = Mock.mock({
  'items|30': [
    {
      key: '@id()',
      name: '@ctitle(4)',
      unit: '斤',
      'isValid|1': true,
      'sort|1-5': 1,
      volumn: '15',
      'model|1-5': 1,
      type2: 'xx',
      weight: '10kg',
      usage: 'adwecswewe',
      createdTime: '@now()',
    },
  ],
});

fakeItems.items.forEach((item: any) => {
  const i = randomNum(5);
  const type = fakeTypes.types[i];
  item.type = type;
});

export default {
  '/api/items': fakeItems,
  '/api/types': fakeTypes,
  'POST /api/items/add': (req: any, res: any) => {
    console.log(req.body);
    res.end('ok');
  },
  'POST /api/items/remove': (req: any, res: any) => {
    console.log(req.body);
    res.end('ok');
  },
  'POST /api/items/edit': (req: any, res: any) => {
    console.log(req.body);
    res.end('ok');
  },
};
