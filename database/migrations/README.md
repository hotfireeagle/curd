### 文件夹介绍
      
本身呢，按照sequelize-cli的用法，是一个表一个migration跟踪构建，这里偷个懒，在init-tables.js文件里面创建所有用上了的表。
      
使用方法：
      
建表：./node_modules/.bin/sequelize db:migrate
      
撤销：./node_modules/.bin/sequelize db:migrate:undo
      
仅做快速示例用。