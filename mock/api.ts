import Mock from 'mockjs';
import { randomNum } from '../src/utils';

const fakeTypes: any = Mock.mock({
  'types|10': [{ title: '@ctitle(4)', key: '@id()' }],
});

const fakeItems: any = Mock.mock({
  'items|100': [
    {
      key: '@id()',
      name: '@ctitle(4)',
      unit: '斤',
      'isValid|1': true,
      'sort|1-5': 1,
      volume: '15',
      'model|1-5': 1,
      type2: 'xx',
      weight: '10kg',
      usage: 'adwecswewe',
      createdTime: '@now()',
    },
  ],
});

fakeItems.items.forEach((item: any) => {
  const i = randomNum(9);
  const type = fakeTypes.types[i];
  item.type = type;
});

export default {
  '/api/items': fakeItems,
  '/api/types': fakeTypes,
  'POST /api/items/add': (req: any, res: any) => {
    const { data } = req.body;
    data.type = fakeTypes.types.find((item: any) => item.key === data.type);
    data.key = Mock.Random.id();
    fakeItems.items.push(data);
    res.end('ok');
  },
  'POST /api/items/remove': (req: any, res: any) => {
    const { data } = req.body;
    data.forEach((id: string) => {
      fakeItems.items = fakeItems.items.filter((item: any) => item.key !== id);
    });
    res.end('ok');
  },
  'POST /api/items/getByType': (req: any, res: any) => {
    const { key } = req.body;
    const items = fakeItems.items.filter(
      (item: any) => item.type && item.type.key === key,
    );
    res.json({ items });
  },
  'POST /api/items/edit': (req: any, res: any) => {
    const { body } = req;
    const i = fakeItems.items.findIndex((item: any) => item.key === body.key);
    const item = fakeItems.items[i];
    for (const key in body) {
      const v = body[key];
      item[key] = v;
    }
    res.end('ok');
  },
  'POST /api/types/add': (req: any, res: any) => {
    const { title } = req.body;
    fakeTypes.types.push({
      title,
      key: Mock.Random.id(),
    });
    res.end('ok');
  },
  'POST /api/items/getByConditions': (req: any, res: any) => {
    let { model, isValid, typeKey } = req.body;
    let result;
    const model2 = model; // 0 1 2 3
    const isValid2 = Boolean(parseInt(isValid)); // true false

    if ((model === undefined || model === '') && isValid === undefined) {
      result = fakeItems.items;
    } else if ((model === undefined || model === '') && isValid !== undefined) {
      result = fakeItems.items.filter((item: any) => {
        return item.isValid === isValid2;
      });
    } else if ((model !== undefined || model !== '') && isValid === undefined) {
      result = fakeItems.items.filter((item: any) => {
        return item.model == model2;
      });
    } else if ((model !== undefined || model !== '') && isValid !== undefined) {
      result = fakeItems.items.filter((item: any) => {
        return item.model == model2 && item.isValid === isValid2;
      });
    }

    if (typeKey !== '0') {
      result = result.filter((element: any) => {
        return element.type.key === typeKey;
      });
    }

    res.send(result);
  },
};
