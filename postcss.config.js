module.exports = {
  "plugins": [
    require("postcss-pxtorem")({
      rootValue: 37.5,
      propList: ['*'],
      // 过滤掉.norem-开头的class，不进行rem转换
      selectorBlackList: ['.norem'],
    }),
  ],
};
