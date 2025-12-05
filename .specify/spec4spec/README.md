# Spec4Spec - 模板系统生成器

**目的**：这是一个"模版的模版"系统，用于指导智能体根据用户需求生成类似 `.specify` 结构的完整模板系统。

## 概述

`spec4spec` 是一个元模板系统，它提供了生成模板系统的模板和命令。通过使用这个系统，智能体可以根据用户输入生成一套完整的、可用的模板系统，包括：

- 文档模板（Document Templates）
- 命令模板（Command Templates）
- 检查清单模板（Checklist Templates）
- 其他支持文件

## 目录结构

```
spec4spec/
├── README.md                          # 本文件
├── cmds/
│   └── meta-template-generator.md    # 模板生成器命令（主命令）
└── templates/
    ├── document-template-template.md  # 用于生成文档模板的模板
    ├── command-template-template.md   # 用于生成命令模板的模板
    └── checklist-template-template.md # 用于生成检查清单模板的模板
```

## 核心组件

### 1. 命令模板：`cmds/meta-template-generator.md`

这是主要的命令模板，智能体使用它来生成完整的模板系统。它包含：

- 需求分析步骤
- 模板系统结构设计
- 模板文件生成逻辑
- 占位符系统应用
- 质量验证流程

### 2. 模板模板

这些是用于生成具体模板的模板：

- **document-template-template.md**：用于生成文档模板（如功能规范模板、计划文档模板等）
- **command-template-template.md**：用于生成命令模板（定义智能体命令的执行逻辑）
- **checklist-template-template.md**：用于生成检查清单模板（生成可执行的检查清单）

## 使用方法

### 对于智能体

当用户想要创建一个新的模板系统时，智能体应该：

1. 读取用户需求
2. 使用 `cmds/meta-template-generator.md` 命令模板
3. 参考 `templates/` 目录中的模板模板
4. 生成完整的模板系统结构
5. 验证生成的质量

### 对于用户

用户可以通过以下方式使用此系统：

```
我想创建一个用于 [用途] 的模板系统，包括：
1. [模板类型 1]
2. [模板类型 2]
3. [模板类型 3]
```

智能体将根据此输入生成一套完整的模板系统。

## 设计原则

1. **模板即代码**：模板应该像代码一样结构化、可维护、可版本控制
2. **占位符驱动**：使用清晰的占位符标记需要替换的内容
3. **自文档化**：模板本身包含详细的注释和指导说明
4. **分层结构**：支持多层次的模板（文档模板、命令模板、检查清单模板等）
5. **可组合性**：模板可以引用和组合其他模板

## 占位符系统

### 动态占位符（运行时替换）

- `$ARGUMENTS`：用户输入参数
- `{ARGS}`：上下文参数
- `[###-feature-name]`：功能分支名称模式
- `[日期]`：当前日期
- `[功能名称]`：功能名称

### 静态占位符（模板填充时替换）

- `[占位符-描述]`：需要根据上下文填充的内容
- `[选项 1/选项 2]`：多选占位符

### 脚本占位符（脚本执行时替换）

- `{SCRIPT}`：脚本路径
- `{ARGS}`：脚本参数

## 参考

- `.specify/templates/`：现有模板示例
- `.specify/templates/commands/`：命令模板示例
- `.specify/templates/spec-template.md`：文档模板示例
- `.specify/templates/checklist-template.md`：检查清单模板示例

## 示例

### 用户输入示例

```
我想创建一个用于代码审查的模板系统，包括：
1. 代码审查清单模板
2. 审查报告模板
3. 审查命令模板
```

### 生成的系统结构

```
.specoutput/[task-folder-name]/
├── templates/
│   ├── review-checklist-template.md
│   ├── review-report-template.md
│   └── commands/
│       └── review.md
└── README.md
```

## 维护

- **版本**：1.0
- **最后更新**：[日期]
- **维护者**：[维护者信息]

