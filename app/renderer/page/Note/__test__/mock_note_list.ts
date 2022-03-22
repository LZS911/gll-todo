import { IAddNote } from './../../../api/note/index.d';
const mockNoteList: IAddNote[] = [
  {
    title: 'DMP-8886开发过程问题记录',
    content:
      '1. 第一次使用的 `instanceData` 为当前表格数据, 并不是选中行实例所属组的所有实例。开发中其实发现这个问题了, 但是却被我忽视了???\n\n2. 第二次对`instanceData`进行`filter`找出选中行的所有实例, 但是表格有进行分页, `instanceData`并不包含所有数据, 可能同组实例并不存在同一页中。 还是不够仔细, 忘记了表格分页了。\n\n3. 第三次使用选中行中的`mysql_group_instances_list`字段, 该字段即为当前实例说属组下的所有实例。 最开始产品的建议就是使用该数据, 为什么我自己一开始没注意了???',
    key: '11234123456789abc123456789abcd112345678123456789ab123456789abcd-123456789a123456789abcd123456789abcd',
    create_time: '2021/9/9',
  },
];
export default mockNoteList;
