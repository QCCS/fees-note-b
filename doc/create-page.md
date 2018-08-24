#开始创建页面

1.配置一个路由

注意是否有重复
```
 {
    name: '控制面板',
    icon: 'dashboard',
    path: 'dashboard',
    children: [
      {
        name: '停机公告',
        path: 'stop-announcements',
      },
      {
        name: '版本更新',
        path: 'version-update',
      },
    ],
  },
```
动态加载配置
```
  '/dashboard/stop-announcements': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/StopAnnouncements')),
    },
    '/dashboard/version-update': {
      component: dynamicWrapper(app, ['monitor'], () => import('../routes/Dashboard/VersionUpdate')),
    },
```

2.设计一个组件的model
组件的数据同步还是异步
设计action

3.写一个组件

引入组件的样式

引入组件的依赖

链接组件需要的model

渲染组件
```
//组件不复杂，在dva架构里面，就是直接触发动作，显示数据

//比如触发一个动作，导致redux里面的数据更新
  componentDidMount() {
    this.props.dispatch({
      type: 'monitor/fetchTags',
    });
  }
  //在render函数里面直接使用redux里面的数据进行渲染
  const { monitor, loading } = this.props;
  return (
    //渲染
    <div>{monitor.........}</div>
  ）
  
```

4.对应的service文件

这个数据主要是直接对接model里面的action
