iShow UI - 一个基于React的极简，可配置，可扩展的UI<br>
特性<br>
标准UI组件及样式，共23+个实用组件。<br>
支持按需加载可轻松导入的React组件。<br>
使用 ES6 构建，提供完整的独立安装包。<br>
基于 yarn + webpack + react +babel 的工作流<br>


快速上手<br>

安装<br>
推荐使用 Yarn 的方式安装，它能更好地和webpack打包工具配合使用。<br>

yarn add ishow-ui<br>


使用<br>
import React from 'react';<br>
import ReactDOM from 'react-dom';<br>
import { Button } from 'ishow-ui';<br>
//import Button from 'ishow-ui/lib/Button'   //按需加载<br>



ReactDOM.render(<Button type="primary">Hello</Button>, document.getElementById('app'));

