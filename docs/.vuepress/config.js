module.exports = {
  head: [
    [
        'link',
        { rel: 'icon', href: 'logo.png' }
    ]
  ],
  themeConfig: {
    displayAllHeaders: true,
    sidebar: [
      "/",
      ["/guides/life-cycle", "生命周期事件"],
      ["/guides/api", "核心 API"],
      ["/guides/component", "组件与状态"],
      ["/guides/other", "其他"]
    ]
  },
  title: "Pvue",
  description: "专门为在现有的由服务器框架呈现的 HTML 页面上进行少量的交互准备的轻量级 JS 库。"
};
