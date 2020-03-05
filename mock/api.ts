import Mock from 'mockjs';

const treeData: any[] = [
  {
    title: '',
    key: '0-0',
    children: [
      {
        title: '救灾物资',
        key: '0-0-0',
        children: [
          { title: '居住类', key: '0-0-0-0' },
          { title: '床上用品类', key: '0-0-0-1' },
          { title: '衣着类', key: '0-0-0-2' },
          { title: '救灾设备类', key: '0-0-0-3' },
          { title: '基本生活类', key: '0-0-0-4' },
          { title: '其他', key: '0-0-0-5' },
        ],
      },
      {
        title: '森林防火设备',
        key: '0-0-1',
        children: [{ title: '不知道', key: '0-0-1-0' }],
      },
    ],
  },
];

const data: Array<any> = [];

for (let i = 0; i < 20; i++) {
  data.push({
    key: i,
    index: i + 1,
    name: `救援物资 ${i + 1}`,
    model: 32,
    type: '不知道',
    isValid: '是',
    sort: 10,
    // operation: <Button type="primary">编辑</Button>,
  });
}

const fakeItems = data;

export default {
  // 支持值为 Object 和 Array
  'GET /api/users': { users: [1, 2] },
  'GET /api/test': { hello: 123 },

  // GET 可忽略
  '/api/users/1': { id: 1 },
  '/api/tree': { treeData },
  'POST /api/tree': (req: any, res: any) => {
    treeData.push('test');
    res.end('ok');
  },

  // 支持自定义函数，API 参考 express@4
  'POST /api/users/create': (req: any, res: any) => {
    // 添加跨域请求头
    res.setHeader('Access-Control-Allow-Origin', '*');
    console.log(req, res);
    res.end('ok');
  },

  '/api/items': fakeItems,
};
