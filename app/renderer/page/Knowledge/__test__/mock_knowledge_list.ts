export const mockKnowledgeList = [
  {
    title: 'ReactHooks在平时开发中需要注意的问题和原因',
    content:
      '1. 不能在循环、条件或嵌套函数中条用Hook, 必须始终在React函数的顶层中使用。\n   这是因为React需要利用调用顺序来正确的更新相应的状态以及调用相应的钩子函数。一旦在循环或条件分子语句中调用Hook, 就会导致调用顺序的不一致, 从而产生错误。\n2. 使用useState是的时候使用push、pop等直接更改数组对象的问题\n  使用push直接更改数组无法获得新值, 应该采用析构方式(但是在class中不会有这个问题)\n3. useState设置状态时, 只有第一次生效, 后期需要更新状态, 必须通过useEffect (封装markDown组件和echarts组件遇到的问题-- 后续值的变化不会更新数据)\n\n实例代码: \n```typescript\nconst TableDeail = ({\n    columns,\n}:TableData) => {\n    const [tabColumn, setTabColumn] = useState(columns) \n}\n\n// 正确的做法是通过useEffect改变这个值\nconst TableDeail = ({\n    columns,\n}:TableData) => {\n    const [tabColumn, setTabColumn] = useState(columns) \n    useEffect(() =>{setTabColumn(columns)},[columns])\n}\n```\n4. 善用useCallback\n父组件传递给子组件事件句柄时, 如果我们没有参数变动可能会选中useMemo. 但是每一次父组件渲染子组件及时没变化也会跟着渲染一次\n5. 不要滥用useContext\n context下一个值的变化, 及时其中的组件没有使用该值, 也会重新渲染一次。\n 可以基于useContext封装的状态管理工具',
    key: '1234567123456789a12345678123456789123456789abc123456789a123456789a0-0123412345678-412345678123456123',
    create_time: '2021-09-14',
  },
];
