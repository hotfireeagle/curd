### 1.文件夹功能介绍
      
为什么需要schema？如果采用sequelize来管理数据库的话，那么很容易造成冗余代码：在migration文件（利用sequelize帮我们创建数据表）需要声明字段类型，而在model文件中又需要声明一遍字段类型。因此干脆，将类型给抽离出来放在schema文件里面。
           
也就是说，这个schema文件既服务于model，也服务于migration。