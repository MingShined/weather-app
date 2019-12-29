import { MenuType, MenuBean } from 'src/common/menu/type';

const menuList: MenuBean[] = [
  {
    title: '基础',
    path: '/',
    type: MenuType.Item,
    icon: 'home'
  },
  {
    title: '历史',
    path: '/index/history',
    type: MenuType.Item,
    icon: 'home'
  },
  {
    title: '星图',
    path: '/starMap',
    type: MenuType.Item,
    icon: 'home'
  }
];

export default menuList;
