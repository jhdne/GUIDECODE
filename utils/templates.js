const templates = {
    productRequirement: `产品需求文档

产品概述

需求背景
{demand_background}

产品简介
{product_intro}

目标用户
{target_audience}

产品结构

产品主要功能模块
{main_function_modules}

产品信息架构
{information_architecture}

产品流程
{product_flow}

用户权限与状态

登录状态
{logged_in_permissions}

未登录状态
{logged_out_permissions}

功能需求

功能需求列表
{function_list}

需求明细
{function_details}

页面详情

页面概览
{page_overview}

页面详情
{page_details}

用户操作流程

操作步骤描述
{operation_steps}

技术栈与API

核心原则
简单性：优先选用易于理解、开发实现及后期维护的技术。
稳定性：选取成熟可靠、经过大量实践验证的技术。

技术栈：{tech_stack}

API需求：{api_requirements}

其他需求

性能需求
{performance_requirements}

监控需求
{monitoring_requirements}

兼容性需求
{compatibility_requirements}`,

    frontendGuidelines: `# Frontend Guidelines

1. 引言
项目概述与目标
适用范围
目标读者

2. 目录
项目结构概览
关键文件说明
依赖关系

3. 项目结构
目录组织
文件命名规范
模块划分

4. 技术栈
框架选择
核心库
工具链

5. 代码规范
命名规则
格式要求
注释规范
最佳实践

6. 组件设计
组件结构
生命周期
组件通信
复用原则

7. 状态管理
状态设计
数据流
缓存策略

8. 样式规范
样式架构
主题设计
响应式规则

9. 接口设计
请求规范
错误处理
数据格式`,

    backendStructure: `# Backend Structure Documentation

1. 系统概述
项目背景
系统目标
适用范围

2. 架构设计
系统架构图
模块划分
数据流向

3. 开发规范
代码规范
文档要求
版本控制

4. 部署方案
环境配置
部署流程
监控方案

5. 后端结构
5.1 技术栈
- 编程语言
- 框架选择
- 中间件
- 数据库
- 缓存系统

5.2 系统架构
- API网关
- 服务层
- 数据访问层
- 外部服务集成

6. 安全方案
认证机制
权限控制
数据加密

7. 性能优化
性能指标
优化策略
扩展方案`,

    appFlow: `# Application Flow Documentation

1. 项目名称
{project_name}

2. 产品类型
{product_type}

3. 描述
{project_description}

4. 主要功能
{main_features}

5. 应用流程
5.1 用户访问网站
- 首页加载
- 用户认证
- 功能展示

5.2 加载插件
- 插件初始化
- 功能集成
- 性能优化

6. 外部资源
- API服务
- 第三方集成
- 资源依赖

7. 注意事项
- 性能考虑
- 安全要求
- 兼容性

8. 总结
- 关键点回顾
- 实施建议
- 后续规划`,

    developmentGuide: `# Development Guide

1. 核心功能开发
1.1 用户认证模块
- 登录功能
- 注册功能
- 权限控制
[Status: Frozen]

1.2 文档生成器
- 模板系统
- AI集成
- 格式转换
[Status: Frozen]

2. 功能扩展
2.1 文档管理
- 保存功能
- 编辑功能
- 删除功能
[Status: In Progress]

2.2 用户界面
- 响应式设计
- 主题切换
- 多语言支持
[Status: Pending]

3. 性能优化
3.1 前端优化
- 代码分割
- 懒加载
- 缓存策略
[Status: Pending]

3.2 后端优化
- 数据库优化
- 并发处理
- 错误处理
[Status: Pending]

4. 测试与部署
4.1 单元测试
- 组件测试
- 功能测试
- 集成测试
[Status: Pending]

4.2 部署流程
- 环境配置
- CI/CD
- 监控系统
[Status: Pending]

5. 文档完善
5.1 技术文档
- API文档
- 架构文档
- 部署文档
[Status: Pending]

5.2 用户文档
- 使用手册
- 常见问题
- 故障排除
[Status: Pending]`,

    techStack: `# Technology Stack Documentation

1. 技术概述
架构设计
技术选型
实施策略

2. 前端技术
核心框架
UI组件
工具链

3. 后端技术
服务架构
数据存储
中间件

4. 部署环境
服务器
容器化
CI/CD

5. 监控系统
日志系统
性能监控
告警机制`,

    fileStructure: `# File Structure Documentation

1. 项目结构
根目录
配置文件
资源文件

2. 前端结构
组件目录
资源管理
测试文件

3. 后端结构
API路由
模型定义
中间件

4. 文档结构
技术文档
用户手册
API文档

5. 资源管理
静态资源
配置文件
部署脚本`
};
